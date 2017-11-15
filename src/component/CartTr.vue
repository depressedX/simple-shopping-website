<template>
    <tr style="text-align: center">
        <td><checkbox ref="checkbox" :value="cartInfo.itemId" @change="changeHandler(arguments[0])" v-model="checked"></checkbox></td>
        <td style="text-align: left">
            <img :src="cartInfo.imgSrc||defaultImg" class="cart-img"/>
            <span>{{cartInfo.name}}</span>
        </td>
        <td>
            <span>{{cartInfo.price}}</span>
        </td>
        <td><counter></counter></td>
        <td><a href="javascript:void (0)" class="delete-cart">删除</a></td>
    </tr>
</template>
<script>
    import Checkbox from './Checkbox.vue'
    import Counter from './Counter.vue'
    import defaultImg from '../img/default_food.jpg'
    export default {
        model:{
            prop:'selectedItem',
            event:'change'
        },
        components:{
            Checkbox,
            Counter
        },
        data(){
            return {
                defaultImg,
                checked:false
            }

        },
        props:{
            cartInfo:{
                type:Object,
                required:true
            },
            selectedItem:{
                default:[]
            }
        },
        watch:{
            selectedItem(value){
                this.checked = value.includes(this.cartInfo.itemId)
            }
        },
        methods:{
            changeHandler(checked){
                let newSelectedItem = this.selectedItem
                if (!checked){
//                需要把该项从列表中删除
                    newSelectedItem.splice(newSelectedItem.indexOf(this.$refs.checkbox.value),1)
                }else {
//                    通过冒泡事件添加到selectedItem中
                    newSelectedItem.push(this.$refs.checkbox.value)
                }
                this.$emit('change',newSelectedItem)
            }
        }
    }
</script>
<style scoped>
    td{
        padding: .5em 0;
        height: 100%;

    }
    tr{
        height: 100px;
    }
    .cart-img{
        height: 80px;
        width: 80px;
        object-fit: contain;
        vertical-align: middle;
        margin-right: 1.5em;
    }
    .delete-cart{
        color: #ff0404;
    }

</style>