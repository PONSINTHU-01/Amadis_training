const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    fs.readFile('index.html',(err,data)=>{
    if(err){
        res.writeHead(200,{'content-type':'text/html'});
        res.end('Error');

    }
    else{
        res.writeHead(200,{'content-type':'text/html'});
        res.end(data);
    }
    });
});
server.listen(3000,()=>{
console.log("server is running in http//localhost:3000");
});