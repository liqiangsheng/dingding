<template>
  <div>
      <div class="addAlert"><!--背阴-->
      </div>
      <div class="addAlert_box">
          <div class="el-message-box__title">
              <span>添加服务产品</span>
              <i class="el-message-box__close el-icon-close" @click="close"></i>
          </div>
          <ul class="list" id="addAlertList">
              <li>分类<span>*</span>
                <el-select v-model="fenlei" placeholder="请选择" style="width: 80%" @change="yijifenlei2">
                  <el-option
                    v-for="(item,index) in fenleiOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li id="productNub">产品<span>*</span>
                <el-cascader
                  style="width: 80%"
                  @change="changeSelector2"
                  :options="labeloptions"
                  :disabled="isKeXuan"
                  v-model="objOptions"
                  placeholder="请选择到最后一级"
                  :props="props"
                  filterable></el-cascader>
              </li>

            <li v-show="biaoqianShow">标签<span>*</span>
              <el-select v-model="biaoqian" multiple placeholder="请选择" style="width: 80%;" @change="biaoqianOne">
                <el-option
                  v-for="(item,index) in biaoqianOptions"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </li>

              <li>品牌<el-input v-model="input1" placeholder="选填" style="width: 35%;margin:0 5% 0 12px" ></el-input>型号<el-input v-model="input2" placeholder="选填" style="width: 35%"></el-input></li>
              <li></li>
              <li id="nunber">数量<span>*</span>
                <el-input-number v-model="num" @change="handleChange" :min="1"></el-input-number>
              </li>

          </ul>
        <div class="li">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="addProduct">添加</el-button>
        </div>
      </div>
  </div>

</template>
<script>
  export default {
    props:["cityId","QuDaoId"],
    components:{
    },
    data() {
      return {
        maxNum:1, //最大数值
        biaoqianShow:false,
        biaoqianOptions:[],//标签
        biaoqian:[],//标签
        input1:"",//品牌
        input2:"", //型号
        num:1, // 选择数量
        labeloptions:[],  //产品
        objOptions:[],//产品分类
        isKeXuan:true, //禁用
        fenlei:"", //分类
        fenleiOptions: [], //分类选择
        props: {  //子分类选择
          value: 'a',
          label: "b",
          children: 'beans'
        },
        objData:{},//存储的总数据
        str:[],
        price1:"", //上门检测费
        price2:"", // 服务费
        yijiName:"",//一级分类名字
        moziID:"", //末子级ID
        serviceInfo:{},
       }

    },
    methods: {
      biaoqianOne(){ //标签
        console.log(this.biaoqian)
      },
      addProduct(){ //添加
             if(this.fenlei == ""){
               alert("请选择分类");
               return ;
             }
            if(this.objOptions.length <= 0){
              alert("请选择产品");
              return ;
            }
        if(this.biaoqianShow == true){
          if(this.biaoqian.length <= 0){
            alert("请选择标签");
            return ;
          }
        }
        if(this.num < 1){
          alert("数量不得小于0");
          return ;
        }
        this.objData.id = this.serviceInfo.id;
        this.objData.tags = this.biaoqian?this.biaoqian.join(","):'';
        this.objData.fenlei = this.fenlei;
        this.objData.serviceBrand = this.input1;
        this.objData.serviceModel = this.input2;
        this.objData.size = this.num;
        this.objData.serviceInfo = this.serviceInfo;
             if("001"== this.fenlei){
               this.yijiName = "家电清洗";
             }else if("002"== this.fenlei){
               this.yijiName = "家电维修";
             }else if("003"== this.fenlei){
               this.yijiName = "手机维修";
             }else if("004" == this.fenlei){
               this.yijiName =  "家居维修";
             }else if("005"== this.fenlei){
               this.yijiName = "开锁修锁";
             }else if("006"== this.fenlei){
               this.yijiName = "管道疏通";
             }else if("007"==this.fenlei){
               this.yijiName = "灯具线路";
             }else if("008"== this.fenlei){
               this.yijiName = "卫浴洁具";
             }else if("009"== this.fenlei){
               this.yijiName = "安装服务";
             }
        this.objData.yijiName = this.yijiName;
        this.$store.dispatch("addDataCarter",this.objData);
        this.$emit("pejianzengjia",this.objData)
          alert("添加成功");
          this.close();

      },
      close(){ //传值给父级
         this.$emit("isClose",false)
      },
      handleChange(value) {
        console.log(value);
      },
      changeSelector2(val){
        this.moziID = val[val.length - 1];
        let urlThree=this.$common.apidomain+"/articleinfo/findChannelListServiceInfo?labelId="+this.moziID +"&areaId="+this.cityId+"&relevanceKey="+this.QuDaoId;
        this.$http.get(urlThree).then((res)=>{
          if(res.data.code === "0000"){
            this.serviceInfo = res.data.result.serviceInfo;
            if(this.serviceInfo.isSecondPayment == "1"){ //2口价
              this.maxNum = 1;
            }else if(this.serviceInfo.isSecondPayment == "0"){//1口价
              this.maxNum = 999999999999;
            }
            this.biaoqianOptions = [];
            if(res.data.result.serviceInfo.tags){
              this.biaoqianShow = true;
              this.biaoqianOptions  = res.data.result.serviceInfo.tags.split(",");
            }else{
              this.biaoqianShow = false;
            }
          }else{
            alert(res.data.error)
          }
        });
      },
      yijifenlei2(id){ //分类产品
          let urlTwo=this.$common.apidomain+'/articleinfo/findlabelbusinessbyflabel?id='+id;
          this.$http.get(urlTwo).then(res=>{
            if(res.data.code === "0000"){
              this.isKeXuan = false;
              this.labeloptions=[];
              this.labeloptions.push(res.data.result);
            }
          })
      },
      quxiao(){ //取消
        this.isKeXuan=true; //禁用
         this.fenlei="";//分类
        this.input1 = "";
        this.input2 = "";
        this.num = 1;
        this.objOptions = [];
        this. close();
      },

    },
    mounted() {
    },
    created(){
      let url = this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(res=>{
        if(res.data.code === "0000"){
             this.fenleiOptions = res.data.result;
        }
      });
    }
  }
</script>

<style>
#productNub  .el-input{
  width: 100%;
}
#productNub  .el-cascader .el-cascader__label{
  line-height: 36px !important;
}
 #nunber .el-input-number__decrease{
    left: 0;
   border-right: 1px solid #bfcbd9;
  }
 #nunber .el-input__inner{
    padding: 3px 10px 3px 15px;
   text-align: center;
  }

</style>
<style scoped lang="scss">

  .addAlert{
    width: 100%;
    background: black;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:2007;
    opacity: 0.2;
  }
  .addAlert_box{
    width: 50%;
    height: 50%;
    background-color: #fff;
    position: absolute;
    left: 25%;
    top:24%;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:7%;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 10px;
      top:10px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:36px;
      text-align: center;
    }
  }
  .list{
    overflow-y: auto;
    width: 100%;
    height: 93%;
    padding: 30px;
    position: relative;
    li{
      width: 100%;
      margin-bottom: 20px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(0,0,0,1);
      line-height:36px;
      span{
        color: #E65831;
      }
    }

  }
  .li{
    width: 100%;
    position: absolute;
    bottom: 10px;
    left: 0;
    text-align: center;
    .el-button{
      width: 30%;
    }
  }
</style>








