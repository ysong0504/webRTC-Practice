import express from 'express';
import WebSocket from 'ws';
import http from 'http';
import SocketIO from 'socket.io';

const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');  // view engine
app.set('views', __dirname + "/views");     // view template
app.use('/public', express.static(__dirname + '/public'));  // 유저가 지정한 파일에만 접근할 수 있도록 설정 (for 보안)

app.get('/', (req,res) => res.render('home'))
app.get('/*', (req,res) => res.redirect('/')) // 다른 url 로 접근 시 home으로 리다이렉트


// websocket protocol
const httpServer = http.createServer(app); // create a server using express application


const wsServer = SocketIO(httpServer);    // create
wsServer.on('connection', (socket) => {
    // arg: event, msg, function
    socket.on('enter_room', (msg) => {
        console.log(msg);
    });
});

const handleListen = () => console.log('Listening on http://localhost:3000')
httpServer.listen(3000, handleListen);