<template>
    <div class="app">
        <header>Shopping</header>
        <nav>
            <router-link :to="{name:'goods'}">首页</router-link>
        </nav>
        <router-link :to="{name:'cart'}">购物车</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        created(){

        }
    }
</script>