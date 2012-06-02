var irc       = require('irc'),
    events    = require('events'),
    emitter   = new events.EventEmitter(),
    network   = 'irc.freenode.net',
    botname   = 'Snoopy',
    channels  = [],
    ircClient;


// Accept CLI Argument

if(process.argv[2]) {
  channels.push('#' + process.argv[2]);
} else {
  channels.push('#l4rp');
}

// Chat bot

ircClient = new irc.Client(network, botname, {
  channels: channels
});

ircClient.addListener('message', function (from, to, message) {
  var url = extractUrl(message);
  if (url) emitter.emit('foundLink', url, from);
});


// Returns a found URL as String or false

function extractUrl(message){
  var url = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
  .exec(message);
  if(url){
    return url[0];
  }
  return false;
}


// Exported listener for 'foundLink' event

exports.listen = function (eventName, callback) {
  emitter.on(eventName, callback);
};