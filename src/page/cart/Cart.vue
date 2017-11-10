<template>
    <div>
        <h1>Cart</h1>
        <p>{{cartItems}}</p>
    </div>
</template>
<script>
    import resources from '../../module/resources'
    export default {
        created() {
            console.log('cart created');
        },
        data(){
            return {
                cartItems: data.cartItems
            }
        }
    }
</script>