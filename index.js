const express = require("express");
const app = express();
const ejs = require("ejs");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

//evento de conexão
io.on("connection", (socket) => {
  //tratando evento de desconexão
  socket.on("disconnect", () => {
    console.log("X desconectou");
  });

  //eventos especificos que virão do front
  socket.on("boasvindas", (data) => {
    console.log(data);
  });

  socket.on("msg", (data) => {
    socket.emit("resultado", "seja bem vindo " + data + " !");
  });
});

http.listen(3000, () => {
  console.log("servidor online");
});
