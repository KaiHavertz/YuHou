import Vue from 'vue'
import App from '@/pages/index.vue'
import router from '@/router'
import store from '@/store'

/*import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)*/

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

//引入外部js
import pianoAudio from '../../public/piano/audio.js'
import pianoIndex from '../../public/piano/index.js'
import pianoCss from '../../public/piano/index.css'

Vue.prototype.pianoAudio = pianoAudio
Vue.prototype.pianoIndex = pianoIndex
Vue.prototype.pianoCss = pianoCss

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')