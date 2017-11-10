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
    getGood(id){
        return axios.get(API.getGood(id))
            .then(deliverResponse)
    },
    createGood(name, img){
        formData = new FormData()
        formData.append('name',name)
        formData.append('img',img)
        return axios.post(API.createGood,formData)
            .then(deliverResponse)
    },
    updateGood(id, bundle){
        return axios.post(API.updateGood,bundle)
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


    getCartsNum(){
        return axios.get(API.getCartsNum)
            .then(deliverResponse)
    },
    getCarts(){
        return axios.get(API.getCarts)
            .then(deliverResponse)
    },
    createCart(foodsId, num){
        return axios.post(API.createCart,{foodsId,num})
            .then(deliverResponse)
    },
    updateCart(id, bundle){
        return axios.post(API.updateCart(id),bundle)
            .then(deliverResponse)
    },
    deleteCarts(idList){
        return axios.post(API.deleteCarts,{idList})
            .then(deliverResponse)
    }
}

// const data={}
// Object.defineProperty(data,'cartItems',{
//     get(){
//         let value = []
//         request.getCarts()
//             .then(response=>{
//                 value = response
//                 console.log(response)
//             })
//         return value
//     }
// })


export default request
// export {data}