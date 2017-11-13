import Vue from 'vue'
import Vuex from 'vuex'
import resources from './resources'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 存放某页的商品
        item: {
            total: 0,
            list: [],
            curPage: 1,
            numPerPage: 6,
        },
        // 存放购物车的商品
        cart: {
            total: 0,
            list: []
        }
    },
    mutations: {
        modifyItem(state, payload) {
            storeObject(payload, state.item)
        },
        createitem(state, payload) {
            state.item.list.push(payload)
        },
        modifyCart(state, payload) {
            state.cart.list = payload.list || state.cart.list
            state.cart.total = state.cart.list.length
        },
        modifyItemNum(state, num) {
            state.item.total = num
        }
    },
    actions: {
        // 服务器购物车商品
        checkoutCart({commit}) {
            resources.getCartList()
                .then(response => {
                    commit('modifyCart', {list: response})
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
                        list: response
                    })
                })
        },
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
            resources.createCart(payload)
                .then(
                    () => {
                        dispatch('checkoutCart')

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
        _uploadImg(context, img) {
            return resources.uploadImg(img)
                .then(
                    (response) => response.imgSrc
                )
        },
        getSingleItem(context,itemId){
            return resources.getItem(itemId)
        }
    }

})

export default store
export let state = store.state

function storeObject(data, target) {
    Object.keys(data).forEach((value) => {
        if (Object.keys(target).includes(value)) {
            target[value] = data[value]
        }
    })
}