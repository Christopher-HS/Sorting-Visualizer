export const states = {
    IDLE: 0, 
    ITERATING: 1,
    SWAPPING:2
}

class State{
    constructor(state){
        this.state = state
    }
    
}

export class Idle extends State{
    constructor(barHandler){
        super("IDLE")
        this.barHandler = barHandler;
    }
    enter(){
        console.log("Idle")
    }
    update(){
        if(this.barHandler.step<this.barHandler.animation.length){
            this.barHandler.currentState = this.barHandler.states[states.ITERATING]
            this.barHandler.currentState.enter()
        }
    }
}

export class Iterating extends State{
    constructor(barHandler){
        super("ITERATING")
        this.barHandler = barHandler;

    }
    enter(){
        console.log("Iterating")
    }

    
    update(){
        const frame = this.barHandler.animation[this.barHandler.step]
        const prevFrame = this.barHandler.animation[this.barHandler.step-1]

        if(this.barHandler.step>0&&prevFrame.type=="compare"){
            this.barHandler.bars[prevFrame.c2].setColour("white")
        }
        switch(frame.type){
            case "compare":
                console.log("comparing index "+ frame.c1 + " and "+frame.c2)
                this.barHandler.bars[frame.c2].setColour("grey")
                break

            case "minimum":
                console.log("Found minimum with index "+ frame.m)
                this.barHandler.bars[frame.m].setColour("red")
                this.barHandler.bars[frame.o].setColour("white")
                break

            case "swap":
                if(frame.s1==frame.s2){
                    this.barHandler.bars[frame.s1].setColour("green")
                }
                else{
                    console.log("swapping index "+ frame.s1+ " and "+frame.s2)
                    
                    this.barHandler.currentState = this.barHandler.states[states.SWAPPING]
                    this.barHandler.currentState.enter(); 
                    this.barHandler.step--;
                }
                break
        }

        if(this.barHandler.step<this.barHandler.animation.length-1){
            this.barHandler.step++
        }
        else{
            this.barHandler.currentState = this.barHandler.states[states.IDLE]
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

    }
    enter(){
        console.log("Swapping")
        const frame = this.barHandler.animation[this.barHandler.step]
        this.desitnation1 = this.barHandler.bars[frame.s1].x
        this.desitnation2 = this.barHandler.bars[frame.s2].x
        this.barHandler.bars[frame.s1].setColour("yellow")
        this.barHandler.bars[frame.s2].setColour("green")



    }

    update(){
        const frame = this.barHandler.animation[this.barHandler.step]
        const speed = 0.25
        const b1 = this.barHandler.bars[frame.s1]
        const b2 = this.barHandler.bars[frame.s2]
        if(Math.abs(this.desitnation2-b1.x)>0.5){
            b1.move(b1.x+(this.desitnation2-b1.x)*speed)
            b2.move(b2.x+(this.desitnation1-b2.x)*speed)
        }
        else{
            this.barHandler.bars[frame.s1].setColour("white")

            if(this.barHandler.step<this.barHandler.animation.length){
                this.barHandler.step++
            }
            const tmp = this.barHandler.bars[frame.s1];
            this.barHandler.bars[frame.s1] = this.barHandler.bars[frame.s2];
            this.barHandler.bars[frame.s2] = tmp;
            this.barHandler.currentState = this.barHandler.states[states.ITERATING]
            this.barHandler.currentState.enter()
            

        }
        
    }
}

