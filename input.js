export const inputs = {
    START:"start",
    PAUSE:"pause",
    NEXT:"next",
    SHUFFLE:"shuffle",
    NONE:"none"
}

export class InputManager{
    constructor(){
        this.lastInput = ""

        
    }
    setLastInput(input){
        this.lastInput = input
    }
    
} 