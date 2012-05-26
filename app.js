var app      = require('http').createServer(handler),
    io       = require('socket.io').listen(app),
    fs       = require('fs'),
    irc      = require('irc'),
    expander = require('./expander');


// IRC Bot snooping

ircClient = new irc.Client('irc.freenode.net', 'Snoopy', {
  channels: ['#totallyunique'],
});

ircClient.addListener('message', function (from, to, message) {
  var link = extractLink(message);
  if(link){
    expander.expand(extractLink(message), from).then(function (data) {
      console.log(data);
    });
  }
});

function extractLink(message){
  var url = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
  .exec(message);
  if(url){
    return url[0];
  }
  return false;
}

// HTTP and Sockets

app.listen(8888);

function handler (req, res) {
  var file = req.url.split('/')[1];

  fs.readFile(__dirname + '/public/' + file,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading' + file);
    }
    res.writeHead(200);
    res.end(data);
  });
}