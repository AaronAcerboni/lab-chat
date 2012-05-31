/* jQuery points, Tim writes, socket.io listens */

var codecount, genericcount, imgcount;

$(document).ready(function() {
	
	var socket = io.connect('http://localhost');
	
	socket.on('link'), function(data) {
		
		document.getElementById('timwrite').innerHTML = generateView(data);
		statUpdate();
		
	}

});

function generateView(data) {

	var timTemp;
	
	if (data.type == 'code') {
	
		timTemp = '<article class="codebox row"><h2 class="codetitle">{{title}}</h2><span class="whowhen">Posted by {{who}} at {{when}}.</span><a class="codelink" href="{{url}}">See the code online</a><pre class="code">{{code}}</pre></article>';
		
		codecount++;
	
	}
	
	if (data.type == 'generic') {
		
		timTemp = '<article class="generalbox row"><h2 class="generaltitle">{{title}}</h2><a class="generallink" href="{{url}}">{{url}}</a><h3><span class="whowhen">Posted by {{who}} at {{when}}.</span><p class="description">{{description}}</p></article>';
		
		genericcount++;
		
	}
	
	if (data.type == 'image') {
		
		timTemp = '<article class="imgbox row"><figure><img src="{{url}}" alt="{{name}}\'s Shared Image" /><figcaption><a class="imglink" href="{{url}}">{{url}}</a></figcaption></figure><span class="whowhen">Posted by {{who}} at {{when}}.</span><p class="description">{{description}}</p></article>';
		
		imgcount++;
		
	}
	
	return tim(timTemp, data);
	
}

function statUpdate() {
	
	var nodeTemp = document.getElementById("stats");

	if (nodeTemp.hasChildNodes()) { 
	                       
	    while (nodeTemp.childNodes.length >= 1) {
	    
	        nodeTemp.removeChild(nodeTemp.firstChild); 
	        
	    } 
	
	}
	
	var newHead = document.createElement("h4");
	var headContent = document.createTextNode("Here's whats been shared today: ");
	newHead.appendChild(headContent);
	
	var newItemList = document.createElement("ul");
		
	var newCodeOnList = document.createElement("li");
	var codeItem = document.createTextNode(codecount + " pieces of code shared.")
	newCodeOnList.appendChild(codeItem);
	
	var newImgOnList = document.createElement("li");
	var imgItem = document.createTextNode(imgcount + " pictures shared.")
	newImgOnList.appendChild(imgItem);
	
	var newGenericOnList = document.createElement("li");
	var genericItem = document.createTextNode(genericcount + " general items shared.")
	newGenericOnList.appendChild(genericItem);
	
	$(newItemList).append(newCodeOnList, newImgOnList, newGenericOnList);
	$('#stats').append(newHead, newItemList);
		
}




