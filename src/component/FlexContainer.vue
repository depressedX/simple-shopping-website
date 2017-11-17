<template>
    <div class="container">
        <slot name="item" v-for="item in items" :data="item"></slot>
        <empty-element v-for="i in emptyNum" :key="i" class="empty"></empty-element>
    </div>
</template>
<script>
    export default {
        components: {
            EmptyElement: {
                template: `<div></div>`
            }
        },
        data() {
            return {
                numPerRow: 5
            }
        },
        props: {
            items: {
                type: Array,
                default: []
            }
        },
        watch: {
        },
        computed: {
            emptyNum() {
                return this.numPerRow - this.items.length % this.numPerRow
            }
        }
    }
</script>
<style scoped="">
    .container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .empty{
        width: 200px;
    }
</style>