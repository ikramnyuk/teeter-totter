const state = {
    fallingShape: null,
    fallenShapes: [],
    generatedShapes: [],
    fallenShapesWeight: 0,
    generatedShapesWeight: 0
}

const getters = {
    fallingShape( state ) {
        return state.fallingShape
    },

    fallenShapes( state ) {
        return state.fallenShapes
    },

    generatedShapes( state ) {
        return state.generatedShapes
    },

    fallenShapesWeight( state ) {
        return state.fallenShapesWeight
    },

    generatedShapesWeight( state ) {
        return state.generatedShapesWeight
    },
}

const mutations = {
    SET_FALLING_SHAPE(state, data) {
        state.fallingShape = data
    },

    UPDATE_FALLEN_SHAPES(state, data) {
        state.fallenShapes.push(data)
        if(data.weight){
            state.fallenShapesWeight += data.weight
        }
    },

    UPDATE_GENERATED_SHAPES(state, data) {
        state.generatedShapes.push(data)
        if(data.weight){
            state.generatedShapesWeight += data.weight
        }
    },

    CLEAR_FALLEN_SHAPES(state) {
        state.fallenShapes = []
    },

    CLEAR_GENERATED_SHAPES(state) {
        state.generatedShapes = []
    },

    SET_FALLING_SHAPE_BOTTOM(state, data) {
        state.fallingShape.position.bottom = data
    },

    SET_FALLING_SHAPE_LEFT(state, data) {
        state.fallingShape.position.left = data
    },

    CLEAR_SHAPES(state) {
        state.fallingShape = null,
        state.fallenShapes = [],
        state.generatedShapes = [],
        state.fallenShapesWeight = 0,
        state.generatedShapesWeight = 0
    }
}

const actions = {
    setFallingShape({ commit }, data) {
        commit('SET_FALLING_SHAPE', data)
    },

    updateFallenShapes({ commit }, data) {
        commit('UPDATE_FALLEN_SHAPES', data)
    },

    updateGeneratedShapes({ commit }, data) {
        commit('UPDATE_GENERATED_SHAPES', data)
    },

    clearFallenShapes({ commit }, data) {
        commit('CLEAR_FALLEN_SHAPES', data)
    },

    clearGeneratedShapes({ commit }, data) {
        commit('CLEAR_GENERATED_SHAPES', data)
    },

    clearShapes({ commit }){
        commit('CLEAR_SHAPES')
    },

    setFallingShapeBottom({ commit }, data){
        commit('SET_FALLING_SHAPE_BOTTOM', data)
    },

    setFallingShapeLeft({ commit }, data){
        commit('SET_FALLING_SHAPE_LEFT', data)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}