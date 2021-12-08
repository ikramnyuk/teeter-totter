import {
    SIZE_CONVERTING_COEFFICIENT,
    SHAPE_TYPES,
    BEAM_WIDTH,
    MIN_SHAPE_WIDTH,
    MAX_SHAPE_WIDTH,
    MIN_SHAPE_HEIGHT,
    MAX_SHAPE_HEIGHT,
    MIN_SHAPE_WEIGHT,
    MAX_SHAPE_WEIGHT,
    COLORS
} from '../constants/game'

export function generateRandomColor(){
    let randomIndex = generateRandomNumber(0, COLORS.length - 1)
    return COLORS[randomIndex] || COLORS[0]
}

export function generateRandomNumber(min, max) { 
    return Math.round(Math.random() * (max - min) + min);
}

export function convertSizeToPixels(cm){
    return cm / SIZE_CONVERTING_COEFFICIENT
}

export function convertSizeToCentimetres(px){
    return px * SIZE_CONVERTING_COEFFICIENT
}

export function generateRandomShape(){
    let randomWidth = generateRandomNumber(MIN_SHAPE_WIDTH, MAX_SHAPE_WIDTH),
        randomHeight = generateRandomNumber(MIN_SHAPE_HEIGHT, MAX_SHAPE_HEIGHT),
        randomTypeIndex = generateRandomNumber(0, SHAPE_TYPES.length - 1),
        randomColor = `${generateRandomColor()}`,
        leftBound = randomWidth / 2,
        rightBound = (convertSizeToPixels(BEAM_WIDTH) / 2) - randomWidth / 2,
        randomLeftPosition = generateRandomNumber(leftBound, rightBound),
        randomWeight = generateRandomNumber(MIN_SHAPE_WEIGHT, MAX_SHAPE_WEIGHT)

    let shape = {
        width: MIN_SHAPE_WIDTH + ((MAX_SHAPE_WIDTH - MIN_SHAPE_WIDTH) / MAX_SHAPE_WEIGHT) * randomWeight,
        height: randomHeight,
        color: randomColor,
        type: SHAPE_TYPES[randomTypeIndex] || SHAPE_TYPES[0],
        position: {
            left: randomLeftPosition,
            bottom: 0
        },
        weight: randomWeight
    }

    shape.height = shape.width
    return shape
}