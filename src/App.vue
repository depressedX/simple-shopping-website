<template>
    <div class="app">
        <header>
            <img :src="logoSrc">
        </header>
        <nav>
            <ul class="nav-bar">
                <li class="nav-item">
                    <router-link :to="{name:'goods'}">首页</router-link>
                </li>
            </ul>
        </nav>
        <section class="cart-info">
            <s-button class="cart-btn">
                <router-link :to="{name:'cart'}">
                    <span>我的购物车</span><i class="cart-icon"><span class="cart-num">{{totalCarts}}</span></i>
                </router-link>
            </s-button>
        </section>
        <section class="main-wrapper">
            <aside>
                <div class="header-wrapper">
                    <img :src="customerImg">
                    <h1 class="cn">客服中心</h1>
                    <h1 class="en">CUSTOMER SERVICE</h1>
                </div>
                <hr/>
                <h2>售前导购</h2>
                <p class="customer-server">小新</p>
                <hr/>
                <h2>售后导购</h2>
                <p class="customer-server">小新</p>
                <hr/>
                <h2>工作时间</h2>
                <p>周一至周六:AM 08:30-PM 00:00</p>
            </aside>
            <router-view @click="hello" class="main-content"></router-view>
        </section>
    </div>
</template>
<script>
    import logo from './img/logo.png'
    import customerImg from './img/customer_service.png'
    import SButton from './component/SButton.vue'
    import resources from './module/resources'

    export default {
        created() {
            resources.getCartNum().then(num=>{
                this.totalCarts = num
            })
            this.$nextTick(()=>{
            })
        },
        data() {
            return {
                logoSrc: logo,
                customerImg,
                totalCarts:0
            }
        },
        components:{
            SButton
        },
        methods:{
            hello(){
                console.log('hello')
            }
        }
    }
</script>
<style scoped>
    header {
        background-color: rgb(48, 48, 48);
    }

    header, .main-wrapper, nav, .cart-info {
        width: 940px;
        /*padding: 0 calc(50% - 470px);*/
        padding: 0 300px;
    }

    nav {
        font-size: 1.2em;
        background-color: black;
        color: white;
    }

    .nav-item {
        height: 100%;
    }

    .nav-item a {
        display: inline-block;
        height: 100%;
        padding: .5em 1em;
        transition-duration: .2s;
    }

    .nav-item a:hover {
        background-color: gray;
    }

    .cart-info {
        font-size: 1.2em;
        padding-top: 1em;
        padding-bottom: 1em;
        text-align: right;
    }

    .cart-btn {
        color: rgb(218, 16, 38);
        padding: .8em 1.2em;
        display: inline-block;
        border: 1px solid gray;
        transition-duration: .2s;
        background-color: #f9f9f9;
    }
    .cart-btn:hover{
        background-color: #eee;
    }

    .cart-btn .cart-icon {
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        background-image: url("./img/cart_icon.png");
        background-size: contain;
        position: relative;
    }

    .cart-icon .cart-num {
        text-align: center;
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%, -50%);
        width: 1em;
        height: 1em;
        background-color: rgb(218, 16, 38);
        color: white;
        border-radius: 50%;
        font-family: 'Courier New', Courier, monospace;
        font-style: normal;
    }

    .main-wrapper {
        display: flex;
    }

    aside, .main-content {
        flex-basis: 0;
    }

    aside {
        flex-grow: 1;
    }

    .main-content {
        flex-grow: 4;
    }

    aside{
        padding-right: 4em;
    }
    aside .header-wrapper {
        margin-bottom: 1em;
    }

    aside .header-wrapper img {
        float: left;
    }

    aside .header-wrapper h1.en {
        font-size: .8em;
        margin-top: 0;
    }

    aside .header-wrapper h1.cn {
        margin-bottom: 0;
    }

    .customer-server {
        display: inline-block;
        padding: 1em 2em;
        position: relative;
        line-height: 1;
    }

    .customer-server:after {
        content: '';
        position: absolute;
        top: -.8em;
        left: calc(100% - 2em);
        width: 2em;
        height: 2em;
        background-image: url("./img/customer_service.png");
        background-size: contain;
    }
</style>