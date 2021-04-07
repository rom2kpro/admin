import DashBoard from './components/Dashboard'
import CreateProduct from './components/product/Create'
import Layout from './components/Layout'
import Login from './components/login'
import AllUser from './components/user/AllUser'
import CreateStaff from './components/user/CreateStaff'
import Product from './components/product/Product'

const makeRoutes = (store) => {
    const routes = [
        {path: '/', name: 'home', component: Layout, beforeEnter: (to, from, next) => {
            if(store.state.admin.login){
                next()
            } else next({path: '/login'})
        },children: [
            {path: 'dashboard', name: 'dashboard', component: DashBoard},
            {path: 'product/create', name: 'createproduct', component: CreateProduct},
            {path: 'user/:path', name: 'user', component: AllUser},
            {path: '/create/user', name: 'createstaff', component: CreateStaff},
            {path: 'product', name: 'product', component: Product}
        ]},
        {path: '/login', name: 'login', component: Login, beforeEnter: (to, from, next) => {
            if(!store.state.admin.login){
                next()
            } else next({path: '/dashboard'})
        }}
    ]

    return routes
}

export default makeRoutes;