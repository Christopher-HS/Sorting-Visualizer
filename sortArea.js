import Bar from "./bar.js"
import BarHandler from "./barHandler.js"
import { InputManager } from "./input.js"
import { globals,minBarHeight,maxBarHeight,barSpacing } from "./script.js"
import * as utils from "./utils.js"

export default class SortArea{
    constructor(width, height, x, y, input){
        this.borderHSV = {h:utils.generateRandInt(0,361), s:Math.random()+0.1, v:globals.sortArea.borderValue}
        this.arr = []
        const barArray = []
        for (let i = 0; i < globals.numElements; i++) {


            const height = utils.generateRandInt(minBarHeight,maxBarHeight)
            const diff = Math.abs(height-(maxBarHeight-minBarHeight))/(maxBarHeight-minBarHeight)-0.5
            this.arr[i] = height;
            const barWidth = (globals.sortWidth-(globals.numElements+1)*barSpacing)/globals.numElements
            const hsvObj = {h:this.borderHSV.h,s:this.borderHSV.s,v:this.borderHSV.v};
            hsvObj.v = ((globals.sortArea.borderValue+globals.sortArea.valueTolerance)-(globals.sortArea.borderValue-globals.sortArea.valueTolerance))*(height-minBarHeight)/(maxBarHeight-minBarHeight)+(globals.sortArea.borderValue-globals.sortArea.valueTolerance)
            const rgbObj = utils.HSVtoRGB(hsvObj)
            const bar = new Bar(barWidth, height, x+barSpacing*(i+1)+barWidth*i, y+(globals.sortHeight-height)-barSpacing,hsvObj )
            barArray[i]=bar;
            console.log(bar)
        }
        this.barHandler = new BarHandler(barArray, input, this)

        
        this.width = width
        this.height = height
        this.posX = x
        this.posY = y;
        this.borderWidth = 5
        
        
    }
    

    draw(context){
        const rgbObj = utils.HSVtoRGB(this.borderHSV)
        context.strokeStyle = `rgb(${rgbObj.R}, ${rgbObj.G}, ${rgbObj.B})`
        context.lineWidth = this.borderWidth;
        context.strokeRect(this.posX, this.posY, this.width, this.height)
    }

    update(context){
        this.draw(context)
        this.barHandler.update()
    }
}