import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './vuex/store'
import '@/assets/fonts/iconfont.css' //字体样式文件
import '@/styles/reset.css' //初始化默认的标签样式
import '@/mobile/flexible.js' //自动适应宽度，改变html的font-size
import router from '@/router' //导入路由对象
// 引入全部样式
import 'vant/lib/index.less'
//全局vant注册 （自动按需引入）
import {
  NavBar,
  Tabbar,
  TabbarItem,
  Col,
  Row,
  Image as VanImage,
  Cell,
  CellGroup,
  Icon,
  Search,
  PullRefresh,
  List,
  Card,
  Field,
  Button,
  Dialog,
} from 'vant'

Vue.use(Vuex)

Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(VanImage)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(Search)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Card)
Vue.use(Field)
Vue.use(Button)
Vue.use(Dialog)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
