/**
 * Created by Anders on 09/05/17.
 */

var prices = {
    1: 10,
    2: 20,
    3: 40,
    4: 80
}

var coins = 20;
var mazeSize = 10;
var selectedX = null;
var selectedY = null;
var timeout = 1000
var mazeData = {list: []}


$(document).ready(function() {
    setupUI()
});

function setupUI() {
    // Bind requests to form
    $(document).on('submit', 'form', function() {
        var id = getSelectedMonsterId();

        if (selectedX == null || selectedY == null || id == 0) {
            alert("You have not selected a position on the map or selected a monster to insert!");
            return false;
        }

        if (!hasSufficientCoins()) {
            // Not enough coins
            return false;
        }

        $.ajax({
            url     : $(this).attr('action'),
            type    : $(this).attr('method'),
            dataType: 'json',
            data    : { "id": id, "x": selectedX, "y": selectedY },
            success : function(data) {
                spendCoins(id);
            },
            error   : function(xhr, err) {
                spendCoins(id);
            }
        });
        return false;
    });

    // Setup canvas
    var c = document.getElementById("canvas");
    c.onselectstart = function () { return false; };
    var size = $("#canvas").css("width").replace("px", "");
    c.width = size;
    c.height = size;

    var squareSize = c.width / mazeSize;

    var ctx = c.getContext("2d");

    c.addEventListener("click", function(e) {
        var x = Math.floor(e.offsetX / squareSize);
        var y = Math.floor(e.offsetY / squareSize);

        selectedX = x;
        selectedY = 9 - y;
        console.log(selectedX, selectedY)

        ctx.clearRect(0,0, c.width, c.height);
        mazeRedraw(mazeData);

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(x * squareSize + 3, y * squareSize + 3, squareSize-6, squareSize-6);    

        $("form").submit();
    })

    drawMaze();
    setHighScore() 
    updateUI();
}

function getSelectedMonsterId() {
    return parseInt($("input[name=monster]:checked").val());
}

// set timeout
var tid = setTimeout(incrementCoins, timeout);

function incrementCoins() {
    // increment counter
    coins += 1;

    updateUI();
    
    tid = setTimeout(incrementCoins, timeout); // repeat myself
}

function spendCoins(monsterId) {
    var price = prices[monsterId];
    coins -= price;
    timeout -= (timeout * 10 / 100)
    updateUI();
}

function hasSufficientCoins() {
    var id = getSelectedMonsterId()
    var monsterPrice = prices[id];

    return coins >= monsterPrice;
}

function updateUI() {
    $("#coins").html(coins);

    var id = getSelectedMonsterId()
    var monsterPrice = prices[id];

    var canBuyMonster = hasSufficientCoins();
    $("#submitButton").prop('disabled', !canBuyMonster);
}

function abortTimer() { // to be called when you want to stop the timer
    clearTimeout(tid);
}

function setHighScore() {
  var listContainer = $('#list');
  $.ajax({
      url     : '/api/highscore/json',
      type    : 'GET',
      dataType: 'json',
      data    : {},
      success : function(data) {
        data.forEach(function(elem) {
          listContainer.prepend('<li> ' + elem.name + ':' + elem.score + '</li>');
        })
        
      },
      error   : function(xhr, err) {
          alert("errro")
      }
  });
  return false;
  
  
}



function drawMaze() {
    $.ajax({
        url     : '/api/map',
        type    : 'GET',
        dataType: 'json',
        data    : {},
        success : function(data) {
          mazeRedraw(data)
        },
        error   : function(xhr, err) {
            alert("errro")
        }
    });
    return false;
  
    // Setup canvas
  
}

function mazeRedraw(data) {
  mazeData = data
  var c = document.getElementById("canvas");
  var squareSize = c.width / mazeSize;
  var ctx = c.getContext("2d");
  ctx.beginPath();

  for(var x = 0; x < mazeSize; x++) {
      for(var y = 0; y < mazeSize; y++) {
          var cell = data.list[x + y * 10]
          console.log(cell);
          var xPos = x * squareSize
          var yPos = (9 - y) * squareSize 
          
          if(cell.w == 1) {
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos, yPos + squareSize);
            ctx.stroke()
          }
          if(cell.n == 1) {
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos + squareSize, yPos);
            ctx.stroke()
          }
          if(cell.e == 1) {
            ctx.moveTo(xPos + squareSize, yPos);
            ctx.lineTo(xPos + squareSize, yPos + squareSize);
            ctx.stroke()
          }
          if(cell.s == 1) {

            ctx.moveTo(xPos, yPos + squareSize);
            ctx.lineTo(xPos + squareSize, yPos + squareSize);
            ctx.stroke()
          }
          
          
      }
  }

  ctx.stroke()
}
