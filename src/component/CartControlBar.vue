<template>
  <div class="cart-control-bar">
    <div class="select-all-wrapper">
      <checkbox ref="selectAllCheckbox" :checkState="selectAll" value="all"
                @change="cartsOperaiton(arguments[0])"></checkbox>
      <a href="javascript:void (0)" @click="cartsOperaiton(!selectAll)">全选</a>
    </div>
    <a href="javascript:void (0)" @click="$emit('delete')" class="delete-selection">删除所选</a>
    <span>共选商品<span style="color:#ed1c24">{{selectedCartNum}}</span>件</span>
    <span style="padding: 0 1em">总计￥<span style="color: #ed1c24">{{totalPrice}}</span></span>
    <span style="padding: 0 1em">优惠￥<span style="color: #ed1c24">{{preference}}</span></span>
    <span style="padding: 0 1em">实付￥<span style="color: #ed1c24">{{finalPrice | round2}}</span></span>
    <a href="javascript:void (0)" class="purchase-btn" @click="$emit('submit')">结算</a>
  </div>
</template>
<script>
    import Checkbox from './Checkbox.vue'

    export default {
        model: {
            prop: 'value',
            event: 'change'
        },
        components: {
            Checkbox
        },
        data() {
            return {
                selectAll: false
            }
        },
        props: {
            selectedCartNum: {
                type: Number,
                default: 0
            },
            totalPrice: {
                type: Number,
                default: 0

            },
            value: {
                type: Boolean,
                default: false
            },
            preference: {
                type: Number,
                default: 0
            }
        },
        computed: {
            finalPrice() {
                return Math.max(this.totalPrice - this.preference, 0)
            }
        },
        watch: {
            value(value) {
                this.selectAll = value
            }
        },
        methods: {
            cartsOperaiton(flag) {
                if (flag === this.selectAll) return
                this.selectAll = flag
                this.$emit('change', flag)

            }
        },
        filters: {
            round2(value) {
                return Math.round(value * 100) / 100
            }
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