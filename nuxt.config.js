module.exports = {
    router: {
        base: '/',
        linkActiveClass: 'active', //设置导航高亮
        //自定义路由规则
        extendRoutes (routes, resolve) {
            routes.splice(0); //清除默认的路由规则
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layouts'),
                    children: [
                        {
                            path: '/',
                            name: 'Home',
                            component: resolve(__dirname, 'pages/home'),
                        },
                        {
                            path: '/login',
                            name: 'Login',
                            component: resolve(__dirname, 'pages/login'),
                        },
                        {
                            path: '/register',
                            name: 'Register',
                            component: resolve(__dirname, 'pages/login'),
                        },
                        {
                            path: '/profile/:username',
                            name: 'Profile',
                            component: resolve(__dirname, 'pages/profile'),
                        },
                        {
                            path: '/settings',
                            name: 'Settings',
                            component: resolve(__dirname, 'pages/settings'),
                        },
                        {
                            path: '/editor',
                            name: 'Editor',
                            component: resolve(__dirname, 'pages/editor'),
                        },
                        {
                            path: '/article/:slug',
                            name: 'Article',
                            component: resolve(__dirname, 'pages/article'),
                        },
                    ]
                }
            ])
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    }
};
