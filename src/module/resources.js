import axios from 'axios'
import API from './API'

const deliverResponse = response => {
    if (response.data.status === 200) {
        return response.data.data
    } else {
        throw new Error(response.data.message)
    }
}

const request = {
    getGoodsList(page = 0,num=12){
        return axios.get(API.getGoodsList,{page,num})
            .then(deliverResponse)
    },
    getGoods(id){
        return axios.get(API.getGoods(id))
            .then(deliverResponse)
    },
    createGoods(name,img){
        formData = new FormData()
        formData.append('name',name)
        formData.append('img',img)
        return axios.post(API.createGoods,formData)
            .then(deliverResponse)
    },
    updateGoods(id,bundle){
        return axios.post(API.updateGoods,bundle)
            .then(deliverResponse)
    },


    login(username) {
        return axios.post(API.login, {
            username
        })
            .then(deliverResponse)
    },
    logout(){
        return axios.post(API.logout)
            .then(deliverResponse)
    },


    getCartItems(){
        return axios.get(API.getCartItems)
            .then(deliverResponse)
    },
    createCartItem(foodsId,num){
        return axios.post(API.createCartItem,{foodsId,num})
            .then(deliverResponse)
    },
    updateCartItem(id,bundle){
        return axios.post(API.updateCartItem(id),bundle)
            .then(deliverResponse)
    },
    deleteCartItems(idList){
        return axios.post(API.deleteCartItems,{idList})
            .then(deliverResponse)
    }
}

const data={}
Object.defineProperty(data,'cartItems',{
    get(){
        let value = []
        request.getCartItems()
            .then(response=>{
                value = response
                console.log(response)
            })
        return value
    }
})


export default request
export {data}