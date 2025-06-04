import { Idle, Iterating, Shuffling, Swapping } from "./state.js";
export default class BarHandler{
    constructor(bars, inputManager, sortArea){
        this.bars = bars //array
        this.states = [new Idle(this, inputManager), new Iterating(this, inputManager), new Swapping(this), new Shuffling(this, sortArea)];
        this.currentState = this.states[0]
        this.animation = []
        this.step = 0;
    }


    update(){
        this.currentState.update()
    }

}