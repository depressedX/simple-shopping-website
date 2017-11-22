<template>
    <div>
        <h1>管理商品</h1>
        <a href="javascript:void (0)" @click="downloadData">下载数据</a>
        <router-link :to="{name:'detailItemAdmin',params:{itemId:'-1'}}" class="create-item-btn" >添加物品</router-link>
        <item
                :name="item.name"
                :price="item.price"
                :imgSrc="item.imgSrc"
                :itemId="item.itemId"

                v-for="item in itemList"
                :key="item.itemId"
                class="item"/>
    </div>
</template>
<script>
    import {state, default as store} from '../../store'
    import Item from '../../component/admin/Item.vue'
    import resources from '../../store/resources'

    export default {
        components: {
            Item
        },
        computed: {
            itemList: () => state.item.list
        },
        created() {
            store.dispatch('checkoutItem')
        },
        methods:{
            downloadData(){
                resources.downloadData()
            }
        }
    }
</script>
<style>
    .item {
        transition-duration: .2s;
        display: block;
    }

    .item:hover {
        background-color: #eee;
        cursor: pointer;
    }
    .create-item-btn{
        display: inline-block;
        padding: .5em 1em;
        border: 1px solid hsl(200,50%,50%);
        border-radius: 5px;
    }
    .create-item-btn:hover{
        background-color: #eee;
    }
</style>