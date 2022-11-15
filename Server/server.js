
const socket = io('ws://localhost:8080');

socket.on('message', text => {
    console.log('this is one data');
    console.log(text)

});
