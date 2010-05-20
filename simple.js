var sys = require('sys'),
  http = require('http');

var stdin = process.openStdin();

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  response.write("\u200B");
  var writes = 0;
  var lines=["Once upon a time", "You dressed so fine", "You threw the bums a dime", "In you're prime", "Didn't you?"];

  (function writeToResponse(){
      response.write(lines[writes] + '\n');
      writes++;
    
    if(writes<5){
      setTimeout(writeToResponse, 1500);
    }else{
      response.end('\n');
    }
  })() 
}).listen(8000);

sys.puts('Server running at http://127.0.0.1:8000/');
