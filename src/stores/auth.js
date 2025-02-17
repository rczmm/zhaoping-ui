import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false, //  初始状态：未登录
        // 可以添加其他用户相关信息，例如用户名、用户ID 等
    }),
    getters: {
        // 可以添加 getter 来派生状态，例如
        // isAuthenticated: (state) => state.isLoggedIn,
    },
    actions: {
        login() {
            //  模拟登录成功，实际应用中这里会调用后端 API 验证登录信息
            this.isLoggedIn = true
            //  登录成功后，可以保存一些用户信息到 store 中，或者 localStorage 等
            console.log('用户已登录');
        },
        logout() {
            //  模拟登出，实际应用中可能需要清除 token 等
            this.isLoggedIn = false
            //  登出后，可以清除 store 中的用户信息，或者 localStorage 等
            console.log('用户已登出');
        },
        checkLoginStatus() {
            //  在应用初始化时或者页面加载时，检查用户是否已经登录过
            //  实际应用中可能需要检查 localStorage 中是否有 token，或者调用后端 API 验证 token 是否有效
            //  这里简单模拟，您可以根据实际情况修改逻辑
            const storedLoginStatus = localStorage.getItem('isLoggedIn'); // 示例：从 localStorage 获取
            if (storedLoginStatus === 'true') {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
            console.log('检查登录状态:', this.isLoggedIn);
        },
        persistLoginStatus() {
            //  模拟持久化登录状态，实际应用中可以将 token 或者登录状态保存到 localStorage, cookies 等
            localStorage.setItem('isLoggedIn', String(this.isLoggedIn)); // 示例：保存到 localStorage
            console.log('持久化登录状态:', this.isLoggedIn);
        }
    }
})