var app      = require('http').createServer(handler),
    io       = require('socket.io').listen(app),
    fs       = require('fs'),
    irc      = require('irc'),
    expander = require('./expander'),

    ircClient = new ircLib.Client('irc.freenode.net', 'Snoopy', {
        channels: ['#l4rp'],
    });

app.listen(8888);

// IRC Bot snooping

ircClient.addListener('message', function (from, to, message) {
  var link = extractLink(message);
  expander.expand(link).then(function (data) {
    // emit socket
  });
});

// HTTP Handler

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