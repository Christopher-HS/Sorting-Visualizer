import SortArea from "./sortArea.js"
import Bar from "./bar.js"
import BarHandler from "./barHandler.js"
import selectionSort from "./selectionSort.js"
import { states } from "./state.js"
import {InputManager, inputs} from "./input.js"
import * as utils from "./utils.js"

export const globals = {
    width: innerWidth-25,
    height: innerHeight-25,
    sortWidth: 1000,
    sortHeight: 600,
    numElements:30
}
const canvas  = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const maxBarHeight = globals.sortHeight-10;
const barSpacing = 1/globals.numElements+4;
canvas.width = globals.width
canvas.height = globals.height
canvas.style.background="black"





let arr = [];
let barArray = []

const startButton = document.getElementById("startBtn")
const pauseButton = document.getElementById("pauseBtn")
const nextButton = document.getElementById("nextBtn")
const shuffleButton = document.getElementById("shuffleBtn")
startButton.onclick = function(){
    input.setLastInput(inputs.START);
}
pauseButton.onclick = function(){
    input.setLastInput(inputs.PAUSE);
}
nextButton.onclick = function(){
    input.setLastInput(inputs.NEXT);
}
shuffleButton.onclick = function(){
    input.setLastInput(inputs.SHUFFLE);
}
const input = new InputManager();
const barHandler = new BarHandler(barArray, input)
const area = new SortArea(globals.sortWidth, globals.sortHeight, (globals.width-globals.sortWidth)/2,(globals.height-globals.sortHeight)/2, barHandler)
for (let i = 0; i < globals.numElements; i++) {
    const height = utils.generateRandInt(20,maxBarHeight)
    arr[i] = height;
    const barWidth = (globals.sortWidth-(globals.numElements+1)*barSpacing)/globals.numElements
    const bar = new Bar(barWidth, height, area.posX+barSpacing*(i+1)+barWidth*i, area.posY+(globals.sortHeight-height)-barSpacing)
    barArray[i]=bar;
}
const animation = selectionSort(arr)
barHandler.animation = animation




animate()


function animate(){
    ctx.clearRect(0,0,globals.width,globals.height)
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
