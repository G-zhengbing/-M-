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
      path: "/home",
      component: Home
    },
    {
      path: "/databank",
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
      path: "/order",
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
    }
  ]
})

router.beforeEach((to, form, next) => {
  var arr = ['/login']
  if (arr.includes(to.path) || JSON.stringify(storage.getToken()) != '{}') {
    next()
    return
  } else {
    return next('/login')
  }
})
export default router
