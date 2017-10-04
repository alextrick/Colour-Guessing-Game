let colors = populateColors(6);


// choose random colors;

function pickRGB() {
    return Math.floor(Math.random() * 256);
}

function fullRGB() {
    return 'rgb(' + pickRGB() + ', ' + pickRGB() + ', ' + pickRGB() + ')';
}

function getValues(rgb) {
    let values = [];
    let start = 4
    let end = rgb.indexOf(",")
    for (i = 0; i < 3; i++) {
        values.push(rgb.slice(start, end));
        start = end + 2;
        end = rgb.indexOf(",", start);
    };
    return values;
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
let values = getValues(pickedColor);

let messageDisplay = document.getElementById("message");

const header = document.querySelector("header");

//get buttons
const reset = document.getElementById("reset");
const easy = document.getElementById("easyBtn");
const hard = document.getElementById("hardBtn");

// display the RGB value pf the picked color
// colorDisplay.textContent = pickedColor;


function changeColors(color) {
    for (i = 0; i < colors.length; i++ ) {
        squares[i].style.backgroundColor = color;
    };
    header.style.backgroundColor = color;
    r.style.color = "white";
    g.style.color = "white";
    b.style.color = "white";
}

function pickColor() {
   let number = Math.floor(Math.random() * colors.length);
   return colors[number];
}

//reset game
let diff = 6;

reset.addEventListener("click", function() {
    resetGame(diff)
})

const rBox = document.getElementById("r-box");
const gBox = document.getElementById("g-box");
const bBox = document.getElementById("b-box");

const r = document.getElementById("r");
const g = document.getElementById("g");
const b = document.getElementById("b");

function displayValues(arr) {
    rBox.textContent = arr[0];
    gBox.textContent = arr[1];
    bBox.textContent = arr[2];
}

function resetGame(num) {
    colors = populateColors(num);
    pickedColor = pickColor();
    values = getValues(pickedColor);
    displayValues(values);
    // colorDisplay.textContent = pickedColor;
    for (i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        //wait for click
        squares[i].addEventListener("click", function() {
            //store clicked color
            let clickedColor = this.style.backgroundColor;
    
            if (clickedColor === pickedColor) {
                changeColors(pickedColor);
                messageDisplay.textContent = "Correct!";
                reset.textContent = 'PLAY AGAIN?';
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again.";
            }
        });
    }
    reset.textContent = "RESET?";
    messageDisplay.textContent = ""
}

resetGame(diff);

// check for screen width
const mobileSize = window.matchMedia( "(max-width: 450px)" );
//get colNum CSS variable
let htmlStyles = window.getComputedStyle(document.querySelector("html"));
let colNum = parseInt(htmlStyles.getPropertyValue("--colNum"));

//easy / hard mode buttons
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

