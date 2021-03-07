import { disableChat, enalbeChat } from "./chat";
import {
    disalbeCanvas,
    enableCanvas,
    hideControls,
    resetCanvas,
    showControls,
} from "./paint";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const timer = document.getElementById("jsTimer");

const addPlayers = (players) => {
    board.innerText = "";
    players.forEach((player) => {
        const playerElement = document.createElement("span");
        playerElement.innerText = `${player.nickname}: ${player.points}`;
        board.appendChild(playerElement);
    });
};

const setNotifs = (text) => {
    notifs.innerText = "";
    notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
    setNotifs("");
    // disable canvas events
    disalbeCanvas();
    // hid canvas controls
    hideControls();
    enalbeChat();
};

export const handleGameTimer = () => {
    timer.innerText = "10sec left";
};

export const handleLeaderNotif = ({ word }) => {
    enableCanvas();
    showControls();
    disableChat();
    setNotifs(`You are the leader, paint: ${word}`);
};

export const handleGameEnded = () => {
    setNotifs("Game ended.");
    disalbeCanvas();
    hideControls();
    resetCanvas();
};

export const handleGameStarting = () => {
    // console.log(timeout);
    setNotifs("Game will start soon");
};
