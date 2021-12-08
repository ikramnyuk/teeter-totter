<template>
    <div v-if="item" :style="item.type === 'triangle' ? triangleStyles : shapeStyles" class="shape" :class="{'triangle': item.type === 'triangle'}">
        <span>{{ item.weight }}kg</span>
    </div>
</template>

<script>

export default {
    name: 'Shape',
    props: ['item'],

    computed: {
        shapeStyles(){
            let commonShape = {
                width: `${ this.item.width }px`,
                height: `${ this.item.height }px`,
                left: `${ this.item.position.left || 0 }px`,
                bottom: `${ this.item.position.bottom || 0 }px`,
                backgroundColor: this.item.color,
                borderRadius: '5px'
            }

            if(this.item.type === 'circle'){
                commonShape.borderRadius = '50%'
            }

            return commonShape;
        },

        triangleStyles(){
            return {
                width: 0,
                height: 0,
                position: 'absolute',
                left: `${ this.item.position.left || 0 }px`,
                bottom: `${ this.item.position.bottom || 0 }px`,
                borderLeft: `${ this.item.width / 2 }px solid transparent`,
                borderRight: `${ this.item.width / 2 }px solid transparent`,
                borderBottom: `${ this.item.height }px solid ${ this.item.color }`,
            }
        }
    }
}
</script>

<style lang="scss">
    .shape{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;

        span{
            font-weight: 400;
            font-size: 13px;
            color: #fff;
        }

        &.triangle{
            span{
                position: relative;
                bottom: -30px;
            }
        }
    }
</style>