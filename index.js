const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));
server.listen(3000, () => console.log('Server started!'));

const arrUsername = ['sss', 'dddd', 'assd', 'sdsad'];

io.on('connection', socket => {
    socket.on('CLIENT_SEND_MESSAGE', message => {
        io.emit('SERVER_SEND_MESSAGE', `${socket.username}: ${message}`);
    });

    socket.on('CLIENT_SIGN_IN', username => {
        const isExisted = arrUsername.indexOf(username) !== -1;
        if (isExisted) return socket.emit('USERNAME_EXISTED');
        socket.emit('SIGN_IN_SUCCESSFULLY', arrUsername);
        socket.username = username;
        arrUsername.push(username);
        io.emit('NEW_USER', username);
    });

    socket.on('disconnect', () => {
        if(!socket.username) return;
        io.emit('USER_LEAVE', socket.username);
        const index = arrUsername.indexOf(socket.username);
        arrUsername.splice(index, 1);
    });
});

// Click sign in -> Gui username len server, server add username vao mang arrUsername 
// Server dap tra da dang ky thanh cong, client an hien divs

