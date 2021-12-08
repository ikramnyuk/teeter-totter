<template>
    <div class="spawn-container">
        <div class="spawn-area">
            <div class="spawn-cell left" id="spawnCell">
                <Shape :item="fallingShape"/>
            </div>
            <div class="spawn-cell right"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Shape from '../components/Shape'

export default {
    name: 'SpawnContainer',
    components: { Shape },

    computed: {
        ...mapGetters('Shapes', ['fallingShape'])
    }
}
</script>

<style lang="scss" scoped>
    .spawn-container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 70%;

        .spawn-area{
            width: 500px;
            display: flex;
            
            .spawn-cell{
                position: relative;
                width: 50%;
                height: 100px;
            }
        }
    }
</style>