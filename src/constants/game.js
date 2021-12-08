export const SIZE_CONVERTING_COEFFICIENT = 2 // 1px = 2cm

export const SHAPE_TYPES = ['triangle', 'circle', 'rectangle']

export const MAX_OBJECTS_NUMBER = 100
export const MIN_SHAPE_WEIGHT = 1 // kg
export const MAX_SHAPE_WEIGHT = 10 // kg
export const BEAM_WIDTH = 1000 // cm
export const ANGLE_FOR_LOSE = 30 // deg
export const MAX_ANGLE = 60 // deg
export const MAX_WEIGHT = 20 // kg
export const FALLING_ANIMATION_BASE_SPEED = 10 // ms
export const DEFAULT_BEAM_ANIMATION_SPEED = 0.5 // sec
export const COLORS = [
    '#F44336', '#B71C1C', '#3F51B5', '#2196F3',
    '#2E7D32', '#FF6F00', '#546E7A', '#E64A19',
    '#00C853', '#E91E63', '#1A237E', '#00695C', 
];
export const MIN_SHAPE_WIDTH = 40 // px
export const MAX_SHAPE_WIDTH = 80 // px
export const MIN_SHAPE_HEIGHT = 40 // px
export const MAX_SHAPE_HEIGHT = 80 // px
export const LEFT_ANIMATION_OFFSET = 5 // px
export const G = 9.81
export const MAX_ANIMAtiON_SPEED = 0.8 // sec
export const MAX_FORCE = G * MAX_SHAPE_WEIGHT * (BEAM_WIDTH / 100 / 2)