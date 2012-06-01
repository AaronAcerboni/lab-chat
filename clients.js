var connections = {};


// Send link down to all listening clients

exports.inform = function (link) {
  for(var prop in connections){
    connections[prop].emit('link', link);
  }
};

exports.add = function (socket) {
  connections[socket.id] = socket;
};

exports.remove = function (socket) {
  delete connections[socket.id];
};