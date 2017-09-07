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

socket.on('SIGN_IN_SUCCESSFULLY', arrUsername => {
    $('#div-chat').show();
    $('#div-sign-in').hide();
    arrUsername.forEach(username => $('#list-user').append(`<p id="user-${username}">${username}</p>`));
    socket.on('NEW_USER', username => {
        $('#list-user').append(`<p id="user-${username}">${username}</p>`);
    });
});

socket.on('USERNAME_EXISTED', () => {
    alert('Username USERNAME_EXISTED!');
});

socket.on('USER_LEAVE', username => {
    $(`#user-${username}`).remove();
});

// $('#id').remove();

