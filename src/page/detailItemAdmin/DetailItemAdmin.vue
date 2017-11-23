<template>
    <div class="content-wrapper">
        <h1>Detail  {{itemId | toNumber}}</h1>
        <item-editor :itemId="Number(itemId)"></item-editor>
    </div>
</template>
<script>
    import ItemEditor from '../../component/admin/ItemEditor.vue'

    export default {
        components: {
            ItemEditor
        },
        props: {
            itemId: {
                required: true
            }
        },
        filters: {
            toNumber(v) {
                return Number(v)

            }
        }
    }
</script>
<style>
    .content-wrapper{
        font-size: 1.5rem;
        line-height: 2;
    }
</style>