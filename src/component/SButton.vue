<template>
    <a href="javascript:void (0)" @click="_handleClickEvent"><slot></slot></a>
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
            }
        }
    }
</script>