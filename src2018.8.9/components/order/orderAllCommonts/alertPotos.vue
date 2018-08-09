<template>
    <div id="app">
      <el-dialog style="z-index:999999" :visible.sync="isPotos.isShow">
        <el-carousel :interval="5000" arrow="always" @change="ccc">
          <el-carousel-item v-for="(item,index) in isPotos.potosimg" :key="index" >
            <a :href="item" target="view_window">
              <img :src="item" alt="" @click="bigger(item)">
            </a>
          </el-carousel-item>
        </el-carousel>
        <div class="div">
          <div>拍照时间:
            <span v-if="isPotos.idPhonesTime[aaa]">{{isPotos.idPhonesTime[aaa] == "null" ? "无" : isPotos.idPhonesTime[aaa]}}</span>
            <span v-else>无</span>
          </div>
          <div>拍照地点:
            <span v-if="isPotos.idPhonesAddress">{{isPotos.idPhonesAddress}}</span>
            <span v-else>无</span>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      props:["isPotos","quiry"],
      data(){
        return {
//          img:[]
          aaa:0
        }
      },
      created(){
//        this.img=this.isPotos.potosimg;
//        console.log(this.isPotos);
      },
      methods:{
        ccc(i){
          this.aaa=i;
//          console.log(i);
        },
        bigger(item){
          console.log(item,'photo');
//          window.open()
        }
      }

    }
</script>

<style scope lang="scss">
  .div{
    height: 100px;
    padding-top:20px;
    box-sizing: border-box;
    >div{
      line-height:50px;
    }
  }
  .el-carousel__container{
    height: 450px;
  }
  .el-carousel__item {
    //background: red;
    width:100%;
    height: 450px;
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    margin: 0;
    text-align: center;
    img{
      display: inline-block;
      max-height: 450px;
      max-width: 100%;

    }
  }
  /*.el-carousel__item:nth-child(2n) {*/
    /*background-color: #99a9bf;*/
  /*}*/
  /*.el-carousel__item:nth-child(2n+1) {*/
    /*background-color: #d3dce6;*/
  /*}*/
</style>
