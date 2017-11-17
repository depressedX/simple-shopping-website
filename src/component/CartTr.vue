<template>
    <tr style="text-align: center">
        <td>
            <checkbox ref="checkbox"
                      :value="cartInfo.cartId"
                      @change="changeHandler(arguments[0])"
                      v-model="checked"/>
        </td>
        <td style="text-align: left">
            <img :src="cartInfo.imgSrc||defaultImg" class="cart-img"/>
            <span>{{cartInfo.name}}</span>
        </td>
        <td>
            <span>{{cartInfo.price}}</span>
        </td>
        <td><a href="javascript:void (0)" class="delete-cart" @click="$emit('deleteCart')">删除</a></td>
    </tr>
</template>
<script>
    import Checkbox from './Checkbox.vue'
    import Counter from './Counter.vue'
    import defaultImg from '../img/default_food.jpg'

    export default {
        model: {
            prop: 'selectedCartId',
            event: 'change'
        },
        components: {
            Checkbox,
            Counter
        },
        data() {
            return {
                defaultImg,
                checked: false
            }

        },
        props: {
            cartInfo: {
                type: Object,
                required: true
            },
            selectedCartId: {
                default: []
            }
        },
        watch: {
            selectedCartId(value) {
                this.checked = value.includes(this.cartInfo.cartId)
            }
        },
        methods: {
            changeHandler(checked) {
                let newSelectedCartId = this.selectedCartId
                if (!checked) {
//                需要把该项从列表中删除
                    newSelectedCartId.splice(newSelectedCartId.indexOf(this.$refs.checkbox.value), 1)
                } else {
//                    通过冒泡事件添加到selectedItem中
                    newSelectedCartId.push(this.$refs.checkbox.value)
                }
                this.$emit('change', newSelectedCartId)
            },
            deleteCart(){

            }
        }
    }
</script>
<style scoped>
    td {
        padding: .5em 0;
        height: 100%;

    }

    tr {
        height: 100px;
    }

    .cart-img {
        height: 80px;
        width: 80px;
        object-fit: contain;
        vertical-align: middle;
        margin-right: 1.5em;
    }

    .delete-cart {
        color: #ff0404;
    }

</style>