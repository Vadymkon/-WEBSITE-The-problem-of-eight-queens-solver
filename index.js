var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "AA", "BB", "CC", "DD", "EE", "FF"];
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"];
var board = []; var boardstan = [];
var cunter = 0;
var dil = 2;
//if (dil == 1) document.getElementById("opa").style.width = "704px";
if (localStorage.getItem("isUserPervert") == "yes") {
    somniteln0();
    if (localStorage.getItem("try3") == "yes") {
        document.getElementById("sometext").innerHTML = "звоню в СБУ";
        document.body.style.background = "url('materials/monkey.gif') no-repeat";
        document.body.style.backgroundSize = "54%";
        document.body.style.backgroundColor = "dimgrey";
        document.getElementById("size1").style.visibility = "hidden";
        document.getElementById("size2").style.visibility = "hidden";
    }
    else if (localStorage.getItem("try2") == "yes") {
        localStorage.setItem("try3", "yes");
        document.getElementById("sometext").innerHTML = "шо ти сторінку оновлюєш, не виходить?)";
    }
    else if (localStorage.getItem("try1") == "yes") localStorage.setItem("try2", "yes");
    else localStorage.setItem("try1", "yes");
}
document.getElementById("size1").onclick = function () {
    dil = 2; document.getElementById("opa").style.width = "352px";
    deletetabl(); settable();
};

document.getElementById("size2").onclick = function () {
    dil = 1; document.getElementById("opa").style.width = "704px";
    deletetabl(); settable();
};

document.getElementById("opa").onclick = function () { start(); };
document.getElementById("Dora").onclick = function () {
    alert(cunter < 1 ? "Dont Touch Dora, pervert." : "Stop it!");
    cunter++; if (cunter > 2) { somniteln0(); localStorage.setItem("isUserPervert", "yes"); }
};
document.getElementById("opa").onmouseout = function () {
    if (getRandomInt(15) == 14) {
        for (let i = 0; i < board.length; i++) {
            document.getElementById(board[i]).style.boxShadow =
                "inset 0.05em 0.05em 15px rgba(72, 60, 50,.25)";
        }
    }
};
document.getElementById("Dora").onmouseover = function ()
{
    for (let i = 0; i < board.length; i++)
        document.getElementById(board[i]).style.boxShadow =
            "inset 0.05em 0.05em 15px rgba(72, 60, 50,.25)";
};
var changer = 0;
var coloristik = {"Place":"color"};



//set table
for (let i = 0; i < letters.length / dil; i++) {
    for (let j = 0; j < numbers.length / dil; j++) {
        board.push(letters[i] + numbers[j]);
        boardstan.push(true)
        if (j % 2 == changer) makediv(letters[i] + numbers[j], 1);
        else makediv(letters[i] + numbers[j]);
    }
    changer = changer == 0 ? changer = 1 : 0;
}

function regenerate_board() {
    board = [];
    for (let i = 0; i < letters.length / dil; i++)
        for (let j = 0; j < numbers.length / dil; j++)
            board.push(letters[i] + numbers[j]);
}

function deletetabl() {
    try {
        for (let i = 0; i < board.length; i++)
            document.getElementById(board[i]).remove();
    }
    catch { }
}

function settable() {
    for (let i = 0; i < letters.length / dil; i++) {

        for (let j = 0; j < numbers.length / dil; j++) {
            boardstan.push(true)
            if (j % 2 == changer) makediv(letters[i] + numbers[j], 1);
            else makediv(letters[i] + numbers[j]);
        }
        changer = changer == 0 ? changer = 1 : 0;
    }
}

function start() {
    boardstan = [];
    regenerate_board();
    deletetabl();
    settable();

    //розкидка ферзiв
    for (let i = getRandomInt(180 / dil); i < board.length; i++)
        setInterval(() =>
        { if (boardstan[i] == true) { ferz(board[i]); } }, 200)
}

function ferz(str, mode = 0) {
    let letter = str;
    unsetDiagonal(letter, mode);
    unsetRow(letter, mode);
    unsetColumn(str, mode)
    if (mode == 0) {
        document.getElementById(str).style.background = "green";
        coloristik[str] = "green";
    }
}

function unset(str, mode = 0) {
    if (board.indexOf(str) != -1) {
        if (mode == 0) {
            boardstan[board.indexOf(str)] = false;
            document.getElementById(str).style.background = "grey";
            coloristik[str] = "grey";
        }
        else if (mode == 1) {
            document.getElementById(str).style.background = "darkgrey";
            document.getElementById(str).style.boxShadow =
                "10px 10px 75px rgba(72, 60, 50,.35)";
            if (document.getElementById(str).style.boxShadow ==
                "0px 0px 0px 0px")
                document.getElementById(str).style.boxShadow =
                    "inset 0.05em 0.05em 15px rgba(72, 60, 50,.25)";
        }
        else
        {
            document.getElementById(str).style.background = coloristik[str];
            document.getElementById(str).style.boxShadow = "0 0 0 0";
        }
    }
}

/*
 по диагонали: в масивах находится буква и цифра
 что в оригинале, а дальше попарно увеличиваются на 1
 и уменьшаются (индекс) пока не доберётся до конца массива
*/
function unsetDiagonal(str, mode = 0)
{
    let letter = str[0];
    if (letters.indexOf(str[1]) != -1) letter += str[1];
    //двойная буква
    let number = str.slice(1);
    if (letters.indexOf(number[0]) != -1) number = str.slice(2);

    //console.log(letter + " " + number);

    for (let i = letters.indexOf(letter), j = numbers.indexOf(number);
        i < letters.length && j < numbers.length; i++, j++)
        unset(letters[i] + numbers[j], mode);

    for (let i = letters.indexOf(letter), j = numbers.indexOf(number);
        i >= 0 && j >= 0; i--, j--)
        unset(letters[i] + numbers[j], mode);

    for (let i = letters.indexOf(letter), j = numbers.indexOf(number);
        i < letters.length && j >= 0; i++, j--)
        unset(letters[i] + numbers[j], mode);

    for (let i = letters.indexOf(letter), j = numbers.indexOf(number);
        i >= 0 && j < numbers.length; i--, j++)
        unset(letters[i] + numbers[j], mode);
}

function howmanyletters(str) {

    let letter = str[0];
    if (letters.indexOf(str[1]) != -1) letter += str[1];
    //двойная буква
    return letter.length;
}

//по горизонтали - совпадает буква
function unsetRow(str, mode = 0)
{
    let letter = str[0];
    if (letters.indexOf(str[1]) != -1) letter += str[1]; //двойная буква

    for (let i = 0; i < board.length; i++) {
        if (board[i].includes(letter) &&
            howmanyletters(board[i]) == letter.length)
        {
            unset(board[i], mode);
        }
    }
}

function howmanynumbers(str) {

    let letter = str.slice(1);
    if (letters.indexOf(letter[0]) != -1) letter = letter.slice(1);
    //двойная буква
    return letter.length;
}
//по вертикали - совпадает цифра
function unsetColumn(str, mode = 0) {
    let letter = str.slice(1);
    if (letters.indexOf(letter[0]) != -1) letter = letter.slice(1);
    //двойная буква
    for (let i = 0; i < board.length; i++) {
        if (board[i].includes(letter) &&
            howmanynumbers(board[i]) == letter.length) {
            unset(board[i], mode);
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function somniteln0() {
    document.body.style.background = "url('materials//frede.jpg') no-repeat";
    document.body.style.backgroundSize = "100% 100%";
    document.getElementById("Dora").style.visibility = "hidden";
    document.getElementById("opa").style.visibility = "hidden";
}

//создать поле
function makediv(str,mode=0) {
    let div = document.createElement("div");
    div.className = "box1";
    div.id = str;
    if (mode == 1)
        div.style.background = "#ffcf9e";
    coloristik[str] = mode == 1 ? "#ffcf9e" : "rgb(209,139,71)";
    //div.innerHTML = str;
    div.onmouseover = function () { ferz(str, 1) };
    div.onmouseout = function () { ferz(str, 2) };
    document.getElementById("opa").appendChild(div);
}