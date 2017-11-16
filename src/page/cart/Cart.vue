<template>
    <div>
        <table class="cart-table">
            <thead class="cart-table__head">
            <tr>
                <td>
                    <checkbox
                            value="all"
                            :checkState="selectAll"
                            ref="select-all"
                            @change="cartsOperation(arguments[0])">
                    </checkbox>
                    <a href="javascript:void (0)"
                       @click="cartsOperation(!selectAll)">全选</a>
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
                @change="cartsOperation(arguments[0])"></cart-control-bar>
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
                selectedItem: []
            }
        },
        computed: {
            cartList: () => state.cart.list
        },
        methods: {
            test(...args) {
                console.log(args)
            },
            cartsOperation(flag) {
                if (flag === this.selectAll) return
                this.selectAll = flag
                if (flag) {
//                    全选
                    this.cartList.forEach(value => {
                        if (!this.selectedItem.includes(value.itemId)) {
                            this.selectedItem.push(value.itemId)
                        }
                    })
                } else {

                    this.selectedItem.splice(0, this.selectedItem.length)
                }
            }
        },
        watch: {}

    }

    function assign(...source) {
        let res = {}
        source.map(source => {
            Object.assign(res, source)
        })
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