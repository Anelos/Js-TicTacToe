var player1Window = document.getElementById("scorePlayer1");
var player2Window = document.getElementById("scorePlayer2");
var playerSymbol = "XO";
var table = document.getElementsByTagName("table")[0];
var gameBoard = document.getElementById("gameBoard");
var resultWindow = document.getElementById("resultWindow");
var players = ["", ""];
players[0] = prompt("Entrez le nom du joueur 1");
players[1] = prompt("Entrez le nom du joueur 2");
player1Window.getElementsByClassName("playerName")[0].innerHTML = players[0];
player2Window.getElementsByClassName("playerName")[0].innerHTML = players[1];
var score = [0, 0];

//#################################################################################################
// Création du tableau de jeu
function createTable() {
    for (var r = 0; r < 3; r++) {
        var row = table.insertRow();
        for (var c = 0; c < 3; c++) {
            var cell = row.insertCell();
            cell.className = "void";
        }
    }
}
//#################################################################################################
// Détermine qui commence
function whoStart() {
    var index = Math.floor(Math.random() * 2);
    alert(players[index] + " commence");
    return index;

}
//#################################################################################################
// Détermine qui est le prochain joueur à jouer
function nextPlayer(Index) {
    if (Index == 0) {
        return 1;
    } else {
        return 0;
    }
}
//#################################################################################################
// Détermine les conditions de victoire
function isWon(player) {
    var win = true;
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            if (table.rows[r].cells[c].className == player) {
                win &= true;
            } else {
                win = false;
                break;
            }
        }
        return win;
        win = true;
    }
    for (var c = 0; c < 3; c++) {
        for (var r = 0; r < 3; r++) {
            if (table.rows[r].cells[c].className == player) {
                win &= true;
            } else {
                win = false;
                break;
            }
        }
        return win;
        win = true;
    }
    for (var d = 0; d < 3; d++) {
        if (table.rows[d].cells[d].className == player) {
            win &= true;
        } else {
            win = false;
        }
    }
    if (win) {
        return true;
    }
    win = true;
    for (var d = 0; d < 3; d++) {
        var c = 2 - d;
        if (table.rows[d].cells[c].className == player) {
            win &= true;
        } else {
            win = false;
        }
    }
    return win;
}
//#################################################################################################
// Détermine si égalité
function isDraw() {
    var cell = document.getElementsByTagName("td");
    for (var c = 0; c < 9; c++) {
        if (cell[c].className == "void") {
            return false;
        }
    }
    return true;
}
//#################################################################################################
function play(cell) {

    cell.className = "player" + (playerIndex + 1);
    cell.innerHTML = playerSymbol[playerIndex];
    if (isWon("player" + (playerIndex + 1))) {
        score[playerIndex]++;
        resultWindow.style.visibility = "visible";
        gameBoard.style.visibility = "hidden";
        document.getElementById("resultMessage").innerHTML = players[playerIndex] + " a gagné!";
        return;
    }
    if (isDraw()) {
        resultWindow.style.visibility = "visible";
        gameBoard.style.visibility = "hidden";
        document.getElementById("resultMessage").innerHTML = "Egalité!";
    }
    playerIndex = nextPlayer(playerIndex);
    return;
}
//#################################################################################################
function replay() {
    gameBoard.style.visibility = "visible";
    resultWindow.style.visibility = "hidden";
    table.innerHTML = "";
    createTable();
    scoreDisplay();
    return
}
//#################################################################################################
// affiche le score
function scoreDisplay() {
    player1Window.getElementsByClassName("scoreText")[0].innerHTML = score[0];
    player2Window.getElementsByClassName("scoreText")[0].innerHTML = score[1];
    if (score[0] < score[1]) {
        document.body.style.backgroundImage = "url('IMAGES/firewall_cleansing_fire.jpg')";
    } else if (score[0] > score[1]) {
        document.body.style.backgroundImage = "url('IMAGES/thumb-1920-211736.jpg')";
    } else {
        document.body.style.backgroundImage = "url('IMAGES/diablo-fantasy-wow-world-of.jpg')";
    }
    return;
}
//#################################################################################################
function giveUp() {
    resultWindow.style.visibility = "visible";
    gameBoard.style.visibility = "hidden";
    console.log(players[playerIndex] + " a abandonné");
    document.getElementById("resultMessage").innerHTML = players[playerIndex] + " a abandonné";
    playerIndex = nextPlayer(playerIndex);
    score[playerIndex]++;
    return;
}
//#################################################################################################
var playerIndex = whoStart();
createTable();
scoreDisplay();
table.onclick = function (e) {
    if (e.target.className == "void") {
        play(e.target);
    }
}
