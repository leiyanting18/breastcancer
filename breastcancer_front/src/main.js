import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/global.css'
import {
    Button,
    Pagination,
    Switch,
    Dialog,
    Field,
    CellGroup,
    Sidebar,
    SidebarItem,
    Tab,
    Tabs
} from 'vant';
import 'vant/lib/index.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
// 全局注册vant组件
app.use(Button);
app.use(Pagination);
app.use(Switch);
app.use(Dialog);
app.use(Field);
app.use(CellGroup);
app.use(Sidebar);
app.use(SidebarItem);
app.use(Tab);
app.use(Tabs);
app.use(store)
app.use(router)
app.mount('#app')