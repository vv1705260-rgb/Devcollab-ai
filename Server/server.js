require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// 🔥 SOCKET.IO
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
app.use('/api/ai', require('./routes/aiRoutes'));

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workspace', require('./routes/workspaceRoutes'));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);
