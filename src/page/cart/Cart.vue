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
        <td>操作</td>
      </tr>
      </thead>
      <tbody class="cart-table__body">
      <cart-tr
              v-for="cart in cartList"
              :cartInfo="cart"
              :key="cart.cartId"
              v-model="selectedCartId"
              @deleteCart="updateCartsToBeDeleted([cart.cartId])"
              class="cart-table__row"/>
      </tbody>
    </table>
    <cart-control-bar
            :value="selectAll"
            :selectedCartNum="selectedCartNum"
            :totalPrice="totalPrice"
            :preference="preference"
            @change="cartsOperation(arguments[0])"
            @submit="fillDetailOrderInfo"
            @delete="updateCartsToBeDeleted(selectedCartId)"/>
    <order-edit-modal
            @cancel="showOrderEditModal=false"
            @submit="createOrder(arguments[0])"
            v-if="showOrderEditModal"/>
    <v-dialog
            message="是否真的删除?"
            @confirm="deleteCart"
            @cancel="showDeleteCartModal=false"
            v-if="showDeleteCartModal"/>
  </div>
</template>
<script>
    import Checkbox from '../../component/Checkbox.vue'
    import CartTr from '../../component/CartTr.vue'
    import {state, commit, dispatch} from '../../store'
    import CartControlBar from '../../component/CartControlBar.vue'
    import resources from '../../store/resources'
    import OrderEditModal from '../../component/modal/OrderEditModal.vue'
    import VDialog from '../../component/modal/Dialog.vue'

    export default {
        created() {
            console.log('cart created');
            dispatch('checkoutCart')
            dispatch('checkoutPreference')
        },
        components: {
            Checkbox,
            CartTr,
            CartControlBar,
            OrderEditModal,
            VDialog
        },
        data() {
            return {
                selectAll: false,
                selectedCartId: [],
                showOrderEditModal: false,
                showDeleteCartModal: false,
                cartsToBeDeleted: []
            }
        },
        computed: {
            cartList: () => state.cart.list,
            preference:()=>Math.round(state.preference*100)/100,
            selectedCart() {
                return this.cartList.filter(cart => this.selectedCartId.includes(cart.cartId))
            },
            selectedCartNum() {
                return this.selectedCartId.length
            },
            totalPrice() {
                return Math.round(this.selectedCart.reduce((pre, cur) => pre + cur.price * cur.num, 0) * 100) / 100
            }
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
                        if (!this.selectedCartId.includes(value.cartId)) {
                            this.selectedCartId.push(value.cartId)
                        }
                    })
                } else {

                    this.selectedCartId.splice(0, this.selectedCartId.length)
                }
            },
            fillDetailOrderInfo() {
                if (this.selectedCartId.length <= 0) {
                    commit('createNoticeModal', '请至少添加一件物品')
                    return
                } else {
                    this.showOrderEditModal = true
                }
            },
            createOrder(bundle) {
//                从modal中传出的信息
                let address = bundle.address

                resources.createOrder({address, selectedCartId: this.selectedCartId})
                    .then(
                        () => {
                            this.showOrderEditModal = false
                            commit('createNoticeModal', '订单提交成功,感谢您的支持！')
                            this.selectedCartId = []
                            dispatch('checkoutCart')
                        },
                        (error) => {
                            this.showOrderEditModal = false
                            commit('createNoticeModal', error.message)
                        }
                    )
            },
            updateCartsToBeDeleted(newList) {
                let list = this.cartsToBeDeleted
                list.splice(0, list.length)
                list.push.apply(list, newList)

                this.confirmDelete()
            },
            confirmDelete() {
                this.showDeleteCartModal = true
            },
            deleteCart() {
                this.showDeleteCartModal = false
                resources.deleteCarts(this.cartsToBeDeleted)
                    .then(
                        () => {
                            commit('createNoticeModal', '删除成功')
                            this.selectedCartId = []
                            dispatch('checkoutCart')
                        },
                        (error) => {
                            commit('createNoticeModal', `删除失败 ${error}`)
                        }
                    )
            }
        },
        watch: {
            selectedCartNum(value) {
                if (value === this.cartList.length) {
                    this.selectAll = true
                }
                else {
                    this.selectAll = false
                }

            }
        }

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