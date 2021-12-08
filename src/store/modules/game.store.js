const state = {
    isGameRunning: false,
    angle: 0,
    currentForcesDiff: 0,
    gameTimer: null,
    restart: false,
    pause: false,
    autoPilot: false
}

const getters = {
    isGameRunning( state ) {
        return state.isGameRunning
    },

    angle( state ) {
        return state.angle
    },

    currentForcesDiff( state ) {
        return state.currentForcesDiff
    },

    gameTimer( state ) {
        return state.gameTimer
    },

    restart( state ) {
        return state.restart
    },

    pause( state ) {
        return state.pause
    },

    autoPilot( state ){
        return state.autoPilot
    }
}

const mutations = {
    SET_ANGLE(state, data) {
        state.angle = data
    },

    SET_GAME_STATUS(state, data) {
        state.isGameRunning = data
    },

    SET_CURRENT_FORCES_DIFF(state, data) {
        state.currentForcesDiff = data
    },

    SET_GAME_TIMER(state, data) {
        state.gameTimer = data
    },

    SET_PAUSE(state, data) {
        state.pause = data
    },

    SET_RESTART(state, data) {
        state.restart = data
    },

    SWITCH_AUTOPILOT(state) {
        state.autoPilot = !state.autoPilot
    },

    CLEAR_GAME(state){
        state.isGameRunning = false
        state.angle = 0,
        state.currentForcesDiff = 0,
        state.gameTimer = null,
        state.restart = false,
        state.pause = false
    }
}

const actions = {
    setAngle({ commit }, data) {
        commit('SET_ANGLE', data)
    },

    setGameStatus({ commit }, data) {
        commit('SET_GAME_STATUS', data)
    },

    setCurrentForcesDiff({ commit }, data) {
        commit('SET_CURRENT_FORCES_DIFF', data)
    },

    setGameTimer({ commit }, data) {
        commit('SET_GAME_TIMER', data)
    },

    setPause({ commit }, data){
        commit('SET_PAUSE', data)
    },

    setRestart({ commit }, data){
        commit('SET_RESTART', data)
    },

    clearGame({ commit }){
        commit('CLEAR_GAME')
    },

    switchAutoPilot({ commit }){
        commit('SWITCH_AUTOPILOT')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}