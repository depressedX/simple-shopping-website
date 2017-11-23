import Vue from 'vue'
import Vuex from 'vuex'
import resources from './resources'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogin: false,
        username: '',

        // 文档标题
        documentTitle:'',

        // 存放某页的商品
        item: {
            total: 0,
            list: [],
            curPage: 1,
            numPerPage: 30,
        },
        // 存放购物车的商品
        cart: {
            total: 0,
            list: []
        },


        globalNoticeModal: {
            message: '',
            show: false
        }
    },
    mutations: {
        // 修改物品
        modifyItem(state, payload) {
            storeObject(payload, state.item)
        },
        // 创建新的物品
        createItem(state, payload) {
            if (payload.imgSrc){
                payload.imgSrc = 'http://120.24.70.191:8080/SimpleShoppingWebsite'+payload.imgSrc

            }
            state.item.list.push(payload)
        },
        // 修改购物车信息
        modifyCart(state, payload) {
            state.cart.list = payload.list || state.cart.list
            state.cart.total = state.cart.list.length
        },
        // 修改购物车物品数量
        modifyItemNum(state, num) {
            state.item.total = num
        },
        // 创建Notice模态框
        createNoticeModal(state, message) {
            state.globalNoticeModal.message = message
            state.globalNoticeModal.show = true
        },
        // 释放Notice模态框
        disposeNoticeModal(state) {
            state.globalNoticeModal.show = false
        }
    },
    actions: {
        // 服务器购物车商品
        checkoutCart({commit}) {
            resources.getCartList()
                .then(response => {
                    commit('modifyCart', {
                        list: response.map(item=>{
                            if (item.imgSrc) item.imgSrc = 'http://120.24.70.191:8080/SimpleShoppingWebsite'+item.imgSrc
                            return item
                        }
                        )
                    })
                })
        },
        // 服务器获取分页的商品
        checkoutItem({commit, state}, payload = {}) {
            let curPage = payload.curPage || state.item.curPage,
                numPerPage = payload.numPerPage || state.item.numPerPage,
                total = state.item.total
            if (curPage <= 0 || curPage > Math.max(1, Math.ceil(total / numPerPage))) {
                // 越界
                return
            }
            resources.getItemList(curPage, numPerPage)
                .then(response => {
                    commit('modifyItem', {
                        curPage,
                        numPerPage,
                        // list: response
                        list:response.map(item=>{
                            if (item.imgSrc) item.imgSrc = 'http://120.24.70.191:8080/SimpleShoppingWebsite'+item.imgSrc
                            return item
                        })
                    }),
                        error => {
                            console.log(error)
                        }
                })
        },
        // 更新物品数量
        checkoutItemNum({commit}) {
            resources.getItemNum()
                .then(
                    response => {
                        commit('modifyItemNum', response)
                    }
                )
        },
        // 添加购物车
        addToCart({dispatch}, payload = {}) {
            if (!payload.itemId || !payload.num) return;
            return resources.createCart(payload)
                .then(
                    () => {
                        // 请求成功
                        dispatch('checkoutCart')
                    },
                    (e) => {
                        // error
                        console.log('error art')
                        throw e
                    }
                )
        },

        // 下一页商品
        nextItemPage({dispatch, state}) {
            dispatch('checkoutItem', {curPage: state.item.curPage + 1})
        },
        // 上一页商品
        forwardItemPage({dispatch, state}) {
            dispatch('checkoutItem', {curPage: state.item.curPage - 1})
        },
        // 创建商品
        createItem({dispatch, commit}, {img, name, price}) {
            dispatch('_uploadImg', img)
                .then(
                    (imgSrc) => resources.createItem({imgSrc, name, price})
                )
                .then(
                    itemId => {
                        return resources.getItem(itemId)
                    }
                )
                .then(
                    item => {
                        commit('createItem', item)
                    }
                )
        },
        // 上传图片(一般不单独上传 所以是私有的)
        _uploadImg(context, img) {
            return resources.uploadImg(img)
                .then(
                    (response) => response.imgSrc
                )
        },
        // 获取单个物品
        getSingleItem(context, itemId) {
            return resources.getItem(itemId)
                .then(
                    item=>{
                        if (item.imgSrc) {
                            item.imgSrc = 'http://120.24.70.191:8080/SimpleShoppingWebsite' + item.imgSrc
                        }
                        return item
                    },
                    error=>{
                        throw error
                    }
                )
        },

        // 登录
        login({state}, payload = {}) {
            let {username} = payload
            return resources.login(username)
                .then(
                    () => {
                        state.isLogin = true
                        state.username = username
                    },
                    (e) => {
                        throw e
                    }
                )
        },
        logout({state}) {
            resources.logout()
                .then(
                    () => {
                        state.isLogin = false
                    },
                    e => {
                        throw e
                    }
                )
        },

        // 更新文档标题
        checkoutDocumentTitle({state},documentTitle){
            resources.getDocumentTitle(documentTitle)
                .then(
                    (documentTitle)=>{
                        state.documentTitle =documentTitle
                    }
                )
        }
    }

})

export default store
export let state = store.state
export let commit = store.commit
export let dispatch = store.dispatch

function storeObject(data, target) {
    Object.keys(data).forEach((value) => {
        if (Object.keys(target).includes(value)) {
            target[value] = data[value]
        }
    })
}