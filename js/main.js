var DEV_PORT = "COM3";

var analogPin = 12;

var offtime = 500;

function beep() {
    var arduino = document.arduino;

    var sum = 0;
    for(var i=0; i<100; i++) {
        sum += arduino.analogRead(analogPin);
    }

    var val = sum / 100;

    document.getElementById("distance").innerHTML = "<br>" + val + "<br>";

    var ontime = 500;

    if(val > 600) ontime = 523;
    else if(val > 530) ontime = 494;
    else if(val > 460) ontime = 440;
    else if(val > 390) ontime = 392;
    else if(val > 320) ontime = 349;
    else if(val > 250) ontime = 330;
    else if(val > 180) ontmie = 294;
    else if(val > 110) ontime = 262;

    arduino.pulse(analogPin, ontime, offtime);

    setTimeout("beep()", step);
}

function setup() {
    try{
        with(document.arduino) {
            open(DEV_PORT);
            pinMode(analogPin, true);
    } catch(e) {
        alert("Oops, an error happened!");
    }
}

$(function() {
    if(!document.arduino) {
        alert("arduino.js for webpages add-on is not installed.");
    } else {
        setup();
        beep();
    }
});
