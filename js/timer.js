/**
 * Created by Piet on 11.05.2014.
 */

var timerStart;
var timerEnd;
var timerInterval;
var timerStatus;

$(document).ready(function () {

timerMode(localStorage.getItem("timerStatus"), true);

$("#timer-button-left").on('click touchstart', function (e) {
    e.stopPropagation();
    e.preventDefault();
    timerMode(timerStatus);
});

$("#timer-button-right").on('click touchstart', function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (timerStatus == 'stopped') {
        msgCreate("timerClear", "Timer wirklich zurücksetzen?", "ja", "nein");
    }
});

$("#timer-submit").on('click touchstart', function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (timerStatus == 'stopped') {
        setStorage();
        getStorage();
        timerMode('cleared', true);
        timerClearLocals();
    }
});

$("body").on('click touchstart', '#msg-timerClear-left', function(e){
    e.stopPropagation();
    e.preventDefault();
    msgClear();
    timerMode('cleared', true);
    timerClearLocals();
    $('#timer-button-left').html('<p>START</p>').attr('class', 'button l green');
    $('#timer-button-right').html('<p>CLEAR</p>').attr('class', 'button r inactive');

});

$("body").on('click touchstart', '#msg-timerClear-right', function(e){
    e.stopPropagation();
    e.preventDefault();
    msgClear();
});

});

function timerMode(status, initial) {

    var text;
    var style;
    var newStatus;

    if (initial == true) {

        timerStart = localStorage.getItem("timerStart");
        timerEnd = localStorage.getItem("timerEnd");

        switch (status) {
            case 'running':
                runTimer('continued');
                newStatus = 'running';
                text = 'STOP';
                style = 'red';
                break;
            case 'stopped':
                stopTimer('continued');
                newStatus = 'stopped';
                text = 'CONT';
                style = 'green';
                break;
            case 'cleared':
                timerUpdateView("Zeiterfassung", "00:00:00", "--:--:--", "--:--:--");
                newStatus = 'cleared';
                text = 'START';
                style = 'green';
                break;
            default:
                timerUpdateView("Zeiterfassung", "00:00:00", "--:--:--", "--:--:--");
                newStatus = 'cleared';
                text = 'START';
                style = 'green';
        }
    }
    else {
        switch (status) {
            case 'running':
                stopTimer();
                newStatus = 'stopped';
                text = 'CONT';
                style = 'green';
                break;
            case 'stopped':
                runTimer('continued');
                newStatus = 'running';
                text = 'STOP';
                style = 'red';
                break;
            case 'cleared':
                runTimer(0);
                newStatus = 'running';
                text = 'STOP';
                style = 'red';
                break;
            default:
                timerUpdateView("Zeiterfassung", "00:00:00", "--:--:--", "--:--:--");
                newStatus = 'cleared';
                text = 'START';
                style = 'green';
        }
    }

    timerStatus = newStatus;
    localStorage.setItem("timerStatus", newStatus);

    $('#timer-button-left').html('<p>'+text+'</p>').attr('class', 'button l '+ style);

    if (newStatus == 'stopped')
        $('#timer-button-right').html('<p>CLEAR</p>').attr('class', 'button r red');
    else
        $('#timer-button-right').html('<p>CLEAR</p>').attr('class', 'button r inactive');
}

function runTimer(arg) {

    if (arg == 0)
        timerStart = new Date;
    else if (arg == 'continued') {
        timerStart = new Date(localStorage.getItem("timerStart"));
        }
    else{}

    localStorage.setItem("timerStart", timerStart);

    timerUpdateView("Zeit läuft", getTimerAsString(new Date), timerStart.toLocaleTimeString().substring(0,8), "--:--:--")

    timerInterval = setInterval(function () {document.getElementById("timer-result").innerHTML =getTimerAsString(new Date)}, 1000);
}


function stopTimer(arg) {
    if (arg == 'continued') {
        timerEnd = new Date(localStorage.getItem("timerEnd"));
        timerStart = new Date(localStorage.getItem("timerStart"));
    }
    else {
        timerEnd = new Date;
        clearTimeout(timerInterval);
    }
    localStorage.setItem("timerEnd", timerEnd);
    timerUpdateView("Zeit angehalten", getTimerAsString(timerEnd), timerStart.toLocaleTimeString().substring(0,8), timerEnd.toLocaleTimeString().substring(0,8))
}


function timerUpdateView(status, result, start, end) {
    document.getElementById("timer-status").innerHTML = status;
    document.getElementById("timer-result").innerHTML = result;
    document.getElementById("timer-start").innerHTML = "start <br>" +start;
    document.getElementById("timer-end").innerHTML = "end <br>" +end;
}


function timerClearLocals() {
    localStorage.removeItem("timerEnd");
    localStorage.removeItem("timerStart");
}


function getTimerAsString(actualDate) {
    var diffms = actualDate - timerStart;
    var sec = Math.round(diffms / 1000);
    var min = Math.floor(sec / 60);
    var hrs = Math.floor(min / 60);

    var secString = "";
    var minString = "";
    var hrsString = "";

    sec = sec % 60;
    min = min % 60;

    if (sec < 10)
        secString = "0" + sec;
    else
        secString = sec;

    if (min < 10)
        minString = "0" + min;
    else
        minString = min;

    if (hrs < 10)
        hrsString = "0" + hrs;
    else
        hrsString = min;
    return  hrsString + ":" + minString + ":" + secString;
}