import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
const clients = {};
const histStorage = [];

const webSocketServer = new WebSocketServer({ port: 4400 });

webSocketServer.on("connection", function connection(con) {
  const id = uuidv4();
  clients[id] = con;

  console.log(`New client connected ${id}`);
  con.send(JSON.stringify(histStorage));

  con.on("message", function message(data) {
    const { username, message } = JSON.parse(data.toString());
    histStorage.push({ username, message });
    for (const id in clients) {
      clients[id].send(JSON.stringify([{ username, message }]));
    }
  });
  con.on("close", () => {
    delete clients[id];
    console.log(`Client ${id} has been disconnected`);
  });
  con.on("error", function (err) {
    console.error(`error 💥: ${err.message}`);
  });
});

console.log("Websocket server is running on port 4400");
