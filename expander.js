var discover = require('./discover'),
    jsdom    = require('jsdom'),
    Q        = require('q'),
    expand   = {};

exports.expand = function (who, url, content) {
    return discover.discover(url)
    .pipe(function (type) {
      return expand[type](who, content);
    })
    .pipe()
}

expand.code = function (url, who, content) {

};

expand.image = function (url, who, content) {

};

expand.generic = function (url, who, content) {
  var deferred = Q.deferred(),
      promise  = deferred.promise();

  jsdom.env({
    html: url,
    scripts: ['http://code.jquery.com/jquery-1.5.min.js'],
    done: function (errors, window) {
      var $ = window.$;
      data = {
        type: 'generic'
        title: $('head title').text() || 'Link',
        description: $('meta').attr('content'),
        who: who,
        url: url
      }
  });

  deferred.resolve(data);

  return promise;
};