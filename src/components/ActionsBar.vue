<template>
    <v-app-bar app fixed justify-between class="px-5">
        <v-toolbar-title class="game-logo">
            <span class="font-weight-bold text-h5">
                <span class="text-cyan">Teeter</span><span class="text-light-green">Totter</span>
            </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
            <v-btn class="mx-2" fab dark medium color="cyan">
                <v-icon color="white" @click="resumePauseGame">{{ isGameRunning ? 'mdi-pause' : 'mdi-play'}}</v-icon>
            </v-btn>

            <v-btn class="mx-2" fab dark medium color="cyan">
                <v-icon color="white" @click="setRestart">mdi-restart</v-icon>
            </v-btn>
        </div>
        <v-spacer></v-spacer>
            
        <div class="switch-container">
            <v-switch hide-details v-model="autopilotValue" @input="shangeAutoPilot()" :label="autoPilot ? 'Autopilot: on' : 'Autopilot: off'"></v-switch>
        </div>
    </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ActionsBar',
    data: () => ({
        autopilotValue: false
    }),
    computed: {
        ...mapGetters('Game', ['isGameRunning', 'pause', 'autoPilot']),
        ...mapGetters('Shapes', ['generatedShapes'])
    },

    watch: {
        autoPilot(val, oldVal){
            if(val !== oldVal){
                this.autopilotValue = val
            }
        }
    },

    methods: {
        ...mapActions('Game', ['setRestart', 'setPause', 'switchAutoPilot']),

        resumePauseGame(){
            if(this.isGameRunning){
                this.setPause(true)
            }else if(this.generatedShapes.length && !this.pause){
                this.setRestart(true)
            }else if(this.pause){
                this.setPause(false)
            }else{
                this.setRestart(true)
            }
        },

        shangeAutoPilot(){
            this.switchAutoPilot()
        }
	}
}
</script>

<style lang="scss">
    .switch-container{
        width: 150px;
    }
</style>