/* jQuery points, Tim writes, socket.io listens */


$(document).ready(function() {

	socket.on('message'), function(message) {
		
		document.getElementById('timwrite').innerHTML = generateView(message);
		
	}

});

function generateView(message) {

	var timTemp;
	
	if (message.type == 'code') {
	
		timTemp = "<article><pre>{{ }}</pre></article>";
	
	}
	
	if (message.type == 'generic') {
		
		
		
	}
	
	if (message.type == 'image') {
		
		
		
	}
	
	tim(timTemp, data);
	
}





