import Vue from 'vue'
import Router from 'vue-router'
import Ebook from '@/Ebook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/ebook' //重定向到ebook路径
    },
    {
      path: '/ebook',
      component: Ebook
    }
  ]
})
