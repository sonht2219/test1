import Vue from 'vue'
import App from './App.vue'
import { Select, Option, Button, Input } from 'element-ui';

Vue.config.productionTip = false;

import infiniteScroll from 'vue-infinite-scroll'
import vuetify from './plugins/vuetify'
import dialog from "@/plugins/dialog";

Vue.use(infiniteScroll)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Input)

Vue.use(dialog, {
  context: {
    vuetify
  }
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
