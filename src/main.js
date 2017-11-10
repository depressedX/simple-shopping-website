import Vue from 'vue'
import router from './router'
import './mock/mockServer'

new Vue({
    el:'#app',
    template:'<router-view></router-view>',
    router,
})