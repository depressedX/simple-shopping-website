<template>
    <div class="content-wrapper">
        <h1>管理商品</h1>
        <span>下载数据 : </span><a href="javascript:void (0)" @click="downloadData" style="text-decoration: underline">点此下载文件</a><br/>
        <span>修改标题 : </span><input v-model="documentTitle"/>
        <s-button @click="updateDocumentTitle">保存</s-button>
        <br/>
        <span>修改购物车上限 : </span><input v-model="maxCartNum"/>
        <s-button @click="updateMaxCartNum">提交</s-button>
        <br/>
        <span>修改上限提示 : </span><input v-model="message401"/>
        <s-button @click="updateMessage401">提交</s-button>
        <br/>
        <span>增删物品 : </span>
        <router-link :to="{name:'detailItemAdmin',params:{itemId:'-1'}}" class="create-item-btn">添加物品</router-link>
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
    import SButton from '../../component/SButton.vue'
    import {commit} from "../../store/index";

    export default {
        components: {
            Item,
            SButton
        },
        data() {
            return {
                documentTitle: '',
                maxCartNum: 1,
                message401: ''
            }
        },
        computed: {
            itemList: () => state.item.list
        },
        created() {
            store.dispatch('checkoutItem')
        },
        methods: {
            downloadData() {
                resources.downloadData()
            },
            updateDocumentTitle() {
                let documentTitle = this.documentTitle
                resources.updateDocumentTitle(documentTitle).then(
                    () => {
                        commit('createNoticeModal', '修改成功')
                        store.dispatch('checkoutDocumentTitle')
                    },
                    (error) => {
                        commit('createNoticeModal', error.message)
                    }
                )
            },
            updateMaxCartNum() {
                resources.updateMaxCartNum(this.maxCartNum).then(
                    ()=>{
                        commit('createNoticeModal', '修改成功')
                    },
                    (error) => {
                        commit('createNoticeModal', error.message)
                    }
                )
            },
            updateMessage401(){
                resources.updateMessage401(this.message401).then(
                    ()=>{
                        commit('createNoticeModal', '修改成功')
                    },
                    (error) => {
                        commit('createNoticeModal', error.message)
                    }
                )
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

    .create-item-btn {
        display: inline-block;
        padding: .5em 1em;
        border: 1px solid hsl(200, 50%, 50%);
        border-radius: 5px;
    }

    .create-item-btn:hover {
        background-color: #eee;
    }

    .content-wrapper {
        font-size: 1.5rem;
        line-height: 2;
    }
</style>