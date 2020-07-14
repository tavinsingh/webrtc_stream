const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

const port = 3000;

/** Socket.io lifecycle functions */
io.sockets.on("error", (e) => console.log(`Error: ${e}`));

io.sockets.on("connection", (socket) => {
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
