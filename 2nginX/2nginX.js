const http = require("http")
const fs = require("fs")
const path = require("path")
const { log } = require("console")

const port = 3000


const server = http.createServer((req ,res)=>{
  const filePath =  path.join(__dirname, req.url === "/"? "index.html":req.url);   
        // console.log(filePath);
        

    const extName = String(path.extname(filePath)).toLocaleLowerCase()

   const mimeType = {
    '.html':'text/html',
    '.css':'text/css',
    ".js": "text/javascript",
    '.png':'text.png',

   } 

  const contentType = mimeType[extName] ||"application/octect-stream "

    fs.readFile(filePath,(err ,content)=>{

            if (err) {

                if (err.code === "ENOENT")
                  res.writeHead(404, { "Content-Type": contentType });
                res.end("file Not Found Brooo");
                
                
            } else {
                res.writeHead(200 ,{'Content-Type': contentType})
                res.end(content,"utf-8");
                
            }


    })

});


server.listen(port,()=>{
    console.log(`server is start at ${port}`);
    
})