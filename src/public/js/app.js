 const socket = new WebSocket(`ws://${window.location.host}`);
 const nickForm = document.querySelector('#nick');
 const messageForm = document.querySelector('#message');
 const messageList = document.querySelector('ul');

 socket.addEventListener("open", () => {
    console.log('connected to server')
 });


 socket.addEventListener("message", (msg) => {
    const li = document.createElement('li');
    console.log(msg);
    li.innerText = msg.data;
    messageList.append(li)
   //  console.log(`got a msg: ${msg.data.toString('utf8')}`)
 });


 socket.addEventListener("close", () => {
    console.log('disconnected to server')
 });

function makeMessage(type, payload) {
   const msg = {type, payload};
   return JSON.stringify(msg)
}


function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
//   socket.send(input.value);
  socket.send(makeMessage("new_message", input.value))
  input.value = "";
}

function handleNickSubmit(event) {
   event.preventDefault(); // what is this
   const input = nickForm.querySelector("input");
   socket.send(makeMessage("nickname", input.value))
   // socket.send({
   //    type:"nickname",
   //    payload: input.value
   // });
   input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);