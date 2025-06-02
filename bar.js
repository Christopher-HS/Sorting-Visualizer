export default class Bar{
    constructor(width, height, x, y){
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.colour = "white"
    }

    setColour(colour){
        this.colour = colour
    }
    draw(context){
        context.fillStyle = this.colour;
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    move(posX){
        this.x = posX
        //const speed = 0.1
        //if(Math.abs(posX-this.x)>0.5){
        //    this.x+=(posX-this.x)*speed
        //}
    }
    update(context){
        this.draw(context)
    }
}