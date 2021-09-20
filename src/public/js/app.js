 const socket = new WebSocket(`ws://${window.location.host}`);
 const messageForm = document.querySelector('form');
 const messageList = document.querySelector('ul');

 socket.addEventListener("open", () => {
    console.log('connected to server')
 });


 socket.addEventListener("message", (msg) => {
    console.log(`got a msg: ${msg.data}`)
 });


 socket.addEventListener("close", () => {
    console.log('disconnected to server')
 });


 function handleSubmit(event) {
     event.preventDefault();
     const input = messageForm.querySelector('input');
     socket.send(input.value);
     input.value = "";
 }
 
 messageForm.addEventListener('submit', handleSubmit)