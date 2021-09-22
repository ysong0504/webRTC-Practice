import express from 'express';
import bodyParser  from 'body-parser';
import WebSocket from 'ws';
import http from 'http';

const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// an array where saves socket info
const sockets = [];


// 'on' receives event and funtion, 
// this method waits for the event to happen
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket['nickname'] == 'Annyomous'
    // 'socket'의 메소드를 사용 (not server's)
    console.log('connected to browser')
    socket.on("close", () => {
        // sockets.pop();
        console.log('disconnected from the browser');
    });
    socket.on("message", (message) => {
        const msg = JSON.parse(message);
        console.log(22, msg)
        switch(msg.type) {
            case "new_message":
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${msg.payload}`));  //forEach makes wss to send msg to all sockets that are connected
                console.log(33, msg.payload)    
                break;
            case "nickname":
                socket['nickname'] = msg.payload;   //socket은 object야
                console.log(11, msg.payload)
                break;

        }
      
    });
});  
server.listen(3000, handleListen);