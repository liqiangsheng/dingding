<template>
  <!--查看更多-->
  <div>
      <div class="lookAtMoreAlter"><!--背阴--> </div>
      <div class="lookAtMoreAlter_box">
        <div class="el-message-box__title">
          <span>常用产品</span>
          <i class="el-message-box__close el-icon-close" @click="close"></i>
        </div>
        <div id="lookAtMoreAlterBox">
          <ul class="lookAtMoreOne">
            <li v-for="(item,index) in fenleiName" :class="{activeFenlei:FenleiIndex==index}" @click="fenleiClick(item,index)">{{item.name}}</li>
          </ul>
          <ul class="lookAtMoreTwo">
              <li v-for="(item,index) in fenleiList">
                <img src="/static/images/weixuanzhong.png"  @click="fenleiListClick(item,index)">
                <img :src="item.imgPath" v-if="FenleiActiveIndex==index&&item.bool">
                <span class="span1">{{item.serviceBrand}}　{{item.serviceModel}}</span>
                <span class="span2">{{item.serviceFullName}}</span>
                <span class="span3" @click="deleteHistory(item,index)" v-show="FenleiActiveIndex==index&&item.bool">删除</span>
              </li>
            <Pagination
              :data="pageData"
              :getTableList="getData"
              :paramsData="paramsData"
              :tableListData="fenleiList"
            ></Pagination>
          </ul>

        </div>
         <div class="foot">
           <el-button style="width: 140px" @click="close">取消</el-button>
           <el-button type="primary" style="width: 140px" @click="add()">添加</el-button>
         </div>
      </div>
  </div>
</template>
<script>
//  import Pagination from "../../../../../components/commInfo/pageing.vue"
  export default {
    components:{
//      Pagination,
    },
    props:["QuDaoId"],
    data() {
      return {
        objData:{},//添加的数据
       addData:"", //添加的数据
        xiaoqudaoid:"",
        fenleiID:"001",
        fenleiList:[], //数据
        fenleiName:[], //分类
        FenleiIndex:0,
        FenleiActiveIndex:-1,
        pageData:{ //分页
          size:20,
          startRow:0,
          total:0,
          pageTotal:0,
        },
        abcdefg:[],
      }
    },
    watch:{
    },
    created(){
//      this.xiaoqudaoid=this.$store.state.xiaoqudaoId?this.$store.state.xiaoqudaoId:JSON.parse(sessionStorage.getItem("userInfo"))[0].id

      // 分类
      let url=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(res=>{
          if(res.data.code === "0000"){
                  this.fenleiName = res.data.result;
          }else{
            this.$queryFun.successAlert.call(this,res.data.error);
          }
      });
      this.getData(this.paramsData());

    },
    methods: {
      paramsData(){ //传参
           return {params:{
             "page":JSON.stringify(this.pageData.startRow),
             "rows":JSON.stringify(this.pageData.size),
             "serviceId":this.fenleiID,
             "type":"1",
           }}
      },

      getData(params){ //获取数据
        let ControllerUrl = `${this.$apidomain}/officialProductLabelController/all`;
//        let ControllerUrl = `${this.$apidomain}/officialProductLabelController/all?serviceId=${id}`;
        this.$http.get(ControllerUrl,params).then(res=>{
          if(res.data.code === "0000"){
            this.pageData.total = res.data.result.total;
            this.pageData.pageTotal =res.data.result.pages;
            res.data.result.list.forEach((v,i)=>{
              v.bool = false;
              v.imgPath = "/static/images/xuanzhong.png";
            });
            this.fenleiList =  res.data.result.list;
          }else{
            this.$queryFun.successAlert.call(this,res.data.error);
          }
        })
      },
      close(){ //传值给父亲组件
        let isbool = false;
         this.$emit("isClose",isbool)
      },
      fenleiClick(v,i){ //一级分类
         this.FenleiIndex = i;
         this.fenleiID = v.id;
        this.addData = "";
         this.getData(this.paramsData());
      },
      fenleiListClick(v,i){ //选中的单
          this.FenleiActiveIndex =i;
          v.bool = true;
          this.addData = v;
      },
      deleteHistory(v,i){ //删除
        let detailUrl = `${this.$apidomain}/officialProductLabelController/delete?serviceId=${v.serviceId}&serviceBrand=${v.serviceBrand}&serviceModel=${v.serviceModel}&type=1`;
        this.$http.get(detailUrl).then(res=>{
          if(res.data.code === "0000"){
            this.addData = "";
            this.$queryFun.successAlert.call(this,res.data.result,"1");
            this.getData(this.paramsData());
          }else{
            this.$queryFun.successAlert.call(this,res.data.error);
          }
        })

      },
      add(){//添加
        if(!this.addData){
          return this.$queryFun.successAlert.call(this,"请选择添加的产品");
        }
        let bbb = this.addData.serviceId.substring(0, this.addData.serviceId.length - 3);
        this.$emit("flaga",1);
        let urlThree = this.$common.apidomain + "/articleinfo/findChannelListServiceInfo?labelId=" + bbb + "&areaId=" + this.$store.state.cityIdid1 + "&relevanceKey=" + this.QuDaoId;
          this.$http.get(urlThree).then(res=>{
            let a,b,c,d,e,f;
            let aaa =res.data.result.serviceInfo.labelId.substring(3,-3)
            if(res.data.result.serviceInfo.labelId.length == 18){
              a = res.data.result.serviceInfo.labelId.substring(3,-3);
              b=res.data.result.serviceInfo.labelId.substring(6,-6);
              c=res.data.result.serviceInfo.labelId.substring(9,-9);
              d=res.data.result.serviceInfo.labelId.substring(12,-12);
              e=res.data.result.serviceInfo.labelId.substring(15,-15);
              f=res.data.result.serviceInfo.labelId.substring(18,-18);
              this.abcdefg =[a,b,c,d,e,f];
            }else if(res.data.result.serviceInfo.labelId.length == 15){
              a = res.data.result.serviceInfo.labelId.substring(3,-3);
              b=res.data.result.serviceInfo.labelId.substring(6,-6);
              c=res.data.result.serviceInfo.labelId.substring(9,-9);
              d=res.data.result.serviceInfo.labelId.substring(12,-12);
              e=res.data.result.serviceInfo.labelId.substring(15,-15);
              this.abcdefg =[a,b,c,d,e];
            }
            else if(res.data.result.serviceInfo.labelId.length == 12){
              a = res.data.result.serviceInfo.labelId.substring(3,-3);
              b=res.data.result.serviceInfo.labelId.substring(6,-6);
              c=res.data.result.serviceInfo.labelId.substring(9,-9);
              d=res.data.result.serviceInfo.labelId.substring(12,-12);
              this.abcdefg =[a,b,c,d];
            }else if(res.data.result.serviceInfo.labelId.length == 9){
              a = res.data.result.serviceInfo.labelId.substring(3,-3);
              b=res.data.result.serviceInfo.labelId.substring(6,-6);
              c=res.data.result.serviceInfo.labelId.substring(9,-9);
              this.abcdefg =[a,b,c];
            }else if(res.data.result.serviceInfo.labelId.length == 6){
              a = res.data.result.serviceInfo.labelId.substring(3,-3);
              b=res.data.result.serviceInfo.labelId.substring(6,-6);
              this.abcdefg =[a,b];
            }
            if(res.data.code === "0000"){
              this.objData.numData = this.abcdefg;
              this.objData.fenlei = this.abcdefg[0];
              this.objData.serviceBrand = this.addData.serviceBrand;
              this.objData.serviceModel = this.addData.serviceModel;
              this.objData.id = this.addData.serviceId;
              this.objData.serviceInfo = res.data.result.serviceInfo;
              this.objData.size = 1;
              this.objData.tags =  res.data.result.serviceInfo.tags;
//              if("001"== this.fenleiID){
//                this.yijiName = "家电清洗";
//              }else if("002"== this.fenleiID){
//                this.yijiName = "家电维修";
//              }else if("003"== this.fenleiID){
//                this.yijiName = "手机维修";
//              }else if("004" == this.fenleiID){
//                this.yijiName =  "家居维修";
//              }else if("005"== this.fenleiID){
//                this.yijiName = "开锁修锁";
//              }else if("006"== this.fenleiID){
//                this.yijiName = "管道疏通";
//              }else if("007"==this.fenleiID){
//                this.yijiName = "灯具线路";
//              }else if("008"== this.fenleiID){
//                this.yijiName = "卫浴洁具";
//              }else if("009"== this.fenleiID){
//                this.yijiName = "安装服务";
//              }
//              this.objData.yijiName = this.yijiName;
              this.$emit("pejianzengjia",this.objData);
              this.$queryFun.successAlert.call(this,"添加成功");
              this.close();
            }else{
              return this.$queryFun.successAlert.call(this,res.data.error);
            }
          })
      },
    },
    mounted() {
    },
    updated(){

    }
  }
</script>
<style scoped lang="scss">
  .lookAtMoreAlter{
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
  .lookAtMoreAlter_box{
    width: 840px;
    height: 500px;
    background-color: #fff;
    position: absolute;
    left: 18%;
    top:20%;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:10%;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 14px;
      top:14px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:60px;
      text-align: center;
    }
  }
  #lookAtMoreAlterBox{
    width: 100%;
    height: 380px;
    padding: 30px;
    .lookAtMoreOne{
      width: 100%;
      height: 36px;
      overflow: hidden;
      li:nth-child(1){
        margin-left: 0;
      }
      li{
        width: 80px;
        height: 36px;
        border: 1px solid #C0CCDA;
        border-radius: 4px ;
        float: left;
        margin-left: 10px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(94,109,130,1);
        line-height:36px;
        text-align: center;
      }
      li.activeFenlei{
        background:rgba(32,160,255,1);
        color: #FFFFFF;
        border-radius: 4px ;
      }
    }
    .lookAtMoreTwo{
      width: 100%;
      margin-top: 30px;
      height:240px;
      border: 1px solid #E0E6ED;
      overflow-y:auto ;
      li:last-child{
        border-bottom: none;
      }
      li{
        position: relative;
        padding: 0 12px;
        width: 100%;
        height: 44px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        line-height:44px;
        border-bottom: 1px solid #E0E6ED;
        img:nth-child(1){
          transform: translateY(2px);
          width: 16px;
          height: 16px;
          display: inline-block;
        }

        img:nth-child(2){
          position: absolute;
          left: 11px;
          top:12px;
          width: 17px;
          height: 17px;
          display: inline-block;
        }
      }
    }
    .span1{
      display: inline-block;
      width: 249px;
      margin-left: 12px;
    }
    .span2{
      display: inline-block;
      width: 350px;
    }
    .span3{
      display: inline-block;
      width: 50px;
      float: right;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(32,160,255,1)
    }
  }
  .foot{
    width: 100%;
    text-align: center;
  }
</style>


