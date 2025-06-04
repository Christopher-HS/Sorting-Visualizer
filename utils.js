export function generateRandomArray(length, min, max){
    let arr = []
    for (let i = 0; i < length; i++) {
        const height = generateRandInt(min,max)
        arr[i] = height;
    }
    return arr
}

export function generateRandInt(min, max){
    const diff = max-min;
    const num = Math.floor(Math.random()*diff)
    return num+min;
}


export function HSVtoRGB(HSVobj){
    const c = HSVobj.v * HSVobj.s
    const x = c*(1-Math.abs(((HSVobj.h/60)%2) - 1))
    const m = HSVobj.v-c
    let r,g,b;

    if(HSVobj.h>=0 && HSVobj.h<60){
        r = (c+m)*255
        g = (x+m)*255
        b = (0+m)*255
    }
    else if(HSVobj.h>=60 && HSVobj.h<120){
        r = (x+m)*255
        g = (c+m)*255
        b = (0+m)*255
    }
    else if(HSVobj.h>=120 && HSVobj.h<180){
        r = (0+m)*255
        g = (c+m)*255
        b = (x+m)*255
    }
    else if(HSVobj.h>=180 && HSVobj.h<240){
        r = (0+m)*255
        g = (x+m)*255
        b = (c+m)*255
    }
    else if(HSVobj.h>=240 && HSVobj.h<300){
        r = (x+m)*255
        g = (0+m)*255
        b = (c+m)*255
    }
    else if(HSVobj.h>=300 && HSVobj.h<360){
        r = (c+m)*255
        g = (0+m)*255
        b = (x+m)*255
    }
    return {
        R:Math.round(r),
        G:Math.round(g),
        B:Math.round(b)
    }

}



//console.log(HSVtoRGB({h:20,s:0.3,v:0.1}))