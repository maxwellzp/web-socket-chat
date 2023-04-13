const socket = new WebSocket("ws://127.0.0.1:4400");

const chatForm = document.getElementById("chatForm");
const chatEl = document.getElementById("chat");
const usernameEl = document.getElementById("username");
const messageEl = document.getElementById("message");

socket.addEventListener("open", (event) => {
  console.log("Connection with a websocket is opened");
});

socket.addEventListener("close", (event) => {
  console.log("Connection with a websocket is closed");
});

socket.addEventListener("error", (event) => {
  console.log(`Connection with a websocket has been closed. Error: ${event}`);
});

socket.addEventListener("message", (event) => {
  const messages = JSON.parse(event.data);
  messages.forEach((msg) => {
    const messageEl = document.createElement("div");
    messageEl.appendChild(
      document.createTextNode(`${msg.username}: ${msg.message}`)
    );
    chatEl.appendChild(messageEl);
  });
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = usernameEl.value;
  const message = messageEl.value;
  socket.send(
    JSON.stringify({
      username,
      message,
    })
  );
  messageEl.value = "";
});
