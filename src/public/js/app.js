const socket = io() //io is a function that automatically connects backend socket.io 
const welcome = document.getElementById('welcome')
const form = welcome.querySelector('form')

function handleRoomSubmit(event) {
   event.preventDefault();
   const input = form.querySelector('input');
   // By using SI, any event can be sent and js obj can be sent 
   // arg: event, obj, function
   socket.emit('enter_room', { payload: input.value }, () => {
      console.log('server is done')
   })    // emit the EVENT called room
   input.value = "";

}
form.addEventListener('submit', handleRoomSubmit);
