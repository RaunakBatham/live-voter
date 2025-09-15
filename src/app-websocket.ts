// Socket.io Server

import { Server } from "socket.io";
import { createServer } from "node:http";
import app from "./app-express";
import { getPolls } from "./polls/module";

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST"],
  },
});

// poll:join  -> poll:result

io.sockets.on("connection", async (socket) => {
  console.log("a user connected");
  socket.emit("poll:result", await getPolls({}));
  console.log("Poll results sent");
});

io.sockets.on("disconnect", () => {
  console.log("Client Disconnected");
});

export default server;
