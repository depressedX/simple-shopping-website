<template>
    <div>
        <img :src="imgSrc"/>
        <input type="file" @change="fileHandler" accept="image/*"/>
        <br/>
        <label for="name">名称</label>
        <input name="name" :value="name" id="name"/>
        <br/>
        <label for="pirce">价格</label>
        <input name="name" v-model="price" id="pirce"/>
        <br/>
        <a href="javascript:void (0)" @click="submit" class="submit-btn">{{submitBtnName}}</a>
    </div>
</template>
<script>
    import {state, default as store} from '../../store'
    import defaultImg from '../../img/default_food.jpg'


    export default {
        data() {
            return {
                name: '',
                price: 0,
                imgSrc: defaultImg
            }
        },
        created() {
            if (!this.isNewItem) {
                store.dispatch('getSingleItem', this.itemId)
                    .then(
                        (item) => {
                            this.imgSrc = item.imgSrc || defaultImg
                            this.price = item.price
                            this.name = item.name
                        }
                    )
            }
        },
        props: {
            itemId: {
                type: Number,
                default: -1
            }
        },
        computed: {
            isNewItem() {
                return this.itemId === -1
            },
            submitBtnName() {
                return this.isNewItem ? '创建物品' : '修改物品'
            }
        },
        methods:{
            submit(){
                
            },
            fileHandler(event){
                const file = event.target.files[0]
                if (!file) return
                this.imgSrc = URL.createObjectURL(file)
            }
        }
    }
</script>
<style scoped>
    .submit-btn {
        display: inline-block;
        padding: .5em 1em;
        border: 1px solid hsl(120, 50%, 50%);
    }

    img {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }

</style>