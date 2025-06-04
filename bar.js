import { HSVtoRGB } from "./utils.js"
import { globals, minBarHeight, maxBarHeight } from "./script.js"
export default class Bar{
    constructor(width, height, x, y, colour){
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.hsvColour = colour
        const rgbObj = HSVtoRGB(colour)
        this.baseColour = `rgb(${rgbObj.R}, ${rgbObj.G}, ${rgbObj.B})`
        this.colour = `rgb(${rgbObj.R}, ${rgbObj.G}, ${rgbObj.B})`
    }

    setColour(colour){
        this.colour = colour
    }
    updateBaseColour(hsvObj){
        const hsv = hsvObj
        const rgbObj = HSVtoRGB(hsv)
        this.hsvColour = hsvObj
        this.baseColour = `rgb(${rgbObj.R}, ${rgbObj.G}, ${rgbObj.B})`
    }
    draw(context){
        context.fillStyle = this.colour;
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    move(posX){
        this.x = posX
    }

    recolour(value){
        this.hsvColour.v=value
        const rgbObj = HSVtoRGB(this.hsvColour)
        this.setColour(`rgb(${rgbObj.R}, ${rgbObj.G}, ${rgbObj.B})`)
    }
    resize(posY){
        this.height+=this.y-posY
        this.y = posY
        
    }
    update(context){
        this.draw(context)
    }
}