<template>
    <div>
        <div class="score">
            <div>
                <p>Fallen Shapes Weight: {{ fallenShapesWeight }}</p>
            </div>

            <div>
                <p>Total Angle: {{ Math.round(angle) }}deg</p>
                <p v-if="win" class="result win">You won</p>
                <p v-if="lose" class="result lose">You lose</p>
            </div>

            <div>
                <p>Generated Shapes Weight: {{ generatedShapesWeight }}</p>
            </div>
        </div>
        <div class="main-container">
            <SpawnContainer />
            <GroundContainer />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import SpawnContainer from '../components/SpawnContainer'
import GroundContainer from '../components/GroundContainer'

import { generateRandomShape, convertSizeToPixels } from '../services/StylingAndGenerating'
import { calcForcesSumm, calcAngle } from '../services/Mechanics'
import {
    BEAM_WIDTH,
    ANGLE_FOR_LOSE,
    MAX_WEIGHT,
    FALLING_ANIMATION_BASE_SPEED,
    LEFT_ANIMATION_OFFSET
} from '../constants/game'

export default {
    name: 'MainGame',
    components: { SpawnContainer, GroundContainer },
    data: () => ({
        drawer: false,
        win: false,
        lose: false
    }),

    computed: {
        ...mapGetters('Shapes', [
            'fallingShape',
            'fallenShapes',
            'generatedShapes',
            'fallenShapesWeight',
            'generatedShapesWeight',
        ]),
        ...mapGetters('Game', [
            'angle',
            'gameTimer',
            'isGameRunning',
            'pause',
            'restart',
            'autoPilot',
        ])
    },

    watch: {
        fallenShapesWeight(val){
            if(val && val >= MAX_WEIGHT){
                this.stopGame(true, true)
            }
        },

        angle(val){
            if(val && Math.abs(val) >= ANGLE_FOR_LOSE){
                this.stopGame(true, false)
            }
        },

        pause(val){
            if(val){
                if(this.gameTimer){
                    this.setGameStatus(false)
                    clearTimeout(this.gameTimer)
                }
            }else{
                this.setGameStatus(true)
                this.startFallingAnimation()
            }
        },

        restart(val){
            if(val){
                this.stopGame(false, false)
                this.clearShapes()
                this.clearGame()
                this.setGameStatus(true)
                this.generateShape()
                this.win = false
                this.lose = false
            }
        }
    },

    mounted(){
        this.addControlsListener()
    },

    methods: {
        ...mapActions('Shapes', ['setFallingShape', 'updateFallenShapes', 'updateGeneratedShapes',
            'clearShapes', 'setFallingShapeBottom', 'setFallingShapeLeft']),
        ...mapActions('Game', ['setGameStatus', 'setAngle', 'setCurrentForcesDiff',
            'setGameTimer', 'setRestart', 'setPause', 'clearGame']),
        
        generateShape(){
            if(this.isGameRunning){
                try {
                    let shape = generateRandomShape()
                    
                    this.updateGeneratedShapes(shape)
                    this.startShapeFalling()
                } catch(e){
                    console.error(e)
                }
            }
        },

        startShapeFalling(){
            if(this.isGameRunning){
                try {
                    let shape = generateRandomShape()
                    
                    this.setFallingShape(shape)
                    setTimeout(() => {
                        this.startFallingAnimation()
                        if(this.autoPilot){
                            this.startAutoPilot()
                        }
                    }, 0)
                } catch(e){
                    console.error(e)
                }
            }
        },
        
        startFallingAnimation(){
            let self = this,
                spawnContainer = document.getElementById('spawnCell').children[0]
            
            let timer = setTimeout(function animate() {
                if(!self.isGameRunning){
                    clearTimeout(timer)
                    return
                }

                if(spawnContainer.getBoundingClientRect().top >= self.checkFallingLimit(spawnContainer)){
                    clearTimeout(timer)
                    self.setFalledShape()
                    return
                }

                let speedCoeficient = 0.2 * self.fallenShapes.length
                speedCoeficient > 1 ? speedCoeficient = 1 : speedCoeficient
                self.setFallingShapeBottom(self.fallingShape.position.bottom - (1 + speedCoeficient))
                
                timer = setTimeout(animate, FALLING_ANIMATION_BASE_SPEED);
                self.setGameTimer(timer)
            }, 100);

            this.setGameTimer(timer)
        },
        
        checkFallingLimit(shape){
            let beam = document.querySelector('#beam').getBoundingClientRect();
            let shapeSizes = shape.getBoundingClientRect();

            const beamBendingHeight  = (beam.bottom - beam.top) - beam.height;
            const opossiteSideHeight = (shapeSizes.left * beamBendingHeight) / BEAM_WIDTH;

            return this.angle >= 0
                ? beam.top + opossiteSideHeight - shapeSizes.height
                : beam.bottom - opossiteSideHeight - shapeSizes.height;
        },

        setFalledShape(){
            if(this.isGameRunning){
                this.fallingShape.position.bottom = 0
                this.updateFallenShapes(this.fallingShape)
                this.setFallingShape(null)
                this.calculateAngle()
                this.generateShape()
            }
        },

        calculateAngle(){
            let forcesSummLeft = 0,
                forcesSummRight = 0

            forcesSummLeft = calcForcesSumm(this.fallenShapes, true)
            forcesSummRight = calcForcesSumm(this.generatedShapes, false)

            this.setCurrentForcesDiff(Math.max(forcesSummLeft, forcesSummRight))
            let angle = calcAngle(forcesSummLeft, forcesSummRight)
            this.setAngle(angle)
        },

        addControlsListener(){
            document.addEventListener('keydown', this.moveFallingShapeHorizontal)
        },

        moveFallingShapeHorizontal({ keyCode }){
            if(this.fallingShape){
                if(keyCode === 37){
                    if(this.fallingShape.position.left >= LEFT_ANIMATION_OFFSET){
                        this.setFallingShapeLeft(this.fallingShape.position.left - LEFT_ANIMATION_OFFSET)
                    }
                }

                if(keyCode === 39){
                    if(this.fallingShape.position.left < ((convertSizeToPixels(BEAM_WIDTH) / 2) - LEFT_ANIMATION_OFFSET - this.fallingShape.width)){
                        this.setFallingShapeLeft(this.fallingShape.position.left + LEFT_ANIMATION_OFFSET)
                    }
                }
            }
        },

        startAutoPilot(){
            if(this.generatedShapes && this.generatedShapes.length && this.fallingShape){
                let lastGeneratedShape = this.generatedShapes[this.generatedShapes.length - 1],
                    fallingShapeLeft = lastGeneratedShape.position.left * lastGeneratedShape.weight / this.fallingShape.weight,
                    revertedLeft = ((convertSizeToPixels(BEAM_WIDTH) / 2) - fallingShapeLeft) - (this.fallingShape.width / 2)
                if(revertedLeft < 0) revertedLeft = 0
                if(revertedLeft >= (convertSizeToPixels(BEAM_WIDTH) / 2) - this.fallingShape.width) {
                    revertedLeft = (convertSizeToPixels(BEAM_WIDTH) / 2) - this.fallingShape.width
                }
                this.setFallingShapeLeft(revertedLeft)
            }
        },

        stopGame(callWin, isWin){
            this.setGameStatus(false)
            this.setFallingShape(null)
            
            if(this.gameTimer){
                clearTimeout(this.gameTimer)
            }

            if(callWin){
                if(isWin){
                    this.win = true
                }else{
                    this.lose = true
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .main-container{
        height: calc(100vh - 200px);
    }

    .score{
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        padding: 10px 10px 0;

        .result{
            font-size: 20px;
            font-weight: 500;

            &.win{
                color: green;
            }

            &.lose{
                color: red;
            }
        }
    }
</style>