import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus =new Vue()

//安装toast
Vue.use(toast)

//安装min-ui
Vue.use(MintUI)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

require('./assets/css/base.css')


// const num = 10;
// console.log(!num);

