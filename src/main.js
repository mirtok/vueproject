import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from  'vant';
import axios  from  'axios';
import 'vant/lib/index.css';
import APlayer from '@moefe/vue-aplayer';
import VueLazyLoad from 'vue-lazyload'
import add from '@/util/add.js'
import * as filters from '@/filters/index'

Vue.use(APlayer, {
    defaultCover: 'https://github.com/u3u.png',
    productionTip: true,
});
Vue.use(VueLazyLoad,{
    preLoad: 1.3,
    error: require('./assets/error.jpg'),
    loading: require('./assets/loading.gif'),
    attempt: 1
});
//全局过滤器

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.use(Vant)
Vue.config.productionTip = false;
Vue.prototype.$add = add;
Vue.prototype.$axios = axios;


router.beforeEach((to,from,next)=>{
    if(to.meta.title){
        document.title = to.meta.title;
    }
    next();
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
