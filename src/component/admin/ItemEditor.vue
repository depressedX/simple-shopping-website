<template>
    <div>
        <img :src="displayedImgSrc"/><br/>
        <label for="image">图片</label>
        <input type="file" @change="fileHandler" accept="image/*" id="image"/>
        <br/>
        <label for="name">名称</label>
        <input name="name" v-model="name" id="name"/>
        <br/>
        <label for="pirce">价格</label>
        <input name="name" v-model="price" id="pirce"/>
        <br/>
        <a href="javascript:void (0)" @click="submit" class="submit-btn">{{submitBtnName}}</a>
        <a v-if="!isNewItem" href="javascript:void (0)" @click="showDeleteConfirmDialog=true"
           class="submit-btn">删除物品</a>
        <v-dialog
                v-if="showDeleteConfirmDialog"
                @confirm="deleteItem"
                @cancel="showDeleteConfirmDialog=false"
                message="是否真的删除"/>
    </div>
</template>
<script>
    import {state, default as store, commit} from '../../store'
    import defaultImg from '../../img/default_food.jpg'
    import resources from '../../store/resources'
    import VDialog from '../../component/modal/Dialog.vue'


    export default {
        components: {
            VDialog
        },
        data() {
            return {
                name: '',
                price: 0,
                imgSrc: null,
                img: null,
                displayedImgSrc: defaultImg,
                needUploadImg: false,
                showDeleteConfirmDialog: false
            }
        },
        created() {
            if (!this.isNewItem) {
                resources.getItem(this.itemId)
                    .then(
                        (item)=>{
                            this.imgSrc = item.imgSrc
                        }
                    )
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
            },
            formattedPrice(){
                return Number(this.price)
            }
        },
        methods: {
            // 创建商品
            submit() {
                let uploadImg = new Promise((resolve, reject) => {
                        if (this.needUploadImg) {
//                            通过input输入的图片
                            resources.uploadImg(this.img)
                                .then(
                                    imgSrc => {
                                        console.log('img resoved', imgSrc)
                                        resolve(imgSrc)
                                    },
                                    error => {
                                        reject(error)
                                    }
                                )
                        } else {
//                            resolve(null)
                            resolve(this.imgSrc)
                        }
                })
                uploadImg.then(
                    (imgSrc) => {
                        let bundle = {name: this.name, price: this.formattedPrice, imgSrc}
                        if (this.isNewItem) {
                            resources.createItem(bundle)
//                                .then(
//                                    itemId => resources.getItem(itemId),
//                                    error => {
////                                        commit('createNoticeModal', error.message)
//                                        throw error
//                                    }
//                                )
                                .then(
                                    item => {
                                        commit('createNoticeModal', '创建成功')
                                        this.$router.push({name: 'itemAdmin'})
                                    },
                                    error => {
                                        commit('createNoticeModal', error.message)
                                    }
                                )
                        } else {
                            resources.updateItem(this.itemId, bundle)
                                .then(
                                    () => {
                                        commit('createNoticeModal', '修改成功')
                                        this.$router.push({name: 'itemAdmin'})
                                    },
                                    error => {
                                        commit('createNoticeModal', error.message)
                                    }
                                )
                        }
                    },
                    error=>{
                        console.log(error)
                        commit('createNoticeModal', error.message)
                    }
                )
            },
            deleteItem() {
                this.showDeleteConfirmDialog=false
                resources.deleteItem(this.itemId)
                    .then(
                        () => {
                            store.commit('createNoticeModal', '删除成功')
                            this.$router.back()
                        },
                        error => {
                            store.commit('createNoticeModal', error.message)
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
        margin-top: .3em;
    }

    img {
        width: 100px;
        height: 100px;
        object-fit: contain;
        overflow: hidden;
    }

</style>