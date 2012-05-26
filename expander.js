// Module responsible for expanding link type into a data 
// object.
//
// Data objects are sent to the client to be expanded into a view.
//
// See link type schema.md


var discover = require('./discover'),
    jsdom    = require('jsdom'),
    Promise  = require('node-promise').Promise,
    expand   = {};

exports.expand = function (url, who) {
    return discover.discover(url)
    .then(function (type) {
      console.log("hi");
      return expand[type](url, who);
    });
};

// Expand code

expand.code = function (url, who) {
  var promise  = new Promise();

  jsdom.env({
    html: url,
    scripts: ['http://code.jquery.com/jquery-1.5.min.js'],
    done: function (errors, window) {
      var jQuery = window.jQuery;
      promise.resolve({
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
  var promise  = new Promise();

  jsdom.env({
    html: url,
    scripts: ['http://code.jquery.com/jquery-1.5.min.js'],
    done: function (errors, window) {
      var jQuery = window.jQuery;
      promise.resolve({
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
  var promise  = new Promise();

  jsdom.env({
    html: url,
    scripts: ['http://code.jquery.com/jquery-1.5.min.js'],
    done: function (errors, window) {
      var jQuery = window.jQuery;
      promise.resolve({
        type: 'generic',
        title: jQuery('head title').text() || 'Link',
        description: jQuery('meta').attr('content'),
        when: new Date(),
        who: who,
        url: url
      });
    }
  });

  return promise;
};