import axios from 'axios'
import API from './API'
import ClientError from './ClientError'

const deliverResponse = response => {
    if (response.data.status === 200) {
        return response.data.data
    } else {
        throw new ClientError(response)
    }
}

const request = {
    getItemNum(){
        return axios.get(API.getItemNum)
            .then(deliverResponse)
    },
    getItemList(page = 0, rows = 12) {
        return axios.get(API.getItemList(), {params: {page, rows}})
            .then(deliverResponse)
    },
    getItem(id) {
        return axios.get(API.getItem(id))
            .then(deliverResponse)
    },
    createItem(bundle) {
        return axios.post(API.createItem, bundle)
            .then(deliverResponse)
    },
    updateItem(id, bundle) {
        return axios.post(API.updateItem(id), bundle)
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
            .then(deliverResponse)
    },
    createCart(bundle) {
        return axios.post(API.createCart, bundle)
            .then(deliverResponse)
    },
    updateCart(id, bundle) {
        return axios.post(API.updateCart(id), bundle)
            .then(deliverResponse)
    },
    deleteCarts(idList) {
        return axios.post(API.deleteCarts, {idList})
            .then(deliverResponse)
    },

    uploadImg(img){
        let formData = new FormData()
        formData.append('img',img)
        return axios.post(API.uploadImg,formData)
            .then(deliverResponse)
    }
}


export default request