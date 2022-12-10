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
    console.log("desconectou");
  });

  socket.on("msg", (data) => {
    // enviado mensagem apartir do servidor assim o evento será passado para todos conectados no servido;
    io.emit("showmsg", data);

    //outra forma seria usar socket.bradcast.emit("showmsg") usando esse metodo o evento seria passado para todos conectados no servidor menos para o usuario que o emitiu
  });
});

http.listen(3000, () => {
  console.log("servidor online");
});
