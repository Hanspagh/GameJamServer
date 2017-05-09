/**
 * Created by Anders on 09/05/17.
 */

var monsterPrice = 5;
var coins = 0;


$(document).ready(function() {
    setupUI()
});

function setupUI() {
    $("#monsterPrice").html(monsterPrice);

    $(document).on('submit', 'form', function() {
        $.ajax({
            url     : $(this).attr('action'),
            type    : $(this).attr('method'),
            dataType: 'json',
            data    : $(this).serialize(),
            success : function(data) {
                alert('Submitted');
                spendCoins();
            },
            error   : function(xhr, err) {
                alert('Error');
                spendCoins();
            }
        });
        return false;
    });

    updateUI();
}

// set timeout
var tid = setTimeout(incrementCoins, 1000);

function incrementCoins() {
    // increment counter
    coins += 1;

    updateUI();

    tid = setTimeout(incrementCoins, 1000); // repeat myself
}

function spendCoins() {
    coins = 0;

    updateUI();
}

function updateUI() {
    $("#coins").html(coins);

    var canBuyMonster = coins >= monsterPrice;
    $("#submitButton").prop('disabled', !canBuyMonster);
}

function abortTimer() { // to be called when you want to stop the timer
    clearTimeout(tid);
}
