var discover = require('./discover'),
    jsdom    = require('jsdom'),
    Q        = require('q'),
    expand   = {};

exports.expand = function (url) {
    return discover.discover(url)
    .pipe(function (type) {
      return expand[type](url, who);
    });
};

// Expand code

expand.code = function (url, who) {
  var deferred = Q.deferred(),
      promise  = deferred.promise();

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
  var deferred = Q.deferred(),
      promise  = deferred.promise();

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
  var deferred = Q.deferred(),
      promise  = deferred.promise();

  jsdom.env({
    html: url,
    scripts: ['http://code.jquery.com/jquery-1.5.min.js'],
    done: function (errors, window) {
      var $ = window.$;
      deferred.resolve({
        type: 'generic'
        title: $('head title').text() || 'Link',
        description: $('meta').attr('content'),
        when: new Date(),
        who: who,
        url: url
      });
  });

  return promise;
};