<template>
    <div class="teeter-totter">
        <div class="beam" :style="beamAngle" id="beam">
            <div class="beam-cells left">
                <Shape v-for="(item, key) in fallenShapes" :key="key" :item="item" />
            </div>
            <div class="beam-cells right">
                <Shape v-for="(item, key) in generatedShapes" :key="key" :item="item" />
            </div>
        </div>
        <div class="basement"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertSizeToPixels } from '../services/StylingAndGenerating';
import { BEAM_WIDTH, MAX_FORCE, MAX_ANIMAtiON_SPEED, DEFAULT_BEAM_ANIMATION_SPEED } from '../constants/game';

import Shape from '../components/Shape'

export default {
    name: 'TeeterTotter',
    components: { Shape },

    computed: {
        ...mapGetters('Game', ['angle', 'currentForcesDiff']),
        ...mapGetters('Shapes', ['fallenShapes', 'generatedShapes']),
        beamAngle(){
            let bendingSpeed = MAX_ANIMAtiON_SPEED * this.currentForcesDiff / MAX_FORCE || DEFAULT_BEAM_ANIMATION_SPEED
            
            return {
                transform : `rotate(${ this.angle }deg)`,
                transition: `${ bendingSpeed }s`,
                width: `${ convertSizeToPixels(BEAM_WIDTH) }px`
            };
        }
    }
}
</script>

<style lang="scss" scoped>
    .teeter-totter{
        display: flex;
        flex-direction: column;
        align-items: center;

        .beam{
            position: relative;
            width: 100%;
            height: 4px;
            background-color: #8bc34a;
            transform: rotate(0deg);
            transition: .5s;

            .beam-cells{
                position: absolute;
                bottom: 4px;
                width: 50%;
                height: auto;

                &.right{
                    left: 50%;
                }
            }
        }

        .basement{
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 50px 150px 50px;
            border-color: transparent transparent #00bcd4 transparent;
        }
    }
</style>