<template>
    <div>
        <span class="list_name">{{item.name}}<b style="color: #EA5413" v-if="item.isBool==''||item.isBool">*</b></span>
        <el-input style="width:200px"
                  :type="item.type"
                  :placeholder="'请填写'+item.name"
                  v-model.trim="item.value">
        </el-input>
      <span v-show="item.isBool" style="color: red">{{item.isBool}}</span>

    </div>
</template>
<script>
    export default {
      props:["item"],
        data() {
            return {

            }
        },
        methods: {

        },
        created() {
        }
    }
</script>
<style scoped lang="scss">
    .list_name{
      width:93px;
    }
</style>


