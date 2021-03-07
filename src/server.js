import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) =>
    res.render("home", {
        events: JSON.stringify(events),
    })
);

const handleListening = () =>
    console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

// io => 이름 자유, 서버를 의미
const io = socketIO(server);

// only one socket
// 여기서 socket.on을 하면 client의 말을 듣는 개념 (listening)
// -> data객체를 받을 수 있다.
// 반대로 여기서 emit을 하면 server에서 메세지를 보냄
// socket : interaction을 위한 변수 (다양한 정보가 포함됨)
io.on("connection", (socket) => socketController(socket, io));
