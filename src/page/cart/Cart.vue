<template>
    <div>
        <table class="cart-table">
            <thead class="cart-table__head">
            <tr>
                <td>
                    <checkbox v-model="selectAll" value="all" ref="select-all"></checkbox>
                    <a href="javascript:void (0)" @click="selectAll=!selectAll">全选</a>
                </td>
                <td>商品名称</td>
                <td>单价(元)</td>
                <td>数量</td>
                <td>操作</td>
            </tr>
            </thead>
            <tbody class="cart-table__body">
            <cart-tr
                    v-for="cart in cartList"
                    :cartInfo="cart"
                    :key="cart.cartId"
                    v-model="selectedItem"
                    class="cart-table__row">
            </cart-tr>
            </tbody>
        </table>
        <cart-control-bar
                v-model="selectAll"></cart-control-bar>
    </div>
</template>
<script>
    import Checkbox from '../../component/Checkbox.vue'
    import CartTr from '../../component/CartTr.vue'
    import {state} from '../../store'
    import CartControlBar from '../../component/CartControlBar.vue'

    export default {
        created() {
            console.log('cart created');
        },
        components: {
            Checkbox,
            CartTr,
            CartControlBar
        },
        data() {
            return {
                selectAll: false,
                selectedItem:[]
            }
        },
        computed: {
//            cartList: () => state.cart.list.map(obj => assign(obj, {selected: false}))
            cartList: () => state.cart.list
        },
        methods:{
            test(...args){
                console.log(args)
            }
        },
        watch: {
            selectAll(value){
                if (value){
                    this.cartList.forEach(value=>{
                        if (!this.selectedItem.includes(value.itemId)){
                            this.selectedItem.push(value.itemId)
                        }
                    })
                }else {
                    this.selectedItem.splice(0,this.selectedItem.length)
                }
            }
        }

    }

    function assign(...source) {
        let res = {}
        source.map(source=>{Object.assign(res,source)})
//        Object.assign(res,target)
//        Object.assign.apply(null, arguments)
        return res
    }
</script>
<style scoped>
    .cart-table {
        width: 100%;
        box-sizing: border-box;
    }

    .cart-table__head {
        font-size: 1.63rem;
        border-bottom: 1px solid #ed1c24;
        line-height: 2;
        text-align: center;
    }

    .cart-table__body {
        font-size: 1.18rem;
    }

    table {
        border-collapse: collapse;
    }

    .cart-table__row {
        border-color: white;
        border-width: 1em 0;
        border-style: solid;
    }

    .cart-table__row:nth-child(odd) {
        background-color: #e5e5e5;
    }

    .cart-table__row:nth-child(even) {
        background-color: #fab9b7;
    }
</style>