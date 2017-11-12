<template>
    <div class="root">
        <span class="page-num-wrapper"><span class="cur-page">{{curPage}}</span>/<span class="total-page">{{totalPage}}</span></span>
        <s-button
                :clickable="!reachLeftBound"
                :class="['page-btn','left',reachLeftBound?'disabled':'']"
                @click="$emit('forward')"
        >&lt;</s-button>
        <s-button
                :clickable="!reachRightBound "
                :class="['page-btn','right',reachRightBound?'disabled':'']"
                @click="$emit('next')"
        >&gt;</s-button>
    </div>
</template>
<script>
    import SButton from './SButton.vue'

    export default {
        components: {
            SButton
        },
        props: {
            curPage: {
                default: 1,
                type: Number
            },
            total: {
                default: 0,
                type: Number
            },
            numPerPage: {
                default: 6,
                type: Number
            }
        },
        computed: {
            totalPage() {
                return Math.max(Math.ceil(this.total / this.numPerPage),1)
            },
            reachLeftBound(){
                return this.curPage===1
            },
            reachRightBound(){
                return this.curPage === this.totalPage
            }
        },
        methods:{
        }
    }
</script>
<style scoped>
    .root {
        box-sizing: border-box;
        width: 100%;
        background-color: rgb(248, 248, 248);
        text-align: right;
        padding: 1em 1em;
        color:black;
    }
    .page-btn{
        text-align: center;
        width: 2em;
        display: inline-block;
        color:rgb(225,225,225);
        background-color: white;
        border: 1px solid rgb(225,225,225);
        font-size: 2em;
    }
    .total-page{
        margin-right: 1em;
    }
    .cur-page{
        color: #da1026;
    }
    .page-num-wrapper{
        letter-spacing: 2px;

    }
    .page-btn{
        vertical-align: middle;
        transition-duration: .2s;
    }
    .page-btn:hover{
        background-color: #555;
    }
    .page-btn.disabled{
        background-color: #777;
    }
    .page-btn.disabled:hover{
        cursor: default;
    }
</style>