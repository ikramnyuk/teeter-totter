<template>
	<v-app>
		<ActionsBar />

		<v-main>
			<MainGame />
		</v-main>
	</v-app>
</template>

<script>
import MainGame from './views/MainGame'
import ActionsBar from './components/ActionsBar'

export default {
	name: 'App',
	components: {
		MainGame,
		ActionsBar,
	},
}
</script>
