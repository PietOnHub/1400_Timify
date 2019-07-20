
$(document).ready(function(){
    $("#log-main").on('click touchstart', '.delete', function() {

        var itemKey = $(this).attr("name");
        var dateInMS = parseInt(itemKey)
        var currentDate = new Date(dateInMS)

        msgCreate(itemKey, "<b>delete date? </b> <br> " + currentDate.toLocaleDateString()
            + '<br>' + currentDate.toLocaleTimeString(), "yes", "no");

        $("body").on('click touchstart', '#msg-' + itemKey + '-left', function (e) {
            e.stopPropagation();
            e.preventDefault();
            msgClear();
            localStorage.removeItem(itemKey);
            getStorage();
        });

        $("body").on('click touchstart', '#msg-' + itemKey + '-right', function (e) {
            e.stopPropagation();
            e.preventDefault();
            msgClear();
        });
    });
    });

function setStorage(){

    if (typeof(localStorage) == 'undefined' ) {
	    alert('Your browser does not support HTML5 localStorage. Try upgrading.');
       }
    else {
        var newDate = new Date();
        var itemId = newDate.getTime(); //creates a unique id with the milliseconds since January 1, 1970
        var values = new Array();

        values.push(timerStart.toLocaleTimeString().substring(0,8));
        values.push(timerEnd.toLocaleTimeString().substring(0,8));
        values.push('log');


    try {
		localStorage.setItem(itemId, values.join(";")); //store the item in the database
	} catch (e) {
		if (e == QUOTA_EXCEEDED_ERR) {
			alert("Quota exceeded!");
		}
	}
}
}

function getStorage(){

var logLength = localStorage.length-1;
var log = "";

for (i = 0; i <= logLength; i++) {

            var itemKey = localStorage.key(i);
            var values = localStorage.getItem(itemKey);
            values = values.split(";"); //create an array of the values
            if (values[2]=='log') {
                var start = values[0];
                var end = values[1];
                log += '<li class="timer-list">' + start + ' - ' + end + '<span class="delete" name="' + itemKey + '">   [X]</span></li>';
            }
        }
			$('#log-main').html('<ul>'+log+'</ul>');
}

function clearStorage(){
//localStorage.removeItem(itemKey); //id (or key) of the value you want to delete
localStorage.clear(); //be careful as this will clear the entire database for that user
}