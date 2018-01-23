import Vue from "vue";
import VueRouter from "vue-router";
import router from "./routes";
import VueResource from 'vue-resource';



Vue.use(VueRouter);
Vue.use(VueResource);
export default new Vue({
    router,
    data(){
        return {
            
        }
    }
}).$mount('#app');
