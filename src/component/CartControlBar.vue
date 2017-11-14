<template>
    <div class="cart-control-bar">
        <div class="select-all-wrapper">
            <checkbox v-model="selectAll" @input="$emit('changeselectstyle',selectAll)"></checkbox>
            <a href="javascript:void (0)" @click="$emit('changeselectstyle')">全选</a>
        </div>
        <a href="javascript:void (0)" @click="" class="delete-selection">删除所选</a>
        <span>共选商品<span style="color:#ed1c24">{{cartNum}}</span>件</span>
        <span style="padding: 0 1em">合计￥<span style="color: #ed1c24">{{totalPrice}}</span></span>
        <a href="javascript:void (0)" class="purchase-btn" @click="">结算</a>
    </div>
</template>
<script>
    import Checkbox from './Checkbox.vue'

    export default {
//        model: {
//            prop: 'value',
//            event: 'changeselectstyle'
//        },
        components: {
            Checkbox
        },
        data() {
            return {
                selectAll:false
            }
        },
        props: {
            cartNum: {
                type: Number,
                default: 0
            },
            totalPrice: {
                type: Number,
                default: 0
            },
            value:{
                type:Boolean,
                default:false
            }
        },
        watch: {
        }
    }
</script>
<style scoped>
    .cart-control-bar {
        display: flex;
        overflow: hidden;
        align-items: baseline;
        font-size: 1.636rem;
        box-sizing: border-box;
        width: 100%;
        border: 1px solid gray;
        background-image: linear-gradient(to bottom, #fff, #ededed);
        padding: .5em 2em;
    }

    .select-all-wrapper {
        padding: 0 1em;
    }

    .purchase-btn {
        background-color: #ed1c24;
        color: white;
        border-radius: 5px;
        padding: .5em 1em;
        display: inline-block;
        margin-left: 2em;
    }

    .cart-control-bar > * {
        flex-shrink: 0;
    }

    .delete-selection {
        flex-grow: 1;
    }
</style> 