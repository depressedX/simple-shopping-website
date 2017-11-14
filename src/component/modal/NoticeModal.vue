<template>
    <modal>
        <slot></slot>
        <s-button class="confirm-btn">我知道了</s-button>
    </modal>
</template>
<script>
    import Modal from './Modal.vue'
    import SButton from '../SButton.vue'
    export default {
        components:{
            Modal,
            SButton
        }
    }
</script>