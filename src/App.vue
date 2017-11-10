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
            <router-link :to="{name:'cart'}" class="cart-btn"><span>我的购物车</span><i class="cart-icon"><span class="cart-num">1</span></i></router-link>
        </section>
        <section class="main-wrapper">
            <aside>
                <div class="header-wrapper">
                    <img :src="customerImg">
                    <h1>客服中心</h1>
                    <h1>CUSTOMER SERVICE</h1>
                </div>
                <h2>售前导购</h2>
                <p class="customer-server">小新</p>
                <h2>售后导购</h2>
                <p class="customer-server">小新</p>
                <hr/>
                <h2>工作时间</h2>
                <p>周一至周六:AM 08:30-PM 00:00</p>
            </aside>
            <router-view class="main-content"></router-view>
        </section>
    </div>
</template>
<script>
    import logo from './img/logo.png'
    import customerImg from './img/customer_service.png'

    export default {
        created() {

        },
        data() {
            return {
                logoSrc: logo,
                customerImg
            }
        }
    }
</script>
<style scoped>
    header {
        background-color: rgb(48, 48, 48);
    }
    header,.main-wrapper,nav,.cart-info{
        width: 940px;
        padding: 0 calc(50% - 470px);
    }
    nav{
        font-size: 13px;
        background-color: black;
        color: white;
    }
    .nav-item{
        height: 100%;
    }
    .nav-item a{
        display: inline-block;
        height: 100%;
        padding: .5em 1em;
        transition-duration: .2s;
    }
    .nav-item a:hover{
        background-color: gray;
    }
    .cart-info{
        font-size: 13px;
        padding-top: 1em;
        padding-bottom: 1em;
        text-align: right;
    }
    .cart-btn{
        color: rgb(218,16,38);
        padding: .8em 1.2em;
        display: inline-block;
        border: 1px solid gray;
    }
    .cart-btn .cart-icon{
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        background-image: url("./img/cart_icon.png");
        background-size: contain;
        position: relative;
    }
    .cart-icon .cart-num{
        text-align: center;
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%,-50%);
        width: 1em;
        height: 1em;
        background-color: rgb(218,16,38);
        color: white;
        border-radius: 50%;
    }
    .main-wrapper{
        display: flex;
    }
    aside,section.main-content{
        flex-basis: 0;
    }
    aside{
        flex-grow: 1;
    }
    .main-content{
        flex-grow: 4;
    }
</style>