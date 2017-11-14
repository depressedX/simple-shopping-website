<template>
    <div>
        <table class="cart-table">
            <thead class="cart-table__head">
            <tr>
                <td>
                    <checkbox v-model="selectAll" ref="select-all"></checkbox>
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
                    v-model="cart.selected"
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
                selectAll: false
            }
        },
        computed: {
            cartList: () => state.cart.list.map(obj => assign(obj, {selected: false}))
        },
        watch: {
            selectAll(flag) {
                this.cartList.map(cart => {
                    cart.selected = flag
                })
            },
            cartList(value){
                /*******************************
                 *
                 */
                let result1 = value.reduce((pre,cur)=>pre && cur,true)
                let result2 = value.reduce((pre,cur)=>pre && !cur,false)
                if (result1){
                    this.selectAll = true
                }
                if (result2){

                }
            }
        }

    }

    function assign() {
        let res = {}
        Object.assign.apply(null, arguments)
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