export default class SortArea{
    constructor(width, height, x, y, barHandler){
        this.barHandler = barHandler
        this.width = width
        this.height = height
        this.posX = x
        this.posY = y;
        this.borderColour = "white"
        this.borderWidth = 5
    }

    draw(context){
        context.strokeStyle = this.borderColour
        context.lineWidth = this.borderWidth;
        context.strokeRect(this.posX, this.posY, this.width, this.height)
    }

    update(context){
        this.draw(context)
        this.barHandler.update()
    }
}