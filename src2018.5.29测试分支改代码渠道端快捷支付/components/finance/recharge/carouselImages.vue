<template>
    <div id="carouse_dialog">
      <el-dialog :title="data.title" :visible.sync="data.isShow">
        <el-carousel indicator-position="outside" :autoplay="false" height="400px" >
            <el-carousel-item v-for="(item,index) in data.images" :key="index">
              <!--<img style="width:100%;" :src="item.src" alt="">-->
              <i class="image" :style="{backgroundImage:'url('+item+')'}"></i>

            </el-carousel-item>
        </el-carousel>
        <div class="button_container">
          <el-button class="close_button" @click="data.isShow=!data.isShow">关闭</el-button>
        </div>

      </el-dialog>

    </div>
</template>
<script>
    export default {
      props:["data"],
        data() {
            return {

            }
        },
        methods: {
          close(){

          }
        },
        created() {

        }
    }
</script>
<style scoped lang="scss">
.image{
  width:100%;
  height:100%;
  background-size:100% 100%;
  display: block;
}
  .button_container{
    text-align: center;
    margin-top:3em;
    .close_button{
        background:#188922;
        color:#fff;
        padding-left:3em;
        padding-right:3em;
        font-family:PingFangSC-Regular;
    }
  }
</style>
<style lang="scss">
  #carouse_dialog{
    >.el-dialog__wrapper{
      .el-dialog__header{
        text-align: center;
      }
    }

  }
</style>

