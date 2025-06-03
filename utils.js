
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