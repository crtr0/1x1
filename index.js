var http = require('http')
  , url = require('url')
  , GifEncoder = require('gif-encoder');

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

http.createServer(function (req, res) {
  
  console.log(req.url);
  var hash = url.parse(req.url, true);
  console.log(hash.pathname);
  if (hash.pathname === '/pixel') {
    var color = hash.query['color'];
    console.log(color);

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

  /*var buffer = new Buffer([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x01, 0x03 ,0x00, 0x00 ,0x00, 0x25 ,0xdb, 0x56 ,0xca, 0x00 ,0x00, 0x00 ,0x03, 0x50 ,0x4c, 0x54 ,0x45, 0xff ,0x00, 0x00 ,0x19, 0xe2 ,0x09, 0x37  ,0x00, 0x00 ,0x00, 0x0a ,0x49, 0x44 ,0x41, 0x54 ,0x78, 0x9c ,0x63, 0x62 ,0x00, 0x00 ,0x00, 0x06  ,0x00, 0x03 ,0x36, 0x37 ,0x7c, 0xa8 ,0x00, 0x00 ,0x00, 0x00 ,0x49, 0x45 ,0x4e, 0x44 ,0xae, 0x42 ,0x60, 0x82 ,0x0a]);

  res.end(buffer);*/
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
