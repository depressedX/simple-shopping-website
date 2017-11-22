<template>
    <div class="app" @clickmodal="test">
        <header>
            <img :src="logoSrc">
        </header>
        <nav>
            <ul class="nav-bar">
                <li class="nav-item">
                    <router-link :to="{name:'item'}">首页</router-link>
                    <router-link :to="{name:'itemAdmin'}">管理</router-link>
                    <a
                            href="javascript:void (0)"
                            @click="showLoginModal=!showLoginModal"
                            v-if="!isLogin">登录</a>
                    <a
                            href="javascript:void (0)"
                            @click="logout"
                            v-else>注销</a>
                </li>
            </ul>
        </nav>
        <section class="cart-info" v-if="$route.name!=='itemAdmin'&&$route.name!=='detailItemAdmin'">
            <router-link :to="{name:'cart'}">
            <s-button class="cart-btn">
                    <span>我的购物车</span><i class="cart-icon"><span class="cart-num">{{cartNum}}</span></i>
            </s-button>
            </router-link>
        </section>
        <section class="main-wrapper">
            <router-view class="main-content"></router-view>
        </section>
        <login v-if="showLoginModal" @requestclose="showLoginModal=false"></login>
        <notice-modal v-if="showNoticeModal" :message="noticeModalMessage"></notice-modal>
    </div>
</template>
<script>
    import logo from './img/logo.png'
    import customerImg from './img/customer_service.png'
    import SButton from './component/SButton.vue'
    import {state, default as store} from './store'
    import Login from './component/LoginWithModal.vue'
    import NoticeModal from './component/modal/NoticeModal.vue'

    export default {
        created() {
//            向store请求更新 购物车数量 商品列表
            store.dispatch('checkoutCart')
        },
        data() {
            return {
                logoSrc: logo,
                customerImg,
                showLoginModal: false,

//                通知modal
                read: true
            }
        },
        computed: {
            cartNum: () => store.state.cart.total,
            showNoticeModal: () => state.globalNoticeModal.show,
            noticeModalMessage: () => state.globalNoticeModal.message,
            isLogin: () => state.isLogin
        },
        watch: {},
        components: {
            SButton,
            Login,
            NoticeModal
        },
        methods: {
            test() {
                console.log('test')
                console.log('click')
            },
            logout() {
                store.dispatch('logout')
                    .then(() => {
                        this.$router.push({name: 'item'})
                    })
            }
        }
    }
</script>
<style scoped>
    header {
        background-color: rgb(48, 48, 48);
    }

    @media screen {
        header, .main-wrapper, nav, .cart-info {
            width: 940px;
            padding: 0 20px;
        }
    }

    @media screen and (min-width: 980px) {
        header, .main-wrapper, nav, .cart-info {
            width: 940px;
            padding: 0 calc(50% - 470px);
        }
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

    .cart-btn:hover {
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
    }

    .main-content {
        width: 100%;
    }

</style>