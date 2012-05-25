/* jQuery points, Tim writes, socket.io listens */


$(document).ready(function() {

	socket.on('message'), function(message) {
		
		document.getElementById('timwrite').innerHTML = generateView(message);
		
	}

});

function generateView(message) {

	var timTemp;
	
	if (message.type == 'code') {
	
		timTemp = '<article class="codebox"><h2 class="codetitle">{{title}}</h2><span class="whowhen">Posted by {{who}} at {{when}}.</span><a class="codelink" href="{{url}}">See the code online</a><pre class="code">{{code}}</pre></article>';
	
	}
	
	if (message.type == 'generic') {
		
		timTemp = '<article class="generalbox"><h2 class="generaltitle">{{title}}</h2><a class="generallink" href="{{url}}">{{url}}</a><h3><span class="whowhen">Posted by {{who}} at {{when}}.</span><p class="description">{{description}}</p></article>';
		
	}
	
	if (message.type == 'image') {
		
		timTemp = '<article class="imgbox"><figure><img src="{{url}}" alt="{{name}}\'s Shared Image" /><figcaption><a class="imglink" href="{{url}}">{{url}}</a></figcaption></figure><span class="whowhen">Posted by {{who}} at {{when}}.</span><p class="description">{{description}}</p></article>';
		
	}
	
	return tim(timTemp, message);
	
}

/*
function pushNotification() {
	
	
	
}
*/




