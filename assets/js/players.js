import { disableChat, enalbeChat } from "./chat";
import {
    disalbeCanvas,
    enableCanvas,
    hideControls,
    resetCanvas,
    showControls,
} from "./paint";

let getSec = null;
let curSec = null;
let diffSec = null;

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

const setTimerNotis = () => {
    curSec = Date.now();
    diffSec = ((30000 - (curSec - getSec)) / 1000).toFixed(1);
    if (diffSec < 0) {
        timer.innerText = "";
    } else {
        timer.innerText = `Time left: ${diffSec}`;
    }
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

export const handleGameTimer = ({ sec }) => {
    getSec = sec;
    setInterval(setTimerNotis, 100);
};

export const handleLeaderNotif = ({ word }) => {
    enableCanvas();
    showControls();
    disableChat();
    setNotifs(`You are the leader, paint: ${word}`);
};

export const handleGameEnded = () => {
    setNotifs("Game ended.");
    getSec = 0;
    disalbeCanvas();
    hideControls();
    resetCanvas();
};

export const handleGameStarting = () => {
    // console.log(timeout);
    setNotifs("Game will start soon");
};
