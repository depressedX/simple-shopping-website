<template>
    <tr style="text-align: center">
        <td><checkbox @input="$emit('input',value)" v-model="value"></checkbox></td>
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
        components:{
            Checkbox,
            Counter
        },
        data(){
            return {
                defaultImg,
                selected:false
            }

        },
        props:{
            cartInfo:{
                type:Object,
                required:true
            },
            value:Boolean
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