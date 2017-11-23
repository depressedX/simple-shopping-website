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
const throwError = error=>{
    throw  error
}

axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

const decorateItem = item=>{
    item.price = item.price/100
    return item
}

const request = {
    getItemNum() {
        return axios.get(API.getItemNum)
            .then(deliverResponse)
    },
    getItemList(page = 0, rows = 12) {
        return axios.get(API.getItemList, {params: {page, rows}})
            .then(deliverResponse)
            .then(
                itemList=>itemList.map(decorateItem),
                throwError
            )
    },
    getItem(id) {
        return axios.get(API.getItem(id))
            .then(deliverResponse)
            .then(
                decorateItem,
                throwError
            )
    },
    createItem(bundle) {
        /**
         * 预处理一下 价格*100
         */
        bundle.price = parseInt(bundle.price*100)

        return axios.post(API.createItem, bundle,{
            // headers: {'Content-Type': 'multipart/form-data'},
        })
            .then(deliverResponse)
    },
    updateItem(id, bundle) {
        return axios.post(API.updateItem(id), bundle)
            .then(deliverResponse,throwError)
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
            .then(deliverResponse,throwError)
    },
    createCart(bundle) {
        return axios.post(API.createCart, bundle,{
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

    downloadData(){
        let hrefDom = document.createElement('a')
        hrefDom.href = API.downloadData
        hrefDom.click()
    },

    getDocumentTitle(){
        return axios.get(API.getDocumentTitle)
            .then(deliverResponse,throwError)
    },
    updateDocumentTitle(documentTitle){
        return axios.post(API.updateDocumentTitle,{documentTitle})
            .then(deliverResponse,throwError)
    },
}


export default request