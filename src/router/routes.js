import App from '../App.vue'
import Goods from '../page/item/Item.vue'
import Cart from '../page/cart/Cart.vue'
import ItemAdmin from '../page/itemAdmin/ItemAdmin.vue'
import DetailItemAdmin from '../page/detailItemAdmin/DetailItemAdmin.vue'

const routes = [
    {
        path:ROOT_ROUTE+'/',
        component:App,
        children:[
            {
                path:'item',
                name:'item',
                alias:'',
                component:Goods
            },
            {
                path:'cart',
                name:'cart',
                component:Cart
            },
            {
                path:'admin/item',
                name:'itemAdmin',
                component:ItemAdmin
            },
            {
                path:'admin/item/:itemId',
                name:'detailItemAdmin',
                component:DetailItemAdmin,
                props:true
            }
        ]
    }
]



export default routes