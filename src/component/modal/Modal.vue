<template>
    <div class="mask" @click="$emit('clickmodal')">
        <div class="container" @click.stop="">
            <div class="title-wrapper"><slot name="title"></slot></div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
            }
        },
        methods:{
        }
    }
</script>
<style scoped>
    .mask{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(50,50,50,.5);
        font-size: 1.3rem;
    }
    .container{
        padding: .5em 3em;
        /*min-height: 200px;*/
        /*min-width: 300px;*/
        background-color: white;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        display: inline-block;
    }
    .title-wrapper{
        text-align: center;
    }
</style>