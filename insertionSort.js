

export default function insertionSort(array){
    let animations = []
    for (let k = 1; k < array.length; k++) {
        let i = k
        while(i>0 && array[i]<array[i-1]){
            animations.push({
                type:"swap",
                s1: i-1,
                s2:i
            })
            swap(array, i, i-1)
            i--;
        }
    }
    return animations
}


function swap(array, i1, i2){
    const tmp = array[i1]
    array[i1] = array[i2]
    array[i2] = tmp;
}

let arr = [9,-2,4,6,3,0,1,8,5]
console.log(arr)
console.log(insertionSort(arr))
console.log(arr)