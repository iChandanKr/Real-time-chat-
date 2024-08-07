const socket = io();

// socket.on('countUpdate',(count)=>{
//     console.log('here is the updatedCount',count)
// })

// const btn = document.querySelector('#counter');
// btn.addEventListener('click',increment);
// function increment(){
//   console.log('clicked')
//   socket.emit('increment');

// }
socket.on("message", (data) => {
  console.log(data);
});

socket.on("sendMessage", (data) => {
  console.log(data);
});

let msg;
const form = document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.querySelector("input").value;
  console.log(msg);
  socket.emit("message", msg,()=>{
    console.log('message delivered!')
  });
});

// const send = document.querySelector('#btn').addEventListener('click',()=>{
//     console.log(msg)

// })

const shareLocation = document
  .querySelector("#share-location")
  .addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("your browser does not support geolocation");
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      socket.emit("location", position,()=>{
        console.log('location shared')
      });
    });
  });

  socket.on('currentLocation',data=>{
    console.log(data)
  })