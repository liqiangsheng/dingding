<template>
  <div id="app" class="product">
    <div class="content">
      <el-menu theme="dark" class="el-menu-demo" mode="horizontal" >
        <el-menu-item :class="{active:productNum==index}" v-for="(item,index) in productIndex" :key="index" index="index" @click="product(index)" >
          {{item}}
        </el-menu-item>
      </el-menu>
       <div class="footer">
          <div class="footer_table">
            <!--表格数据-->
              <ProductList v-if="productNum==0" @callBack="callBack"></ProductList>
              <PartsList v-if="productNum==1" v-show="isShow1"></PartsList>
              <PartsList1 v-if="productNum == 2" v-show="isShow"></PartsList1>
            <!--表格数据结束-->
          </div>
       </div>
    </div>
  </div>
</template>

<script>
  import ProductList from "./projectList.vue" //产品列表
  import PartsList from "./partsList.vue" //配件列表
  import PartsList1 from "./partsList1.vue" //查看配件列表
  export default {
    data(){
      return{
        productIndex:["产品表","配件表"],  //页面显示的切换
        productNum:0,    //显示切换
        isShow1:true,  //2显示
        isShow:false,      //3显示
      }
    },
    components:{
        ProductList,PartsList,PartsList1
    },
    methods:{
      product (Oneindex) {
        this.productNum = Oneindex;
        this.isShow1 = true;
        this.isShow = false;

      },
      callBack(num){
        this.productNum =num ;
        this.isShow1 = false;
        this.isShow = true;
      },
      created(){

      }
    }

  }
</script>

<style scoped lang="scss">
  #app{
    width:100%;
    position:relative;
  }

  .content{
    background:rgba(229,233,242,1);
  }
  .el-menu-demo{
    background: #FFFFFF;
    .el-menu-item{
      background: #FFFFFF;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(136,136,136,1);
      border-bottom: 5px solid transparent;
    }
    .el-menu-item:hover{
      background: #FFFFFF;
      font-size:14px;
      font-family:PingFangSC-Medium;
      color:rgba(230,88,49,1);
      border-bottom: 5px solid rgba(230,88,49,1);
    }
    .el-menu-item.active{
      background: #FFFFFF;
      font-size:14px;
      font-family:PingFangSC-Medium;
      color:rgba(230,88,49,1);
      border-bottom: 5px solid rgba(230,88,49,1);
    }
  }



</style>
