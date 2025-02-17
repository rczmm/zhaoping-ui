import {createRouter, createWebHashHistory} from "vue-router";
import index from '../pages/index/index.vue';
import login from '../pages/login/login.vue';
import register from '../pages/register/register.vue';
import {useAuthStore} from '../stores/auth' //  导入 auth store

const router = createRouter({
    history: createWebHashHistory(""),
    routes: [
        {
            path: '/',
            name: 'home',
            component: index,
            meta: {
                requiresAuth: true //  表示该路由需要登录才能访问
            }
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        }
    ]
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore() //  在导航守卫中获取 auth store 实例
    const requiresAuth = to.meta.requiresAuth //  获取路由元信息中 requiresAuth 字段

    // 在每次路由跳转前检查登录状态
    authStore.checkLoginStatus(); // 每次导航前都检查一次，确保状态是最新的

    if (requiresAuth && !authStore.isLoggedIn) {
        //  如果路由需要登录，并且用户未登录，则重定向到登录页
        console.log('需要登录才能访问，重定向到登录页');
        next('/login') //  重定向到登录页
    } else if (to.path === '/login' && authStore.isLoggedIn) {
        //  如果用户已登录，并且访问登录页，则重定向到首页 (可选，根据需求决定是否需要)
        console.log('已登录用户访问登录页，重定向到首页');
        next('/') //  重定向到首页
    } else {
        //  否则，允许访问路由
        next()
    }
})


export default router