
const http= require('http');
const fs= require('fs');

http.createServer((request, response)=>{
  const file= './www/archivo.txt';
  fs.readFile(file,(err,data)=>{
    response.writeHead(200, {"Content.Type": "text/plain"});
    response.write(data);
    response.end();
  });
}).listen(5050);