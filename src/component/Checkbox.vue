<template>
    <i :class="['checkbox',value?'selected':'']" @click="toggleValue" ref="checkbox"></i>
</template>
<script>
    export default {
        props:{
            value:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                selfValue:false
            }
        },
        methods:{
            toggleValue(){
                this.selfValue = !this.selfValue
                this.$emit('input',!this.value)
            }
        }
    }
</script>
<style scoped>
    .checkbox {
        display: inline-block;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        background-color: white;
        border: 1px solid #6b6b6b;
    }
    .checkbox.selected{
        background-color: #ed1c24;
        border-color: #ed1c24;
        background-image: url("../img/selected.png");
        background-size: 70% ;
        background-repeat: no-repeat;
        background-position: center center;
    }
</style>