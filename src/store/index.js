import Vuex from 'vuex';
import Game from './modules/game.store'
import Shapes from './modules/shapes.store'

export default new Vuex.Store({
	modules: {
		Game,
		Shapes
	}
})