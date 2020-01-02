import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Databank from '@/components/Databank'
import Personage from '@/components/Personage'
import PersonageData from '@/components/PersonageData'
import Course from '@/components/Course'
import SmallClass from '@/components/SmallClass'
import Order from '@/components/Order'
import Special from '@/components/Special'
import Login from '@/components/Login'
import Classify from '@/components/Classify'
import Data from '@/components/Data'
import Signin from '@/components/Signin'
import Address from '../components/address/Address'
import Addsite from '../components/address/Addsite'
import storage from '../uilt/storage'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/databank/:id",
      component: Databank
    },
    {
      path: "/personage",
      component: Personage
    },
    {
      path: "/course",
      component: Course
    },
    {
      path: "/smallclass",
      component: SmallClass
    },
    {
      path: "/personagedata",
      component: PersonageData
    },
    {
      path: "/order/:id",
      name:'Order',
      component: Order
    },
    {
      path: "/special",
      component: Special
    },
    {
      path: "/login",
      name: 'Login',
      component: Login
    },
    {
      path: "/classify",
      component: Classify
    },
    {
      path: "/data",
      component: Data
    },
    {
      path: "/address",
      component: Address
    },
    {
      path: "/addsite",
      component: Addsite
    }
  ]
})

// router.beforeEach((to, form, next) => {
//   var arr = ['/login']
//   if (arr.includes(to.path) || JSON.stringify(storage.getToken()) != '{}') {
//     next()
//     return
//   } else {
//     return next('/login')
//   }
// })
export default router
