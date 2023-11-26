const express = require('express');
const cors = require('cors');

const {getLine} = require('./line.js');
const {joinTheLine} = require('./line.js');
const {serveCustomer} = require('./line.js');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();



app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Send a post request to /getin and getinto the line");
    res.end();
});

app.get('/serve',(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    let remain = serveCustomer();

    io.emit('serve',"one customrer got served");

    res.send(res.send(JSON.stringify(getLine())));
    res.end();
})

app.get('/line',(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(getLine()));
    res.end();
});

app.post('/line', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    //console.log(req.body);
    tokenNo = joinTheLine(req.body);
    answer = {}
    answer.tokenNo = tokenNo;
    answer.status = "success";

    io.emit('lineUpdate','New member has been added to the line');
    
    res.send(JSON.stringify(answer));
    res.end();
});





const expressServer = app.listen(5000,()=> console.log("Server running in 5000"));


const io = new Server(expressServer,{
    cors:{
        origin:['https://queue.ccbp.tech','null']
    }
});

io.on("connection",(socket)=>{
    socket.on("ping",(data)=>{
        console.log("Got a ping request");
        console.log(data);
        socket.emit("pong",{name:"server"});
    });
});




