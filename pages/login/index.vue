<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">
                        {{isLogin ? 'Sign in' : 'Sign up'}}
                    </h1>
                    <p class="text-xs-center">
                        <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
                        <nuxt-link v-if="!isLogin" to="login">Have an account?</nuxt-link>
                    </p>

                    <ul class="error-messages">
                        <li v-for="(item, key) in error" :key="key">{{key}}: {{item}}</li>
                    </ul>

                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group" v-if="!isLogin">
                            <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email" required>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" required>
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{isLogin ? 'Sign in' : 'Sign up'}}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {login, register} from '@/api/user';
    //尽在客户端加载
    const Cookie = process.client ? require('js-cookie') : '';
    export default {
        name: "index",
        data () {
            return {
                user: {
                    username: '',
                    email: '',
                    password: ''
                },
                error: {}
            };
        },
        computed: {
            isLogin () {
                return this.$route.name === 'Login'
            }
        },
        methods: {
            onSubmit () {
                let promise = this.isLogin ? login({
                    user: this.user
                }) : register({
                    user: this.user
                })
                promise.then(({data}) => {
                    //存储到store中，供其他页面使用

                    this.$store.commit('setUser', data.user);

                    //存储到cookie中，客户端和服务端都可以获取到cookie
                    Cookie.set('user', data.user);

                    this.$router.push('/')
                }).catch((error) => {
                    console.dir(error)
                    this.error = error.response.data.errors;
                })
            },

        },
        mounted () {

        }
    }
</script>

<style scoped>

</style>
