<template>
    <modal ref="modal" @clickmodal="$emit('requestclose')">
        <h1 slot="title" class="login-modal__title">登录网站</h1>
        <div class="login-modal__content">
            <form id="form" @submit.prevent>
                <div class="row">
                    <label for="username">用户名:</label>
                    <input required v-model="username" style="line-height: 2" name="username" placeholder="输入用户名" id="username"/>

                </div>
                <div class="style-wrapper row" style="text-align: right;">
                    <s-button ref="submit" type="submit" class="login-btn" @click="submit">登录</s-button>
                </div>
            </form>
        </div>
    </modal>
</template>
<script>
    import Modal from './modal/Modal.vue'
    import store from '../store'
    import SButton from './SButton.vue'

    export default {
        components: {
            Modal,
            SButton
        },
        data() {
            return {
                username: '',
                form: null
            }
        },
        created() {
            console.log('login modal created')
            this.$nextTick(() => {
                this.form = document.getElementById('form')
            })
        },
        methods: {
            submit() {
                this.form.reportValidity();
                if (this.form.checkValidity()) {
                    this.$refs.submit.preventClickEvent()
                    store.dispatch('login', {username: this.username})
                        .then(
                            ()=>{
                                this.$emit('requestclose')
                            },
                            e=>{
                                this.$refs.submit.allowClickEvent()
                                this.$emit('requestclose')
                                store.commit('createNoticeModal',e.message)
                            }
                        )
                }
            }
        },
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