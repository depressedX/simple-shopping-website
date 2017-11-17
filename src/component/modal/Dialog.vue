<template>
    <div class="mask" @click="$emit('cancel')">
        <div class="container" @click.stop="">
            <p class="message">{{message}}</p>
            <div class="button-group">
                <s-button @click="$emit('confirm')" class="confirm-button">确认</s-button>
                <s-button @click="$emit('cancel')" class="cancel-button">返回</s-button>
            </div>
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

    .button-group{
        text-align: center;
    }
    .confirm-button,.cancel-button {
        padding: .5em 2em;
        margin: 0 .3em;
        border-radius: 3px;
        color: white;
    }
    .confirm-button{
        background-color: #e72d30;
    }
    .cancel-button{

        background-color: #448aca;
    }
</style>