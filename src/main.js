import {createApp} from 'vue';
import App from './index.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router/index.js';
import {createPinia} from 'pinia' //  导入 createPinia
import zhCn from 'element-plus/es/locale/lang/zh-cn'


let app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
const pinia = createPinia() //  创建 Pinia 实例
app.use(pinia) //  将 Pinia 实例作为插件安装到 Vue 应用
app.mount('#index')
