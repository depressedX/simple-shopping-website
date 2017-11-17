<template>
    <button @click="_handleClickEvent"><slot></slot></button>
</template>
<script>
    export default {
        data(){
            return {
                clickable: true
            }
        },
        props:{
        },
        methods:{
            _handleClickEvent(){
                if (this.clickable){
                    this.$emit('click')
                }
            },
            preventClickEvent(){
                this.clickable = false
            },
            allowClickEvent(){
                this.clickable = true
            }
        }
    }
</script>
<style scoped>
    button:hover{
        cursor: pointer;
    }
</style>