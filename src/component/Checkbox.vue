<template>
    <div class="outer-checkbox">
        <i :class="['checkbox',innerCheckState?'selected':'']" @click="$refs.input.click()" ref="checkbox"></i>
        <input hidden type="checkbox" @change="changeHandler(arguments[0])" :value="value" ref="input" v-model="innerCheckState"/>
    </div>
</template>
<script>
    export default {
        model: {
            prop: 'checkState',
            event: 'change'
        },
        created() {
        },
        props: {
            checkState: {
                default: false
            },
            value: {
                required: true
            }
        },
        data() {
            return {
                innerCheckState:false
            }
        },
        computed: {
//            将checkState数组转化为true/false
            selfCheckState() {
                if (this.checkState instanceof Array) {
                    return this.checkState.includes(this.value)
                }
                return this.checkState
            }
        },
        watch: {
            selfCheckState(value){
                this.innerCheckState = value
            }
        },
        methods: {
            test(...args) {
                console.log(args)

            },
            changeHandler(event) {
                let checked = event.target.checked
                let newCheckState
                if (this.checkState instanceof Array) {
                    newCheckState = [...this.checkState]
                    console.log(newCheckState)
                    if (checked) {
                        newCheckState.push(this.value)
                    } else {
                        newCheckState.splice(newCheckState.indexOf(this.value), 1)
                    }
                    console.log(newCheckState)
                } else {
                    newCheckState = checked
                }
                this.$emit('change', newCheckState)
            }
        }
    }
</script>
<style scoped>
    .checkbox {
        display: inline-block;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        background-color: white;
        border: 1px solid #6b6b6b;
    }

    .checkbox.selected {
        background-color: #ed1c24;
        border-color: #ed1c24;
        background-image: url("../img/selected.png");
        background-size: 70%;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .outer-checkbox{
        display: inline-block;
    }
</style>