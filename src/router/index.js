import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () =>import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
//1.安装插件
Vue.use(VueRouter)

const routers = [
  {
    path:'',
    redirect: '/home'
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/category',
    component: Category
  },
  {
    path:'/cart',
    component: Cart
  },
  {
    path:'/profile',
    component: Profile
  },
]

//2.创建router
const router = new VueRouter({
  routers,
  mode:'history'
})

//3.导出
export default router
