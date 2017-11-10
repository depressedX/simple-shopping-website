<template>
    <div class="good-display">
        <img :src="imgSrc" class="good-img"/>
        <div class="good-name">{{name}}</div>
        <div class="row-wrapper">
            <div class="good-price">￥{{price}}</div>
            <s-button @click="addToCart(goodId)" class="add-to-cart">加入购物车</s-button>
        </div>
        <div class="good-rates">已有30人评价</div>
    </div>
</template>
<script>
    import defaultImgSrc from '../img/default_food.jpg'
    import SButton from './SButton.vue'
    import bus from '../module/bus'

    export default {
        components: {
            SButton
        },
        props: {
            imgSrc: {
                type: String,
                default: defaultImgSrc
            },
            name: {
                type: String,
                default: '商家未填写'
            },
            price: {
                type: Number,
                default: 0.00
            },
            goodId:{
                type:Number,
                require:true
            }
        },
        methods:{
            addToCart(cartId){
                bus.$emit('addtocart',cartId)
            }
        }
    }
</script>
<style scoped="">
    .good-display {
        width: 200px;
        margin-bottom: 2em;
    }

    .good-img {
        width: 200px;
        height: 200px;
        object-fit: cover;
    }
    .good-name{
        padding: 1em 0;
    }
    .good-price{
        font-size: 1.2em;
        color: #ed1c24;
    }
    .add-to-cart{
        font-size: 1.6em;
        background-color: #ed1c24;
    }
    .row-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 2em;
    }
    .good-rates{
        color: gray;
    }

</style>