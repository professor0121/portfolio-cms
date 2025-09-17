import app from "./src/app.js";
import http from "http";

const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})
