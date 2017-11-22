<template>
    <router-link :to="{name:'detailItemAdmin',params:{itemId}}">
        <img :src="imgSrc||defaultImg"/>
        <span>{{name}}</span>
        <span>{{price}}</span>
    </router-link>
</template>
<script>
    import defaultImg from '../../img/default_food.jpg'

    export default {
        data() {
            return{
                defaultImg
            }
        },
        props: {
            itemId: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            imgSrc: {
                type: String,
                default: defaultImg
            },
            price: {
                type: Number,
                required: true
            },
        }
    }
</script>
<style scoped="">
    img {
        width: 100px;
        height: 100px;
        object-fit: contain;
        vertical-align: middle;
        overflow: hidden;
    }
</style>