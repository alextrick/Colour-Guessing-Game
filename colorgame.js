let colors = populateColors(6);


// choose random colors;

function pickRGB() {
    return Math.floor(Math.random() * 256);
}

function fullRGB() {
    return 'rgb(' + pickRGB() + ', ' + pickRGB() + ', ' + pickRGB() + ')';
}

//generate the colors array
function populateColors(length) {
    arr = []
    for (i = 0; i < length; i++) {
        arr.push(fullRGB());
    };
    return arr;
}

let squares = document.querySelectorAll(".square");
let pickedColor = pickColor();

let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.getElementById("message");

const header = document.getElementById("top");

//get buttons
const reset = document.getElementById("reset");
const easy = document.getElementById("easyBtn");
const hard = document.getElementById("hardBtn");

// display the RGB value pf the picked color
colorDisplay.textContent = pickedColor;


function changeColors(color) {
    for (i = 0; i < colors.length; i++ ) {
        squares[i].style.backgroundColor = color;
    };
}

function pickColor() {
   let number = Math.floor(Math.random() * colors.length);
   return colors[number];
}

//reset game

reset.addEventListener("click", function() {
    resetGame(diff)
})

function resetGame(num) {
    colors = populateColors(num);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        //wait for click
        squares[i].addEventListener("click", function() {
            //store clicked color
            let clickedColor = this.style.backgroundColor;
    
            if (clickedColor === pickedColor) {
                changeColors(pickedColor);
                messageDisplay.textContent = "Correct!";
                header.style.backgroundColor = pickedColor;
                reset.textContent = 'PLAY AGAIN?';
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again.";
            }
        });
    }
    reset.textContent = "RESET?";
    header.style.backgroundColor = "steelblue";
    messageDisplay.textContent = ""
}

resetGame(6);

let diff = 6;

const mobileSize = window.matchMedia( "(max-width: 450px)" );

let htmlStyles = window.getComputedStyle(document.querySelector("html"));
let colNum = parseInt(htmlStyles.getPropertyValue("--colNum"));

easy.addEventListener("click", function() {
    easy.classList.add("selected");
    hard.classList.remove("selected");
    diff = 3;
    if (mobileSize) {
        document.documentElement.style.setProperty("--colNum", 1);
    };
    for (i=3; i < squares.length; i++) {
        squares[i].style.display = "none";
    }
    
    resetGame(diff);
})

hard.addEventListener("click", function() {
    hard.classList.add("selected");
    easy.classList.remove("selected");
    diff = 6;
    if (mobileSize) {
        document.documentElement.style.setProperty("--colNum", 2);
    };
    for (i=3; i < squares.length; i++) {
        squares[i].style.display = "block";
    };
    resetGame(diff);
})

