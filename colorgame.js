let colors = populateColors(6);

//get CSS variables
let htmlStyles = window.getComputedStyle(document.querySelector("html"));
let colNum = parseInt(htmlStyles.getPropertyValue("--colNum"));
let mainColor = htmlStyles.getPropertyValue("--mainColor");

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

function lighten(color) {
    let rgbArray = getValues(color);
    for (i = 0; i < rgbArray.length; i++) {
        rgbArray[i] = parseInt(rgbArray[i])
        if (rgbArray[i] < 200) {
            rgbArray[i] += 50;
        }
        else {
            rgbArray[i] = 250;
        }
    }
    return 'rgb(' + rgbArray[0] + ', ' + rgbArray[1] + ', ' + rgbArray[2] + ')';
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
        squares[i].style.filter = null;
        squares[i].style.backgroundColor = color;
    };
    header.style.backgroundColor = color;
    r.style.background = color;
    g.style.background = color;
    b.style.background = color;
}

function resetImages() {
    r.style.background = null
    g.style.background = null
    b.style.background = null
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
    header.style.backgroundColor = mainColor;
    colors = populateColors(num);
    pickedColor = pickColor();
    values = getValues(pickedColor);
    displayValues(values);
    resetImages();
    // colorDisplay.textContent = pickedColor;
    for (i = 0; i < squares.length; i++) {
        squares[i].style.filter = null;
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
                this.style.filter = "brightness(200%) saturate(50%)";                              
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

//set padding to vertically center text;
const height = header.clientHeight;
let fontData = window.getComputedStyle(r).getPropertyValue('font-size')
let fontHeight = parseFloat(fontData);
const elements = header.children;

if (mobileSize) {
    for (i = 0; i < 3; i++) {
        elements[i].style.paddingTop = (height  - fontHeight) / 2 + 'px';
    }
}

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

