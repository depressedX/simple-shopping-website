<template>
    <div class="mask" @click="close">
        <div class="container" @click.stop="">
            <p class="message">{{message}}</p>
            <s-button @click="close" class="confirm-btn">我知道了</s-button>
        </div>
    </div>
</template>
<script>
    import Modal from './Modal.vue'
    import SButton from '../SButton.vue'
    import store from '../../store'

    export default {
        components: {
            Modal,
            SButton
        },
        props: {
            message: {
                type: String,
                default: ''
            }
        },
        methods: {
            close() {
                store.commit('disposeNoticeModal')
            }
        }
    }
</script>
<style scoped>

    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(50, 50, 50, .5);
        font-size: 1.3rem;
    }

    .container {
        padding: 1.5em 3em .5em;
        height: 150px;
        width: 250px;
        background-color: white;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .confirm-btn{
        padding: .5em 2em;
        background-color: #448aca;
        border-radius: 3px;
        color: white;
    }
</style>