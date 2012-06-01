var app      = require('http').createServer(handler),
    fs       = require('fs'),
    io       = require('socket.io').listen(app),
    expander = require('./expander'),
    chatbot  = require('./chatbot'),
    clients  = require('./clients'),
    cache    = [];


// Listen for new links from chatbot
// Expand the link into detailed data structure
// (See link type schema.md)

chatbot.listen('foundLink', function (from, who) {
  expander.expand(from, who);
});

// Listen for linkExpanded event from expander
// Push it to cache and inform connected clients

expander.listen('linkExpanded', function (data) {
  cache.push(data);
  connections.inform(data);
})

// Listen for new socket connections
// Store connected 'clients' in array

io.sockets.on('connection', function (socket) {
  clients.add(socket);
  socket.on('disconnect', function (socket) {
    clients.remove(socket);
  });
});

// Listen on port 8888

app.listen(8888);


// Handle HTTP Requests and routing
// This handler serves files in the public directory.
// This handler handles a specific 'cache' route which returns all cached links.

function handler (req, res) {
  var path = req.url.replace('public/' + '');
  path = (path === '/') ? 'index.html' : path;
  
  if(req.url != '/cache'){
    fs.readFile(__dirname + '/public/' + path, function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + path);
      }
      res.writeHead(200);
      res.end(data);
    });
  } else {
    res.writeHead(200);
    res.end(JSON.stringify(cache));
  }
}