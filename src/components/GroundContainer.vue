<template>
    <div class="ground-container">
        <TeeterTotter />
    </div>
</template>

<script>
import TeeterTotter from '../components/TeeterTotter'

export default {
    name: 'GroundContainer',
    components: { TeeterTotter }
}
</script>

<style lang="scss" scoped>
    .ground-container{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 30%;
    }
</style>