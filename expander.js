// Module responsible for expanding link type into a data 
// object.
//
// Data objects are sent to the client to be expanded into a view.
//
// See link type schema.md


var discover = require('./discover'),
    jsdom    = require('jsdom'),
    Promise = require('promise').Promise,
    defer   = require('promise').defer;
    expand   = {};

exports.expand = function (url, who) {
    return discover.discover(url)
    .pipe(function (type) {
      return expand[type](url, who);
    });
};

// Expand code

expand.code = function (url, who) {
  var deferred = defer(),
      promise  = new Promise();

  jsdom.env({
    html: url,
    scripts: ['http://code.jquery.com/jquery-1.5.min.js'],
    done: function (errors, window) {
      deferred.resolve({
        type: 'code',
        title: jQuery('.paste_box_line1 h1').text(),
        code: jQuery('#paste_code').text(),
        who: who,
        when: new Date(),
        url: url
      });
    }
  });
  return promise;
};

// Expand image

expand.image = function (url, who) {
  var deferred = defer(),
      promise  = new Promise();

  jsdom.env({
    html: url,
    scripts: ['http://code.jquery.com/jquery-1.5.min.js'],
    done: function (errors, window) {
      deferred.resolve({
        type: 'image',
        when: new Date(),
        who: who,
        url: url
      });
    }
  });

  return promise;
};

// Expand generic

expand.generic = function (url, who, content) {
  var deferred = defer(),
      promise  = new Promise();

  jsdom.env({
    html: url,
    scripts: ['http://code.jquery.com/jquery-1.5.min.js'],
    done: function (errors, window) {
      var $ = window.$;
      deferred.resolve({
        type: 'generic',
        title: $('head title').text() || 'Link',
        description: $('meta').attr('content'),
        when: new Date(),
        who: who,
        url: url
      });
    }
  });

  return promise;
};