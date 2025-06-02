

export default function selectionSort(array){
    let animations = []
    for (let k = 0; k < array.length; k++) {
        let lowestNumIndex = k 
        for (let i = k+1; i < array.length; i++) {
            animations.push({
                type:"compare",
                c1: lowestNumIndex,
                c2: i
            })
            if(array[i]<array[lowestNumIndex]){
                animations.push({
                    type:"minimum",
                    o:lowestNumIndex,
                    m:i
                })
                lowestNumIndex = i;
            }
        }    
        animations.push({
            type:"swap",
            s1: k,
            s2:lowestNumIndex
        })
        const tmp = array[k];
        array[k] = array[lowestNumIndex];
        array[lowestNumIndex] = tmp;
    }
    return animations
}


//let arr = [9,-2,4,6,3,0,1,8,5]
//console.log(arr)
//console.log(selectionSort(arr))
//console.log(arr)