import { Idle, Iterating, Swapping } from "./state.js";
export default class BarHandler{
    constructor(bars){
        this.bars = bars //array
        this.states = [new Idle(this), new Iterating(this), new Swapping(this)];
        this.currentState = this.states[0]
        this.animation = []
        this.step = 0;
    }


    update(){
        this.currentState.update()
    }

}