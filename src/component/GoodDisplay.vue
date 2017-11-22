<template>
    <div class="good-display">
        <img :src="imgSrc||defaultImgSrc" class="good-img"/>
        <div class="good-name">{{name}}</div>
        <div class="row-wrapper">
            <div class="good-price">￥{{price}}</div>
            <s-button ref="add-btn" @click="addToCart(itemId,1)" :class="['add-to-cart',added?'disabled':'']">加入购物车
            </s-button>
        </div>
    </div>
</template>
<script>
    import defaultImgSrc from '../img/default_food.jpg'
    import SButton from './SButton.vue'
    import store from '../store'
    import statusCode from '../store/statusCode'

    export default {
        components: {
            SButton
        },
        created(){
        },
        data(){
            return{
                defaultImgSrc
            }
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
            itemId: {
                type: Number,
                require: true
            },
            added: {
                type: Boolean,
                require: true
            }
        },
        methods: {
            addToCart(itemId, num) {
                this.$refs['add-btn'].preventClickEvent()
                store.dispatch('addToCart', {itemId, num})
                    .then(
                        () => {
                            this.$refs['add-btn'].allowClickEvent()
                            store.commit('createNoticeModal', '添加成功')
                            store.dispatch('checkoutItem')
                        },
                        e => {
                            this.$refs['add-btn'].allowClickEvent()
                            if (e.status == statusCode.CART_FULLFILLED) {
//                                购物车已满
                            }
                            store.commit('createNoticeModal', e.message)
                        }
                    )
            }
        }
    }
</script>
<style scoped="">
    .good-display {
        width: 170px;
        margin-bottom: 2em;
    }


    .good-img {
        width: 170px;
        height: 170px;
        object-fit: cover;
        padding: 5px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        overflow: hidden;

    }

    .good-name {
        padding: 1em 0;
    }

    .good-price {
        font-size: 1.2em;
        color: #ed1c24;
    }

    .add-to-cart {
        font-size: 1.6em;
        color: white;
        background-color: #ed1c24;
    }

    .row-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 2em;
    }

    .add-to-cart.disabled {
        pointer-events: none;
        background-color: gray;

    }

</style>