import * as utils from "./utils.js";
import {InputManager} from "./input.js";
import { globals,minBarHeight,maxBarHeight } from "./script.js";
import selectionSort from "./selectionSort.js";
export const states = {
    IDLE: 0, 
    ITERATING: 1,
    SWAPPING:2,
    SHUFFLING:3
}

class State{
    constructor(state){
        this.state = state
    }
    
}
function performAnimation(state){
    const frame = state.barHandler.animation[state.barHandler.step]
    const prevFrame = state.barHandler.animation[state.barHandler.step-1]

    if(state.barHandler.step>0&&prevFrame.type=="compare"){
        state.barHandler.bars[prevFrame.c2].setColour(state.barHandler.bars[prevFrame.c2].baseColour)
    }
    switch(frame.type){
        case "compare":
            console.log("comparing index "+ frame.c1 + " and "+frame.c2)
            state.barHandler.bars[frame.c1].setColour("red")
            state.barHandler.bars[frame.c2].setColour("white")
            break

        case "minimum":
            console.log("Found minimum with index "+ frame.m)
            state.barHandler.bars[frame.m].setColour("red")
            state.barHandler.bars[frame.o].setColour(state.barHandler.bars[frame.o].baseColour)
            break

        case "swap":
            if(frame.s1==frame.s2){
                state.barHandler.bars[frame.s1].setColour(state.barHandler.bars[frame.s1].baseColour)
            }
            else{
                console.log("swapping index "+ frame.s1+ " and "+frame.s2)
                
                state.barHandler.currentState = state.barHandler.states[states.SWAPPING]
                state.barHandler.currentState.previousState=state;
                state.barHandler.currentState.enter(); 
                state.barHandler.step--;
            }
            break
    }
}

export class Idle extends State{
    constructor(barHandler, input){
        super("IDLE")
        this.barHandler = barHandler;
        this.inputManager = input
    }
    enter(){
        console.log("Idle")
    }
    update(){
        if(this.inputManager.lastInput=="next" && this.barHandler.step<this.barHandler.animation.length-1 ){
            console.log("next")
            this.inputManager.setLastInput("none")
            performAnimation(this)
            this.barHandler.step++
            
        }
        else if(this.inputManager.lastInput=="start" && this.barHandler.step<this.barHandler.animation.length-1){
            console.log("ehhlo")
            this.barHandler.currentState = this.barHandler.states[states.ITERATING]
            this.barHandler.currentState.enter()
        }
        else if(this.inputManager.lastInput=="shuffle"){

            this.barHandler.step=0;
            this.inputManager.lastInput="none"
            const arr = utils.generateRandomArray(globals.numElements, minBarHeight, maxBarHeight)                        
            this.barHandler.currentState = this.barHandler.states[states.SHUFFLING]

            this.barHandler.currentState.enter()
            this.barHandler.currentState.array = arr

        }
    }
}

export class Iterating extends State{
    constructor(barHandler, input){
        super("ITERATING")
        this.barHandler = barHandler;
        this.inputManager = input
    }
    enter(){
        console.log("Iterating")
    }

    
    update(){
        performAnimation(this)

        if(this.barHandler.step<this.barHandler.animation.length-1 && this.inputManager.lastInput!="pause"){
            this.barHandler.step++
        }
        else{
            this.barHandler.step++

            this.barHandler.currentState = this.barHandler.states[states.IDLE]
            this.inputManager.lastInput="none"
            this.barHandler.currentState.enter()
        }
        console.log(this.barHandler.step)

    }
    
}

export class Swapping extends State{
    constructor(barHandler){
        super("SWAPPING")
        this.barHandler = barHandler;
        this.desitnation1 = 0
        this.desitnation2 = 0;
        this.previousState = ""

    }
    enter(){
        console.log("Swapping")
        const frame = this.barHandler.animation[this.barHandler.step]
        this.desitnation1 = this.barHandler.bars[frame.s1].x
        this.desitnation2 = this.barHandler.bars[frame.s2].x
        //this.barHandler.bars[frame.s1].setColour("rgb(255,75,65)")
        this.barHandler.bars[frame.s2].setColour("rgb(70,170,50)")
    }

    update(){
        const frame = this.barHandler.animation[this.barHandler.step]
        const speed = 0.25
        const b1 = this.barHandler.bars[frame.s1]
        const b2 = this.barHandler.bars[frame.s2]
        if(Math.abs(this.desitnation2-b1.x)>0.1){
            b1.move(b1.x+(this.desitnation2-b1.x)*speed)
            b2.move(b2.x+(this.desitnation1-b2.x)*speed)
        }
        else{
            //this.barHandler.bars[frame.s1].setColour("white")

            if(this.barHandler.step<this.barHandler.animation.length){
                this.barHandler.step++
            }
            const tmp = this.barHandler.bars[frame.s1];
            this.barHandler.bars[frame.s1] = this.barHandler.bars[frame.s2];
            this.barHandler.bars[frame.s2] = tmp;

            this.barHandler.bars[frame.s1].setColour(this.barHandler.bars[frame.s1].baseColour)
            this.barHandler.bars[frame.s2].setColour(this.barHandler.bars[frame.s2].baseColour)

            this.barHandler.currentState = this.previousState
            this.barHandler.currentState.enter()
            

        }
        
    }
}
export class Shuffling extends State{
    constructor(barHandler, area){
        super("SHUFFLING")
        this.barHandler = barHandler;
        this.array = []
        this.sortArea = area

    }
    enter(){
        console.log("Shuffling")
    }

    update(){
        const speed = 0.1
        for (let i = 0; i < this.barHandler.bars.length && this.barHandler.currentState!=this.barHandler.states[states.IDLE]; i++) {
            const bar = this.barHandler.bars[i];
            const newLocation = globals.height-(globals.height-globals.sortHeight)/2-this.array[i]
            const newValue = ((globals.sortArea.borderValue+globals.sortArea.valueTolerance)-(globals.sortArea.borderValue-globals.sortArea.valueTolerance))*(this.array[i]-minBarHeight)/(maxBarHeight-minBarHeight)+(globals.sortArea.borderValue-globals.sortArea.valueTolerance)

            if(Math.abs(newLocation-bar.y)>0.001 || Math.abs(newValue-bar.hsvColour.v)>0.001 ){
                bar.resize(bar.y+(newLocation-bar.y)*speed)
                bar.recolour(bar.hsvColour.v+(newValue-bar.hsvColour.v)*speed)

            }

            else{
                console.log("here")
                this.barHandler.currentState = this.barHandler.states[states.IDLE]
                this.barHandler.animation = selectionSort(this.array)
                this.barHandler.bars.forEach(bar => {
                    bar.baseColour = bar.colour
                });
                this.barHandler.currentState.enter()
                
            }
            //console.log("hello")
        }
        
    }
}
