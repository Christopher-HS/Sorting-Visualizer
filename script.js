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
    numElements:25,
    sortArea:{
        borderValue: 0.4,
        valueTolerance: 0.3
    }
}

export const maxBarHeight = globals.sortHeight-10
export const minBarHeight = 20
const canvas  = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


export const barSpacing = 1/globals.numElements+4;
canvas.width = globals.width
canvas.height = globals.height
canvas.style.background="black"







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

const area = new SortArea(globals.sortWidth, globals.sortHeight, (globals.width-globals.sortWidth)/2,(globals.height-globals.sortHeight)/2, input)

const animation = selectionSort(area.arr)
area.barHandler.animation = animation
console.log(animation)


animate()


function animate(){
    ctx.clearRect(0,0,globals.width,globals.height)
    area.update(ctx)
    area.barHandler.bars.forEach(bar=>{
        bar.update(ctx)
    })
    
    requestAnimationFrame(animate)
}


//  Todo:
//  Add feature to randomize array
//  Allow an input array with file
//  
