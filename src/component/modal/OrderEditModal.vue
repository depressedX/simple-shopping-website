<template>
    <modal @clickmodal="$emit('cancel')" class="order-edit">
        <h1 slot="title" class="order-edit__title">填写订单信息</h1>
        <form @submit.stop="">
            <div class="input-group">
                <label for="usernmae">姓名:</label>
                <input disabled :value="username" id="usernmae"/>
            </div>
            <div class="input-group">
                <label for="address">收货地址:</label>
                <textarea placeholder="填写地址" id="address" v-model="address" rows="5" cols="20"></textarea>
            </div>
        </form>
        <div class="button-group">
            <s-button @click="$emit('submit',{address})" class="submit">提交</s-button>
            <s-button @click="$emit('cancel')" class="cancel">返回</s-button>
        </div>
    </modal>
</template>
<script>
    import Modal from './Modal.vue'
    import SButton from '../SButton.vue'
    import {state} from '../../store'

    export default {
        components: {
            Modal,
            SButton
        },
        data() {
            return {
                address: ''
            }
        },
        computed: {
            username: () => state.username
        }
    }
</script>
<style scoped>
    .order-edit {
        font-size: 1.6rem;
    }

    .order-edit__title {
        display: inline-block;
        font-weight: normal;
        position: relative;
    }

    .order-edit__title:before, .order-edit__title:after {
        content: '';
        position: absolute;
        top: 50%;
        height: 100px;
        background-color: gray;
        width: 50px;
        height: 1px;
    }

    .order-edit__title:before {
        right: 120%;
    }

    .order-edit__title:after {
        left: 120%;
    }

    .input-group {
        display: flex;
        margin: 1em 0;
        align-items: baseline;
    }

    .input-group label {
        flex: 1 1 0;
    }

    .input-group input, .input-group textarea {
        flex: 3 3 0;
        line-height: 1.75;
    }

    form {
        width: 400px;
    }

    textarea {
        resize: none;
    }
    .button-group{
        text-align: center;
        margin-top: 2em;
    }
    .button-group button{
        padding: .5em 1.5em;
        color: white;
        margin: 0 .3em;
    }
    .cancel{
        background-color: #448aca;
    }
    .submit{
        background-color: #e72d30;
    }
</style>