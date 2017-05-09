/**
 * Created by Anders on 09/05/17.
 */

var counter = 0;

// set timeout
var tid = setTimeout(incrementCounter, 1000);

function incrementCounter() {
    // increment counter
    counter += 1;

    $("#counter").html(counter);

    tid = setTimeout(incrementCounter, 1000); // repeat myself
}
function abortTimer() { // to be called when you want to stop the timer
    clearTimeout(tid);
}
