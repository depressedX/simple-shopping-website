<template>
    <div>
        <pagination
                :total="total"
                :curPage="curPage"
                :numPerPage="numPerPage"
                @next="nextPage"
                @forward="forwardPage"
                class="pagination">
        </pagination>
        <flex-container :items="itemList" :numPerRow="3">
            <good-display
                    slot="item"
                    slot-scope="props"
                    :imgSrc="props.data.imgSrc"
                    :name="props.data.name"
                    :price="props.data.price"
                    :goodId="props.data.itemId"
            ></good-display>
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
            console.log('goods created')
//            store请求更新itemList
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
                store.dispatch('checkoutItem',this.curPage+1)
//                resources.getItemList(++this.curPage,this.numPerPage).then(response=>{
//                    this.goodList = response.goods
//                    this.total = response.total
//                })
            },
            forwardPage(){
                store.dispatch('checkoutItem',this.curPage-1)
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