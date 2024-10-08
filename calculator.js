//variables to use
const CONTAINER_WIDTH = 35;
const CONTAINER_HEIGHT = 80;
const BUTTON_TOTAL = 19;
const CALCULATOR_KEYS = ["C","+/-","%","/","7","8","9","x","4","5","6",
                            "-","1","2","3","+","0",".","="];
const OPERATIONS = ["/","x","-","+","="];
const TOP_ROW = ["C","+/-","%"];


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

function divide(num1,num2){
    let temp = num1/num2;
    let result = temp.toFixed(2);
    return result;
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

//this function clear the calculator buttons back the original colors,
//and resets the number display back to 0
function clearDisplay(){
    //select the display id
    const calculator = document.getElementById("content");

    //get the child nodes inside my container
    const children = calculator.children;
    
    Array.from(children).forEach(node => {
        //if the node is a operator
        if(OPERATIONS.includes(node.textContent)){
            node.style.backgroundColor = "orange";
            node.style.color = "white";
        }
    });

    //clear out the the display and display 0
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
    container.style.backgroundColor = "black";
    container.style.justifyContent = "space-between";
    container.style.alignItems = "center";
    //container.style.alignContent = "space-between";

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
        else if(TOP_ROW.includes(CALCULATOR_KEYS[i])){
            button.style.backgroundColor = "gray";
        }
        else{
            button.style.backgroundColor = "#2B2B2B";
        }

        button.style.color= "white";
        button.style.fontFamily = "Arial, Helvetica";
        button.style.fontSize = "24px";
        button.textContent = CALCULATOR_KEYS[i];

        //after this the button has the key assigned to it
        if(CALCULATOR_KEYS[i] === '0'){
            button.style.flex ="2 1 auto";
            button.style.borderRadius = "45px";
        }

        container.appendChild(button);
        
    }

}

function operate(firstNum,secondNum,operation){
    let result = 0;

    if(operation === "+"){
        result = add(firstNum,secondNum);
    }
    else if(operation === "-"){
        result = subtract(firstNum,secondNum);
    }
    else if(operation === "x"){
        result = multiply(firstNum,secondNum);
    }
    else if(operation === "/"){
        //check if either is number is 0
        if (firstNum === 0 || secondNum === 0){
            //send an error and clear the display
            alert('sorry this is invalid input.');
            clearDisplay();
            return 0;
        }
        result = divide(firstNum,secondNum);
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

    //select all button to listen for if they are clicked
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            //get the user input and determine what it is.
            temp= button.textContent;

            //if button is number and handles decimal too
            if(!isNaN(temp) || temp === "."){
                //check if the operator flags has been set off, if it has were going to
                if(operatorClicked){
                    //if it has it clears the display to get the next number
                    clearDisplay();
                    //reset the operator clicked flag
                    operatorClicked = false;
                }
                //updates the display
                updateDisplay(temp);
            }

            //special handle the negative sign 
            //Handle +/- operation immediately
            if(temp === "+/-"){
                let currentValue = parseFloat(document.getElementById("display").textContent);
                //make sure there a number besides zero to make negative
                if(currentValue){
                    currentValue = -Math.abs(currentValue); 
                    //currentValue = -currentValue;
                    document.getElementById("display").textContent = currentValue.toString();
                    //updateDisplay(currentValue.toString());
                }
                return;
            }

            //special handle the percent sign
            if(temp ==="%"){
                let currentValue = parseFloat(document.getElementById("display").textContent);
                //make sure there a number besides zero to make negative
                if(currentValue){
                    currentValue = currentValue / 100;
                    //currentValue = -currentValue;
                    document.getElementById("display").textContent = currentValue.toString();
                    //updateDisplay(currentValue.toString());
                }
            }

            //if user selects operations get ready to read in second number
            if(OPERATIONS.includes(temp)){
                if(temp !== '='){
                    //if any operator is clicked then flag is set
                    operatorClicked = true;

                    //store the first number
                    if(!firstNum) // check that its an empty string
                    {
                        firstNum = parseFloat(document.getElementById("display").textContent);
                    }
                    else{
                        //there is already a number defined
                        secNum = parseFloat(document.getElementById("display").textContent);
                        firstNum = operate(firstNum,secNum,operation);
                        document.getElementById("display").textContent = firstNum;
                    }
                    //set the operation to the selected operator
                    operation = temp;

                    // Highlight the operator button
                    button.style.backgroundColor = "white";
                    button.style.color = "orange";
                }

                //if the user has pressed = then you get the result by calling appropiate 
                //functions.
                else{
                    secNum = parseFloat(document.getElementById("display").textContent);
                    let result = operate(firstNum,secNum,operation);
                    document.getElementById("display").textContent = result;
                    firstNum = result;
                    operation = '';
                }
            }
            
            //when user clicks on the clear button it clears the display 
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