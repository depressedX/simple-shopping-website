import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        item:{
            total:0,
            list:[]
        },
        cart:{
            total:0,
            list:[]
        }
    },
    mutations:{
        update
    }
})