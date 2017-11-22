import App from '../App.vue'
import Goods from '../page/item/Item.vue'
import Cart from '../page/cart/Cart.vue'
import ItemAdmin from '../page/itemAdmin/ItemAdmin.vue'
import DetailItemAdmin from '../page/detailItemAdmin/DetailItemAdmin.vue'

// const ROOT_ROUTE = process.env.NODE_ENV==='production'?'SimpleShoppingWebsite':''
// const ROOT_ROUTE = 'SimpleShoppingWebsite'
const ROOT_ROUTE = ''
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
                component:Cart,
                meta:{
                    requireAuth:true
                }
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
    },
    {
        path:'*',
        redirect:{
            name:'item'
        }
    }
]

export default routes