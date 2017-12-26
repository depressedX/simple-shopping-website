import axios from 'axios'
import API from './API'
import ClientError from './ClientError'


const deliverResponse = response => {
    if (response.data.status === 200) {
        return response.data.data
    } else {
        throw new ClientError(response.data)
    }
}
const throwError = error => {
    throw  error
}

axios.interceptors.request.use(function (config) {
    // 禁止缓存
    config.params = config.params||{}
    config.params.noCache = new Date().getTime()
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

const decodePrice = item => {
    item.price = item.price / 100
    return item
}
const encodePrice = item => {
    item.price = item.price * 100
    return item
}
const decodePreference = preference => preference / 100
const encodePreference = preference => preference * 100

const request = {
    getItemNum() {
        return axios.get(API.getItemNum)
            .then(deliverResponse)
    },
    getItemList(page = 0, rows = 12) {
        return axios.get(API.getItemList, {params: {page, rows}})
            .then(deliverResponse)
            .then(
                itemList => itemList.map(decodePrice),
                throwError
            )
    },
    getItem(id) {
        return axios.get(API.getItem(id))
            .then(deliverResponse)
            .then(
                decodePrice,
                throwError
            )
    },
    createItem(bundle) {
        /**
         * 预处理一下 价格*100
         */
        // bundle.price = parseInt(bundle.price * 100)
        bundle = encodePrice(bundle)

        return axios.post(API.createItem, bundle, {
            // headers: {'Content-Type': 'multipart/form-data'},
        })
            .then(deliverResponse)
    },
    updateItem(id, bundle) {
        /**
         * 预处理一下 价格*100
         */
        bundle = encodePrice(bundle)
        return axios.post(API.updateItem(id), bundle)
            .then(deliverResponse, throwError)
    },
    deleteItem(id) {
        return axios.post(API.deleteItem(id))
            .then(deliverResponse)
    },


    login(username) {
        return axios.post(API.login, {
            username
        })
            .then(deliverResponse)
    },
    logout() {
        return axios.post(API.logout)
            .then(deliverResponse)
    },


    getCartNum() {
        return axios.get(API.getCartNum)
            .then(deliverResponse)
    },
    getCartList() {
        return axios.get(API.getCartList)
            .then(deliverResponse, throwError)
            .then(cartList=>cartList.map(decodePrice),throwError)
    },
    createCart(bundle) {
        return axios.post(API.createCart, bundle, {
            // headers: {'Content-Type': 'x-www-form-urlencoded'},
        })
            .then(deliverResponse)
    },
    updateCart(id, bundle) {
        return axios.post(API.updateCart(id), bundle)
            .then(deliverResponse)
    },
    deleteCarts(idList) {
        return axios.post(API.deleteCarts, {cartIdList: idList.join(',')})
            .then(deliverResponse)
    },

    createOrder(bundle) {
        return axios.post(API.createOrder, {cartIdList: bundle.selectedCartId.join(','), address: bundle.address},
            // {headers: {'Content-Type': 'text/plain'}}
        )
            .then(deliverResponse)
    },

    uploadImg(img) {
        let formData = new FormData()
        formData.append('img', img)
        return axios.post(API.uploadImg, formData)
            .then(deliverResponse)
    },

    downloadData() {
        let hrefDom = document.createElement('a')
        hrefDom.href = API.downloadData
        hrefDom.click()
    },

    getDocumentTitle() {
        return axios.get(API.getDocumentTitle)
            .then(deliverResponse, throwError)
    },
    updateDocumentTitle(documentTitle) {
        return axios.post(API.updateDocumentTitle, {documentTitle})
            .then(deliverResponse, throwError)
    },
    updateMaxCartNum(maxCartNum) {
        return axios.post(API.updateMaxCartNum, {maxCartNum})
            .then(deliverResponse, throwError)
    },
    updateMessage401(message401){
        return axios.post(API.updateMessage401,{message401})
            .then(deliverResponse,throwError)
    },
    getPreference(){
        return axios.get(API.getPreference)
            .then(deliverResponse,throwError)
            .then(decodePreference,throwError)
    },
    updatePreference(value){
        return axios.post(API.updatePreference,{preference:encodePreference(value)})
            .then(deliverResponse,throwError)
    }
}


export default request