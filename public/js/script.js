/* jQuery points, Tim writes, socket.io listens */

var codeCount = genericCount = imgCount = 0,
		BASE_URL = '/';

$(document).ready(function() {
	
	var area = document.getElementById('timwrite'),
			socket = io.connect(BASE_URL);
	
	// Get links collected so far

	$.get('cache').then(function (data) {
		$.each(JSON.parse(data), function (i, link) {
			generateView(link).prependTo(area).fadeIn("slow");
			statUpdate();
		})
	});

	// Listen for new links

	socket.on('link', function (link) {
		console.log("Got data: ", link);
		generateView(link).prependTo(area).fadeIn("slow");
		statUpdate();		
	});

});

function generateView(data) {

	var timTemp;
	
	if (data.type == 'code') {
	
		timTemp = '<article class="codebox row"><h2 class="codetitle">{{title}}</h2><a class="codelink" href="{{url}}">See the code online</a><pre class="prettyprint"><code>{{code}}</code></pre><footer class="whowhen">Posted by {{who}} at <time datetime="{{when}}" pubdate>{{when}}</time>.</footer></article>';
		
		codeCount++;
	
	}
	
	if (data.type == 'generic') {
		
		timTemp = '<article class="generalbox row"><h2 class="generaltitle">{{title}}</h2><a class="generallink" href="{{url}}">{{url}}</a><p class="description">{{description}}</p><footer class="whowhen">Posted by {{who}} at <time datetime="{{when}}" pubdate>{{when}}</time>.</footer></article>';
		
		genericCount++;
		
	}
	
	if (data.type == 'image') {
		
		timTemp = '<article class="imgbox row"><figure><img src="{{url}}" alt="{{who}}\'s Shared Image" /><figcaption><a class="imglink" href="{{url}}">{{url}}</a></figcaption></figure><footer class="whowhen">Posted by {{who}} at <time datetime="{{when}}" pubdate>{{when}}</time>.</footer></article>';
		
		imgCount++;
		
	}
	
	return $(tim(timTemp, data)).hide();
	
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
	var codeItem = document.createTextNode(codeCount + " pieces of code shared.")
	newCodeOnList.appendChild(codeItem);
	
	var newImgOnList = document.createElement("li");
	var imgItem = document.createTextNode(imgCount + " pictures shared.")
	newImgOnList.appendChild(imgItem);
	
	var newGenericOnList = document.createElement("li");
	var genericItem = document.createTextNode(genericCount + " general items shared.")
	newGenericOnList.appendChild(genericItem);
	
	$(newItemList).append(newCodeOnList, newImgOnList, newGenericOnList);
	$('#stats').append(newHead, newItemList);
		
}
