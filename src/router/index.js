import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index.vue'
import Home from '@/components/home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: Index
}, {
  path: '/home',
  name: 'home',
  component: Home
}]

const router = new VueRouter({
  routes
})

export default router