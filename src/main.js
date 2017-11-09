import Vue from 'vue'
import router from './router'
import resources from './module/resources'

new Vue({
    el:'#app',
    template:'<router-view></router-view>',
    router,
})

console.log(resources)