$('#div-chat').hide();

const socket = io();

socket.on('SERVER_SEND_MESSAGE', message => {
    $('#list-message').append(`<p>${message}</p>`)
});

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_MESSAGE', message);
    $('#txtMessage').val('');
});

$('#btnSignIn').click(() => {
    const username = $('#txtUsername').val();
    socket.emit('CLIENT_SIGN_IN', username);
});

socket.on('SIGN_IN_SUCCESSFULLY', () => {
    $('#div-chat').show();
    $('#div-sign-in').hide();
});

socket.on('USERNAME_EXISTED', () => {
    alert('Please choose another username');
});
