import Vue from 'vue'
import router from './router'
// import './mock/mockServer'
import './style/global.css'
import './style/normalize.css'

new Vue({
    el:'#app',
    template:'<router-view></router-view>',
    router,
})