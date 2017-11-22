<template>
    <div>
        <pagination
                :total="total"
                :curPage="curPage"
                :numPerPage="numPerPage"
                @next="nextPage"
                @forward="forwardPage"
                class="pagination"/>
        <flex-container :items="itemList" :numPerRow="5">
            <good-display
                    slot="item"
                    slot-scope="props"
                    :imgSrc="props.data.imgSrc"
                    :name="props.data.name"
                    :price="props.data.price"
                    :itemId="props.data.itemId"
                    :added="props.data.added"/>
        </flex-container>
    </div>
</template>
<script>
    import Pagination from '../../component/Pagination.vue'
    import GoodDisplay from '../../component/GoodDisplay.vue'
    import FlexContainer from '../../component/FlexContainer.vue'
    import store from '../../store'


    export default {
        components:{
            Pagination,
            GoodDisplay,
            FlexContainer
        },
        created(){
            console.log('item created')
            store.dispatch('checkoutItem')
        },
        data(){
            return{
            }
        },
        computed:{
            curPage:()=>store.state.item.curPage,
            total:()=>store.state.item.total,
            numPerPage:()=>store.state.item.numPerPage,
            itemList:()=>store.state.item.list,
        },
        methods:{
            nextPage(){
                store.dispatch('nextItemPage')
            },
            forwardPage(){
                store.dispatch('forwardItemPage')
            },
            hello(){
                console.log('hello')
            }
        }
    }
</script>
<style scoped="">
    .pagination{
        width: 100%;
    }
</style>