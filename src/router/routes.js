import App from '../App.vue'
import Goods from '../page/goods/Goods.vue'
import Cart from '../page/cart/Cart.vue'

const routes = [
    {
        path:'/',
        component:App,
        children:[
            {
                path:'goods',
                name:'goods',
                alias:'',
                component:Goods
            },
            {
                path:'cart',
                name:'cart',
                component:Cart
            }
        ]
    }
]



export default routes