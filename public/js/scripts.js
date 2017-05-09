/**
 * Created by Anders on 09/05/17.
 */

var monsterPrice = 5;
var prices = {
    1: 10,
    2: 20,
    3: 40,
    4: 80
}

var coins = 0;
var mazeSize = 10;
var selectedX = null;
var selectedY = null;


$(document).ready(function() {
    setupUI()
});

function setupUI() {
    $("#monsterPrice").html(monsterPrice);

    // Bind requests to form
    $(document).on('submit', 'form', function() {
        var id = getSelectedMonsterId();

        if (selectedX == null || selectedY == null || id == 0) {
            alert("You have not selected a position on the map or selected a monster to insert!");
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
    var size = $("#canvas").css("width").replace("px", "");
    c.width = size;
    c.height = size;

    var squareSize = c.width / mazeSize;

    var ctx = c.getContext("2d");

    c.addEventListener("click", function(e) {
        var x = Math.floor(e.offsetX / squareSize);
        var y = Math.floor(e.offsetY / squareSize);

        selectedX = x;
        selectedY = y;

        ctx.clearRect(0,0, c.width, c.height);
        drawMaze();

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
    })

    drawMaze();

    updateUI();
}

function getSelectedMonsterId() {
    return parseInt($("input[name=monster]:checked").val());
}

// set timeout
var tid = setTimeout(incrementCoins, 1000);

function incrementCoins() {
    // increment counter
    coins += 1;

    updateUI();

    tid = setTimeout(incrementCoins, 1000); // repeat myself
}

function spendCoins(monsterId) {
    var price = prices[monsterId];
    coins -= price;

    updateUI();
}

function updateUI() {
    $("#coins").html(coins);

    var id = getSelectedMonsterId()
    var monsterPrice = prices[id];

    var canBuyMonster = coins >= monsterPrice;
    $("#submitButton").prop('disabled', !canBuyMonster);
}

function abortTimer() { // to be called when you want to stop the timer
    clearTimeout(tid);
}



function drawMaze() {
    // Setup canvas
    var c = document.getElementById("canvas");
    var squareSize = c.width / mazeSize;
    var ctx = c.getContext("2d");
    ctx.beginPath();

    for(var x = 0; x < mazeSize * squareSize; x += squareSize) {
        for(var y = 0; y < mazeSize * squareSize; y += squareSize) {
            ctx.rect(x, y, squareSize, squareSize);
        }
    }

    ctx.stroke()
}
