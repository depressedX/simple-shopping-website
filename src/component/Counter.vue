<template>
    <div>
        <a href="javascript:void (0)" @click="finalValue>1?offset--:0">-</a>
        <div type="number" width="2" class="finalValue">{{finalValue}}</div>
        <a href="javascript:void (0)" @click="offset++">+</a>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                offset:0
            }
        },
        props:{
            initialValue: {
                type: Number,
                default: 1
            }
        },
        computed: {
            finalValue(){
                return this.offset + this.initialValue
            }
        },
        watch:{
            finalValue(){
                this.$emit('change',this.finalValue)
            }
        }
    }
</script>
<style scoped>
    a{
        font-size: 1.5em;
        padding: .5em;
    }
    .finalValue{
        display: inline-block;
        width: 3em;
        border: 1px solid gray;
    }
</style>