<template>
    <div>
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