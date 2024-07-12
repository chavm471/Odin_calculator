//variables to use
const CONTAINER_WIDTH = 35;
const CONTAINER_HEIGHT = 80;
const BUTTON_TOTAL = 19;
const CALCULATOR_KEYS = ["C","+/-","%","/","7","8","9","x","4","5","6",
                            "-","1","2","3","+","0",".","="];
const OPERATIONS = ["+/-","%","/","x","-","+","="];


//add two numbers
function add(num1,num2){
    return num1 + num2;
}
//subtracts two numbers
function subtract(num1,num2){
    return num1 - num2;
}

function multiply(num1,num2){
    return num1 * num2;
}

function divide(){
    return num1/num2;
}

//this functions handles the display of the calculator
function updateDisplay(value){
    //select the display id
    const display = document.getElementById("display");

    if(display.textContent === '0')
    {
        //if display is just display 0 replace that with the value
        display.textContent = value;
    }
    else {
        display.textContent += value;
    }
}

function clearDisplay(){
    //select the display id
    const display = document.getElementById("display")
    display.textContent = '0';
}

function createCalculator(){
    //determine the height and width of each button in the calculator
    //for my calculator theres only 4 buttons on the x axis
    let width = (CONTAINER_WIDTH/4) + "vw";
    //for my calculator theres only 4 buttons on the y axis
    let height = (CONTAINER_HEIGHT/6) + "vh";

    //create the display to view things in it
    const body = document.body;
    //creater a new div element
    const display = document.createElement("div");
    display.id = "display"; //set an ID
    //make border so it looks like its part of the calculator
    display.style.display = "flex";
    display.style.justifyContent = "flex-end";
    display.style.alignItems = "flex-end";
    display.style.borderTop = "5px solid black";
    display.style.borderLeft = "5px solid black";
    display.style.borderRight = "5px solid black";
    display.style.width = CONTAINER_WIDTH + "vw";
    display.style.height = "10vh";
    display.style.fontSize = "50px"
    display.style.fontFamily = "Arial, Helvetica";
    display.textContent = "0";
    
    //select the container element to be able to insert display before it
    //and be able to insert buttons later
    const container = document.querySelector("#content");

    body.insertBefore(display,container);


    //insert each button
    for(let i = 0; i < 19; i++){
        const button = document.createElement("button");

        //add numbers
        button.classList.add("button-num");

        button.style.border = "none";
        button.style.width = width;
        button.style.height = height;
        button.style.borderRadius = "50%"; //makes border a circle
        
        if(OPERATIONS.includes(CALCULATOR_KEYS[i])){
            button.style.backgroundColor = "orange";
        }
        else{
            button.style.backgroundColor = "black";
        }

        button.style.color= "white";
        button.style.fontFamily = "Arial, Helvetica";
        button.style.fontSize = "24px";
        button.textContent = CALCULATOR_KEYS[i];

        container.appendChild(button);
        
    }

}

function operate(firstNum,secondNum,operation){
    let result = 0;

    if(operation === "+"){
        result = firstNum + secondNum;
    }
    if(operation === "-"){
        result = firstNum - secondNum;
    }
    if(operation === "*"){
        result = firstNum * secondNum;
    }
    if(operation === "/"){
        result = firstNum / secondNum;
    }

    return result;
}

function main(){
    let firstNum = '';
    let secNum = '';
    let operation = '';
    let temp = '';
    let operatorClicked = false;
    createCalculator();

    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            temp= button.textContent;

            //if button is number
            if(!isNaN(temp) || temp === "."){
                //check if the operator flags has been set off
                if(operatorClicked){
                    clearDisplay();
                    operatorClicked = false;
                }
                updateDisplay(temp);
            }

            //if user selects operations
            if(OPERATIONS.includes(temp)){
                if(temp !== '='){
                    //if any operator is clicked then flag is set
                    operatorClicked = true;
                    firstNum = parseFloat(document.getElementById("display").textContent);
                    operation = temp;
                    //highlight the operator button
                    button.style.backgroundColor = "white";
                    button.style.color = "orange";
                }
                else{
                    secNum = parseFloat(document.getElementById("display").textContent);
                    let result = operate(firstNum,secNum,operation);
                    document.getElementById("display").textContent = result;
                    firstNum = result;
                }
            }

            if(temp ==="C")
            {
                clearDisplay();
                //reset local variables
                firstNum = '';
                secNum = '';
                operation = '';
                operatorClicked = false;
            }

        })
    })
    return;
}

main();