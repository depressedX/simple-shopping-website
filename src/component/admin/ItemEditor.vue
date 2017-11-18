<template>
    <div>
        <img :src="displayedImgSrc"/>
        <input type="file" @change="fileHandler" accept="image/*"/>
        <br/>
        <label for="name">名称</label>
        <input name="name" v-model="name" id="name"/>
        <br/>
        <label for="pirce">价格</label>
        <input name="name" v-model="price" id="pirce"/>
        <br/>
        <a href="javascript:void (0)" @click="submit" class="submit-btn">{{submitBtnName}}</a>
    </div>
</template>
<script>
    import {state, default as store,commit} from '../../store'
    import defaultImg from '../../img/default_food.jpg'
    import resources from '../../store/resources'


    export default {
        data() {
            return {
                name: '',
                price: 0,
                imgSrc: null,
                img: null,
                displayedImgSrc:defaultImg,
                needUploadImg: false
            }
        },
        created() {
            if (!this.isNewItem) {
                store.dispatch('getSingleItem', this.itemId)
                    .then(
                        (item) => {
                            this.displayedImgSrc = item.imgSrc || defaultImg
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
        methods: {
            // 创建商品
            submit() {
                let uploadImg = new Promise((resolve, reject) => {
                    if (this.needUploadImg) {
                        resources.uploadImg(this.img)
                            .then(
                                data => {
                                    resolve(data.imgSrc)
                                },
                                error => {
                                    reject(error)
                                }
                            )
                    }else {
                        resolve(null)
                    }

                })
                uploadImg.then(
                    (imgSrc)=>{
                        let bundle = {name:this.name,price:this.price,imgSrc}
                        if (this.isNewItem){
                            resources.createItem(bundle)
                                .then(
                                    itemId=>resources.getItem(itemId),
                                    error=>{
                                        commit('createNoticeModal',error.message)
                                    }
                                )
                                .then(
                                    item=>{
                                        commit('createItem',item)
                                        commit('createNoticeModal','创建成功')
                                        this.$router.push({name:'itemAdmin'})
                                    },
                                    error=>{
                                        commit('createNoticeModal',error.message)
                                    }
                                )
                        }else {
                            resources.updateItem(this.itemId,bundle)
                                .then(
                                    ()=>{
                                        store.dispatch('checkoutItem')
                                    },
                                    error=>{
                                        commit('createNoticeModal',error.message)
                                    }
                                )
                        }
                    }
                )
            },
            // 上传图片(一般不单独上传 所以是私有的)
            _uploadImg() {
                return resources.uploadImg(img)
                    .then(
                        (response) => response.imgSrc
                    )
            },
            fileHandler(event) {
                const file = event.target.files[0]
                if (!file) return
                this.needUploadImg = true
                this.img = file
                this.displayedImgSrc = URL.createObjectURL(file)
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