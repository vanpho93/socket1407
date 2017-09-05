const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));
server.listen(3000, () => console.log('Server started!'));

// gui -- lang nghe

io.on('connection', socket => {
    // setInterval(() => socket.emit('SERVER_SEND_MESSAGE', Math.random()), 2000);
    socket.on('CLIENT_SEND_MESSAGE', message => {
        io.emit('SERVER_SEND_MESSAGE', message);
    });
});
