import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false, //  初始状态：未登录
        token: null,
        userId: null,
        username: null,
        nickname: null,
        avatar: null
    }),
    getters: {
        // 可以添加 getter 来派生状态，例如
        // isAuthenticated: (state) => state.isLoggedIn,
    },
    actions: {
        login(userData) {
            // 设置登录状态
            this.isLoggedIn = true;
            // 保存用户信息
            this.token = userData.token;
            this.userId = userData.userId;
            this.username = userData.username;
            this.nickname = userData.nickname;
            this.avatar = userData.avatar;
            // 将token保存到localStorage
            localStorage.setItem('token', userData.token);
            // 将用户信息保存到localStorage
            localStorage.setItem('userInfo', JSON.stringify({
                userId: userData.userId,
                username: userData.username,
                nickname: userData.nickname,
                avatar: userData.avatar
            }));
            console.log('用户已登录');
        },
        logout() {
            // 清除登录状态
            this.isLoggedIn = false;
            // 清除用户信息
            this.token = null;
            this.userId = null;
            this.username = null;
            this.nickname = null;
            this.avatar = null;
            // 清除localStorage中的token和用户信息
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('isLoggedIn');
            console.log('用户已登出');
        },
        checkLoginStatus() {
            // 检查localStorage中是否有token
            const token = localStorage.getItem('token');
            const userInfoStr = localStorage.getItem('userInfo');
            
            if (token) {
                this.isLoggedIn = true;
                this.token = token;
                
                // 恢复用户信息
                if (userInfoStr) {
                    try {
                        const userInfo = JSON.parse(userInfoStr);
                        this.userId = userInfo.userId;
                        this.username = userInfo.username;
                        this.nickname = userInfo.nickname;
                        this.avatar = userInfo.avatar;
                    } catch (e) {
                        console.error('解析用户信息失败', e);
                    }
                }
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