<template>
    <div>
        <h1>管理商品</h1>
        <router-link :to="{name:'detailItemAdmin',params:{itemId:'-1'}}" class="create-item-btn" >添加物品</router-link>
        <item
                :name="item.name"
                :price="item.price"
                :imgSrc="item.imgSrc"
                :itemId="item.itemId"

                v-for="item in itemList"
                :key="item.itemId"
                class="item"></item>
    </div>
</template>
<script>
    import {state, default as store} from '../../store'
    import Item from '../../component/admin/Item.vue'

    export default {
        components: {
            Item
        },
        computed: {
            itemList: () => state.item.list
        },
        created() {
//            store.dispatch('')
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
</style>