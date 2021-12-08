import { ANGLE_FOR_LOSE, BEAM_WIDTH, G, MAX_ANGLE } from '../constants/game'
import { convertSizeToCentimetres, convertSizeToPixels } from './StylingAndGenerating'

export function calcForcesSumm(shapes, reversePosition){
    let forcesSum = 0

    shapes.forEach(item => {
        let centerPosition = 0
        if(reversePosition){
            centerPosition = ((convertSizeToPixels(BEAM_WIDTH) / 2) - item.position.left) - (item.width / 2)
        }else{
            centerPosition = item.position.left + (item.width / 2)
        }
        forcesSum += G * item.weight * (convertSizeToCentimetres(centerPosition) / 100)
    })
    return forcesSum
}

export function calcAngle(f1, f2){
    let fDiff = f2 - f1,
        fMax = Math.max(f1, f2),
        angle = (fDiff * MAX_ANGLE) / fMax

    angle > 0 && angle > ANGLE_FOR_LOSE ? angle = ANGLE_FOR_LOSE : angle
    angle < 0 && angle < (-1 * ANGLE_FOR_LOSE) ? angle = (-1 * ANGLE_FOR_LOSE) : angle
    
    return angle
}