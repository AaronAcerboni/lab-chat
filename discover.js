var jsdom = require('jsdom'),
    Q        = require('q');

exports.discover = function (url, callback) {
  var deferred = Q.deferred(),
      promise  = deferred.promise(),
      type;

  type = (isCode(url))  ? 'code'  : 'generic';
  type = (isImage(url)) ? 'image' : type;
  
  deferred.resolve(type);  
  return promise;
};

// Discovery methods

function isCode(url){
  var recognize = ['gist.github.com/', 'pastebin.com/'],
      schemeless;
      i = 0;

  for(i; i < recognize.length; i++){
    schemeless = recognize[i].split('//:');
    if(url.search(schemeless[schemeless.length-1]) >= 0){
      return true;
    }
  }
  return false; 
}

function isImage(url){
  if(url.match(/\.(jpeg|jpg|gif|png)$/)){
    return true;
  }

  // Another test: Use jsdom to scrape for a lone image element?

  return false;
}