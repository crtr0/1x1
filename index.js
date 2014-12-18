var http = require('http')
  , url = require('url')
  , GifEncoder = require('gif-encoder');

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

http.createServer(function (req, res) {
  
  var hash = url.parse(req.url, true);
  if (hash.pathname === '/pixel') {
    var color = hash.query['color'];

    res.writeHead(200, {'Content-Type': 'image/gif'});

    var gif = new GifEncoder(1, 1);
    gif.pipe(res);
    gif.writeHeader();
    gif.addFrame([hexToR(color), hexToG(color), hexToB(color), 1]);
    gif.finish();
  }
  else {
    res.writeHead(404);
    res.end("Not Found");
  }

}).listen(process.env.PORT || 3000, '127.0.0.1');
console.log('Node service running');
