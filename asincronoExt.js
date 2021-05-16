const http = require('http');
const fs = require('fs');

http.createServer((request, response)=>{
    
    const file = request.url == '/' ? "./www/index.html" : `./www${request.url}`;

    if(request.url == '/login'){
        let data = [];

        request.on("data", value => {
            data.push(value);
        }).on("end",()=>{
            let params = Buffer.concat(data).toString();
            console.log(params);
            response.write(params);
            response.end();
        });
    }

    fs.readFile(file, (err, data)=>{
        if(err){
            response.writeHead(400, {"Content-Type":"text/plain"});
            response.write("Not found");
            response.end();
        }
        else{
            const extension = file.split('.').pop();
            console.log(extension);
            switch (extension) {
                case 'txt':
                    response.writeHead(200, {"Content-Type":"text/plain"});
                    break;

                case 'html':
                    response.writeHead(200, {"Content-type":"text/html"});
                    break;
            
                case 'jpeg':
                    response.writeHead(200, {"Content-type":"text/jpeg"});
                    break;

                case 'css':
                    response.writeHead(200, {"Content-type":"text/css"});
                    break;
                
                case 'js':
                    response.writeHead(200, {"Content-type":"text/javascript"});
                    break;

                default:
                    response.writeHead(200, {"Content-Type":"text/plain"});
                    break;
            }
            response.write(data);
            response.end();
        }
    });  
}).listen(5050);