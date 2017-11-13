<template>
    <modal v-show="show">
        <h1 slot="title" class="login-modal__title">登录网站</h1>
        <div class="login-modal__content">
            <div class="row">
                <label for="username">用户名:</label><input style="line-height: 2" name="username" placeholder="输入用户名" id="username"/>
            </div>
            <div class="style-wrapper row" style="text-align: right;" >
                <a href="javascript:void (0)" @click="" class="login-btn">登录</a>
            </div>
        </div>
    </modal>
</template>
<script>
    import Modal from './Modal.vue'
    export default {
        components: {
            Modal
        },
        data(){
            return{
                show:true
            }
        },
        created(){
            console.log('login modal created')
        },
        methods:{
            close(){
                this.show = false
            },
            open(){
                this.show = true
            },
            toggle(){
                this.show = !this.show
            }
        }
    }
</script>
<style scoped>
    .login-modal__title {
        display: inline-block;
        font-weight: normal;
        position: relative;
        font-size: 1em;
    }

    .login-modal__title:before, .login-modal__title:after {
        content: '';
        position: absolute;
        top: 50%;
        height: 100px;
        background-color: gray;
        width: 50px;
        height: 1px;
    }

    .login-modal__title:before {
        right: 120%;
    }

    .login-modal__title:after {
        left: 120%;
    }

    .login-btn {
        background-color: #22ac38;
        padding: .5em 1em;
        border-radius: 5px;
        display: inline-block;
    }

    .row {
        margin: 1em 0;
    }
</style>