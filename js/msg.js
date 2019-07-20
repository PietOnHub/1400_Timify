 function msgCreate(id, text, left, right){

 $('<div id="msg-alert" class="msg-bg">'
 +'<div class="msg-box">'
 +'<div class="msg-alert"> <p>'+text+'</p></div>'
 +'<div class="msg-button msg-left" id="msg-'+id+'-left"><p>'+left+'</p></div>'
 +'<div class="msg-button msg-right" id="msg-'+id+'-right"><p>'+right+'</p></div>'
 +'</div>'
 +'</div>').appendTo('body');
 }
 
 function msgClear(){$('#msg-alert').remove();}