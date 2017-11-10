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
        <flex-container :items="goodList" :numPerRow="3">
            <good-display
                    slot="item"
                    slot-scope="props"
                    :imgSrc="props.data.imgSrc"
                    :name="props.data.name"
                    :price="props.data.price"
                    :goodId="props.data.goodId"
            ></good-display>
        </flex-container>
    </div>
</template>
<script>
    import Pagination from '../../component/Pagination.vue'
    import resources from '../../module/resources'
    import GoodDisplay from '../../component/GoodDisplay.vue'
    import FlexContainer from '../../component/FlexContainer.vue'


    export default {
        components:{
            Pagination,
            GoodDisplay,
            FlexContainer
        },
        created(){
            console.log('goods created')
            resources.getGoodList(this.curPage,this.numPerPage).then(response=>{
                this.goodList = response.goods
                this.total = response.total
            })
        },
        data(){
            return{
                total:0,
                goodList:[],
                curPage:1,
                numPerPage:8
            }
        },
        methods:{
            nextPage(){
                resources.getGoodList(++this.curPage,this.numPerPage).then(response=>{
                    this.goodList = response.goods
                    this.total = response.total
                })
            },
            forwardPage(){
                resources.getGoodList(--this.curPage,this.numPerPage).then(response=>{
                    this.goodList = response.goods
                    this.total = response.total
                })
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