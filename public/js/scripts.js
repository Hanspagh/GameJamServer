/**
 * Created by Anders on 09/05/17.
 */

var counter = 0;

updateUI();

// set timeout
var tid = setTimeout(incrementCounter, 1000);

function incrementCounter() {
    // increment counter
    counter += 1;

    updateUI();

    tid = setTimeout(incrementCounter, 1000); // repeat myself
}


function updateUI() {
    $("#counter").html(counter);
}

function abortTimer() { // to be called when you want to stop the timer
    clearTimeout(tid);
}
