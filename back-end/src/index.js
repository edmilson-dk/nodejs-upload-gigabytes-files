const http = require("http");
const socketIo = require("socket.io");

const PORT = 3000;

const handler = function (request, response) {
  const defaultRoute = async (request, response) => response.end("Hello!");

  return defaultRoute(request, response);
}

const server = http.createServer(handler);

// Socket io

const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: false,
  }
});

io.on("connection", (socket) => {
  console.log(`Someone connected: `, socket.id);
});

// const interval = setInterval(() => {
//   io.emit("file-uploaded", 5e6);
// }, 250);

const startServer = () => {
  const { address, port } = server.address();
  console.log(`Server at running in http://${address}:${port}`);
}

server.listen(PORT, startServer);