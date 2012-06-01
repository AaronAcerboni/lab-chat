// Module responsible for expanding link type into a data 
// object.
//
// Data objects are sent to the client to be expanded into a view.
//
// See link type schema.md for insight on these data objects.

var discover = require('./discover'),
    jsdom    = require('jsdom'),
    Promise  = require('node-promise').Promise,
    events   = require('events'),
    emitter  = new events.EventEmitter();
    expand   = {};


exports.expand = function (url, who) {
  discover.discover(url).then(function (type) {
    expand[type](url, who).then(function (data) {
      emitter.emit('expansion', data);
    });
  });
};

exports.listen = function (eventName, callback) {
  emitter.on(eventName, callback);
};


// Expand a pastebin code link

expand['pastebin.com/'] = function (url, who) {
  var promise = new Promise();

  jsdom.env({
    html: validate(url),
    scripts: ['http://code.jquery.com/jquery-1.7.2.min.js'],
    done: function (errors, window) {
      promise.resolve({
        type: 'code',
        title: window.jQuery('.paste_box_line1 h1').text(),
        code: window.jQuery('#paste_code').text(),
        who: who,
        when: new Date(),
        url: validate(url)
      });
    }
  });
  return promise;
};


// Expand a github code link

expand['gist.github.com/'] = function (url, who) {
  var promise = new Promise();

  jsdom.env({
    html: validate(url),
    scripts: ['http://code.jquery.com/jquery-1.7.2.min.js'],
    done: function (errors, window) {
      promise.resolve({
        type: 'code',
        title: window.jQuery('#description').text(),
        code: window.jQuery('div.actions a')[1].href,
        who: who,
        when: new Date(),
        url: validate(url)
      });
    }
  });
  return promise;
};


// Expand an image link

expand.image = function (url, who) {
  var promise  = new Promise();

  jsdom.env({
    html: validate(url),
    scripts: ['http://code.jquery.com/jquery-1.7.2.min.js'],
    done: function (errors, window) {
      promise.resolve({
        type: 'image',
        when: new Date(),
        who: who,
        url: validate(url)
      });
    }
  });

  return promise;
};


// Expand a generic link

expand.generic = function (url, who, content) {
  var promise  = new Promise();

  jsdom.env({
    html: validate(url),
    scripts: ['http://code.jquery.com/jquery-1.7.2.min.js'],
    done: function (errors, window) {
      promise.resolve({
        type: 'generic',
        title: window.jQuery('head title').text() || 'Link',
        description: 'A generic link...',
        when: new Date(),
        who: who,
        url: validate(url)
      });
    }
  });

  return promise;
};


// Add 'http://' to a URL which has it missing

function validate(url) {
  return (url.search('^https?://') != -1) ? url : 'http://' + url;
}