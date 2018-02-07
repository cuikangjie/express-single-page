import Vue from 'vue'
import App from './App.vue'


import { Button, Select, Container, Aside, Main} from 'element-ui'

Vue.use(Button);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);

new Vue({
  el: '#app',
  render: h => h(App)
})
