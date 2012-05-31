var app      = require('http').createServer(handler),
    io       = require('socket.io').listen(app),
    fs       = require('fs'),
    irc      = require('irc'),
    expander = require('./expander'),
    cache    = [],
    client;



// IRC Bot snooping and socket emit

client = new irc.Client('irc.freenode.net', 'Snoopy', {
  channels: ['#totallyunique'],
});

client.addListener('message', function (from, to, message) {
  var link = extractLink(message);
  if (link)
    expander.expand(link, from);
});



// Find a link function

function extractLink(message){
  var url = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
  .exec(message);
  if(url){
    return url[0];
  }
  return false;
}



// Add to cache

expander.listen('expansion', function (data) {
  cache.push(data);
})



// Socket connection

io.sockets.on('connection', function (socket) {
  expander.listen('expansion', function (data) {
    socket.emit('link', data);
  });
});



// HTTP

app.listen(8888);

function handler (req, res) {
  var path = req.url.replace('public/' + '');
  path = (path === '/') ? 'index.html' : path;

  if(path != 'cache'){
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
