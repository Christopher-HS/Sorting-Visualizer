import SortArea from "./sortArea.js"
import Bar from "./bar.js"
import BarHandler from "./barHandler.js"
import selectionSort from "./selectionSort.js"
import { states } from "./state.js"
import {InputManager, inputs} from "./input.js"


const canvas  = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const width = innerWidth-25
const height = innerHeight-25
const maxBarHeight = 300;
const numElements = 50;
const barSpacing = 1/numElements+2;
canvas.width = width
canvas.height = height
canvas.style.background="black"



const sortWidth = 1000;
const sortHeight = 600;

let arr = [];
let barArray = []

const startButton = document.getElementById("startBtn")
const pauseButton = document.getElementById("pauseBtn")
const nextButton = document.getElementById("nextBtn")
pauseButton.onclick = function(){
    input.setLastInput(inputs.PAUSE);
}
startButton.onclick = function(){
    input.setLastInput(inputs.START);
}
nextButton.onclick = function(){
    input.setLastInput(inputs.NEXT);
}
const input = new InputManager();
const barHandler = new BarHandler(barArray, input)
const area = new SortArea(sortWidth, sortHeight, (width-sortWidth)/2,(height-sortHeight)/2, barHandler)
for (let i = 0; i < numElements; i++) {
    const height = generateRandInt(10,maxBarHeight)
    arr[i] = height;
    const barWidth = (sortWidth-(numElements+1)*barSpacing)/numElements
    const bar = new Bar(barWidth, height, area.posX+barSpacing*(i+1)+barWidth*i, area.posY+(sortHeight-height)-barSpacing)
    barArray[i]=bar;
}
const animation = selectionSort(arr)
barHandler.animation = animation




animate()

function generateRandInt(min, max){
    const diff = max-min;
    const num = Math.floor(Math.random()*diff)
    return num+min;
}
function animate(){
    ctx.clearRect(0,0,width,height)
    area.update(ctx)
    barArray.forEach(bar=>{
        bar.update(ctx)
    })
    requestAnimationFrame(animate)
}


//  Todo:
//  Add feature to randomize array
//  Allow an input array with file
//  
