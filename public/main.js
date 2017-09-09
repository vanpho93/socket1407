$('#div-chat').hide();

const socket = io();
let remoteUsername = null;

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

// $('#list-user p').click(function() {
//     console.log($(this).text());
// });

$('#list-user').on('click', 'p', function() {
    // $(something).addClass('');
    remoteUsername = $(this).text();
    $('#list-user p').removeClass('active');
    $(this).addClass('active');
});

$('#list-room').on('click', 'p', function() {
    $('#list-room p').removeClass('active');
    $(this).addClass('active');
    const roomName = $(this).text();
    socket.emit('CLIENT_JOIN_ROOM', roomName);
});


$('#btnSendPrivate').click(() => {
    if (!remoteUsername) return alert('Ban phai chon mot nguoi de chat');
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_PRIVATE_MESSAGE', { message, username: remoteUsername });
    $('#txtMessage').val('');
});

$('#btnSendRoom').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_ROOM_MESSAGE', message);
    $('#txtMessage').val('');
});

// $('#id').remove();

