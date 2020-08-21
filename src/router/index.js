import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/index.vue'
import Home from '@/components/home.vue'
import Piano from '@/components/piano.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: Index
}, {
  path: '/home',
  name: 'home',
  component: Home
}, {
  path: '/piano',
  name: 'piano',
  component: Piano
}]

const router = new VueRouter({
  routes
})

export default router