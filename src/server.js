import express from 'express';
import WebSocket from 'ws';
import http from 'http';

const app = express();

app.set('view engine', 'pug');  // view engine
app.set('views', __dirname + "/views");     // view template
app.use('/public', express.static(__dirname + '/public'));  // 유저가 지정한 파일에만 접근할 수 있도록 설정 (for 보안)
app.get('/', (req,res) => res.render('home'))
app.get('/*', (req,res) => res.redirect('/')) // 다른 url 로 접근 시 home으로 리다이렉트

// http protocol
// const handleListen = () => console.log('Listening on http://localhost:3000')
// app.listen(3000, handleListen);   

// websocket protocol
const handleListen = () => console.log('Listening on http://localhost:3000')
const server = http.createServer(app); // create a server using express application
const wss = new WebSocket.Server({ server }) // when starting http servers, wss will also start. creating ws server on top of http server 
// for browser to connect to server oneway, server no need to set up for wss

// sockect: a certain connection with browser, 
// it provides client information through 'on' method
const sockets = [];


// 'on' receives event and funtion, 
// this method waits for the event to happen
wss.on("connection", (socket) => {
    sockets.push(socket);
    // 'socket'의 메소드를 사용 (not server's)
    console.log('connected to browser')
    socket.on("close", () => {
        console.log('disconnected from the browser');
    });
    socket.on("message", (message) => {
        console.log(message.toString('utf8'));
        socket.send(message)
    });

    

    // console.log(socket)
});  
server.listen(3000, handleListen);
