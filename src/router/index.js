import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import {state,commit} from "../store/index";

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    // mode:'history'
})
router.beforeEach((to,from,next)=>{
    // 检查是否有权限
    if (to.matched.some(record=>record.meta.requireAuth)){
        let isLogin = state.isLogin
        if (isLogin){
            next()
        }else {
            commit('createNoticeModal','无权限!请先登录')
        }
    }else {
        next()
    }
})

export default router