//variables to use
const CONTAINER_WIDTH = 35;
const CONTAINER_HEIGHT = 80;
const BUTTON_TOTAL = 19;

function add(){
    return;
}

function subtract(){
    return;
}

function multiply(){
    return;
}

function divide(){
    return;
}

function createCalculator(){
    //determine the height and width of each button in the calculator
    //for my calculator theres only 4 buttons on the x axis
    let width = (100/4) + "vw";
    //for my calculator theres only 4 buttons on the y axis
    let height = (100/5) + "vh";

    //create the display to view things in it

    //select the container element to be able to insert in it
    const container = document.querySelector("#content");

    //insert each button
    for(let i = 0; i <= 19; i++){
        const button = document.createElement("button");

        //add numbers
        button.classList.add("button-num");

        //button.style.border = "none";
        button.style.borderRadius = "50%"; //makes border a circle
        button.style.backgroundColor = "black";
        button.style.color= "white";

        container.appendChild(button);
        
    }

}

function operate(){

    return;
}

function main(){
    createCalculator();
    return;
}

main();