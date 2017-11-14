<template>
    <button @click="_handleClickEvent"><slot></slot></button>
</template>
<script>
    export default {
        props:{
            clickable:{
                default:true,
                type:Boolean
            }
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