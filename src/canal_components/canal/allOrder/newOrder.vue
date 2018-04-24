<template>
  <div>
  <AddAlter @isClose="isClose" v-if="addShow" @pejianzengjia="pejianzengjia"></AddAlter>
    <BianjiAlter @isClose="isClose" v-if="bianjiShow" @pejianzengjia="pejianzengjia" :bianjiData="bianjiData"></BianjiAlter>
  <div class="newOrder">

    <div class="tab">
      <el-menu theme="dark" class="el-menu-demo" mode="horizontal" >
        <el-menu-item  v-for="(item,index) in tabList"  :key="index" index="index" @click="tabClick(item,index)" >
          {{item}}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="chanpin">
         <p class="chanpinP"><span></span>产品信息</p><br>
         <el-button type="success" @click="addProduct">添加产品</el-button>

          <div class="alertOne" v-if="peijiankuang">
            <!--表格数据-->
            <table>
              <thead>
              <tr class="theads">
                <th v-for="(item,index) in theadsName">{{item}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in tableListData" id="trHover">
                <!--序号-->
                <td>
                  {{index+1}}
                </td>
                <!--产品名称-->
                <td style="flex-grow:3">
                  {{item.str}}
                </td>
                <!--品牌-->
                <td>
                  {{item.input1}}
                </td>
                <!--型号-->
                <td>
                  {{item.input2}}
                </td>
                <!--数量-->
                <td>
                  {{item.num}}
                </td>
                <!--检测费-->
                <td>
                  {{}}
                </td>
                <!--服务费-->
                <td>
                  {{}}
                <!--操作-->
                <td>
                  <span class="track" @click="detailClick(item,index)">删除</span>
                  <span class="detail" @click="bianjiClick(item,index)">编辑</span>
                </td>
              </tr>
              </tbody>
            </table>
            <!--表格数据结束-->
            <ul class="feiyongList">
              <li>检测费小计：</li>
              <li>服务费小计：</li>
              <li>预估价：</li>
            </ul>

          </div>
    </div>
    <div class="yuyue">
      <p class="yuyueP"><span></span>预约信息</p><br>
      <ul>
        <li>　　联系人<span>*</span><el-input v-model="input1" placeholder="请输入内容" style="width: 25%"></el-input></li>
        <li>联系人手机<span>*</span><el-input v-model="input2" placeholder="请输入内容" style="width: 25%"></el-input> 　　　<b style="font-weight:100; margin: 0 20px">座机</b><el-input v-model="input6" placeholder="请输入内容" style="width: 20%"></el-input></li>
        <li>　服务地区<span>*</span><el-input v-model="input3" placeholder="请输入内容" style="width: 50%"></el-input></li>
        <li>　详细地址<span>*</span><el-input v-model="input4" placeholder="请输入内容" style="width: 25%"></el-input></li>
        <li id="shijian">　预约时间<span>*</span>
          <!--<Col span="12" style="display: inline-block">-->
          <DatePicker type="date" placeholder="请选择日期" style="width: 24.6%;height: 36px" v-model="input5"></DatePicker>
          <!--</Col>-->
        </li>

      </ul>
    </div>
    <ul class="zhibao">
    <li class="zhibaoP"><span></span><b style="float: left;font-weight: 100">质保状态</b>
      <p @click="danxuan1"><el-button>保内</el-button>
        <img src="/static/images/danxuan.png"  v-show="danxuanShow1"></p>
      <p @click="danxuan2"><el-button>保外</el-button><img src="/static/images/danxuan.png" v-show="danxuanShow2"></p>
    </li>

  </ul>
    <ul class= "jinji">
      <li class="jinjiduP"><span></span><b style="float: left;font-weight: 100">紧急程度</b>
        <p @click="danxuan3"><el-button>正常</el-button><img src="/static/images/danxuan.png" v-show="danxuanShow3"></p>
        <p @click="danxuan4"><el-button>加急</el-button><img src="/static/images/danxuan.png" v-show="danxuanShow4"></p>
      </li>

    </ul>
    <div class="ziqudao">
      <p class="ziqudaoP">　　子渠道
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="(item,index) in ziqudao"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </p>
      <br>
      <p class="qitaP"><span>　　　其他</span><el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="qita">
      </el-input>
      </p>
      <p class="addTijiao" style="width: 90%;margin:20px 8%;">
        <el-button type="primary" @click="addTijiao" style="width: 20%">提交</el-button>
      </p>
    </div>
  </div>
  </div>
</template>
<script>
  import AddAlter from "./orderPage/alertInfos/addAlert.vue"
  import BianjiAlter from "./orderPage/alertInfos/bianjiAlert.vue"
  export default {
    components:{
      AddAlter,BianjiAlter
    },
    data() {
      return {
        bianjiShow:false, //编辑唐匡
        theadsName:["序号","产品名称","品牌","型号","数量","检测费","服务费","操作"],
        input1:"", //　联系人
        input2:"",//　联系人手机
        input3:"",//　服务地区*
        input4:"",//　详细地址*
        input5:"",//　　预约时间*
        input6:"",//　座机
        tabList:["填写工单","批量导入"], //头部数据
        qita:"",//其他
        ziqudao:["牛逼"],//子渠道
        value:"",//子渠道
        danxuanShow1:false,  //保内单选
        danxuanShow2:false,//保外单选
        danxuanShow3:false,//正常单选
        danxuanShow4:false,//加急单选
        addShow:false,      //增加配件弹框
        peijiankuang:false,  //配件显示宽
        tableListData:[], //展示数据
        bianjiData:{}, //编辑数据
      }
    },
    created(){

    },
    methods: {
      addTijiao(){
        if(this.peijiankuang == false){
          alert("请添加产品");
          return;
        }
           if(this.input1 == ""){
             alert("请填写联系人");
             return;
           }
        if(this.input2 == ""){
          alert("请填写联系人手机");
          return;
        }
        if(this.input3 == ""){
          alert("请填写服务地区");
          return;
        }
        if(this.input4 == ""){
          alert("请填写详细地址");
          return;
        }
        if(this.input5 == ""){
          alert("请填写预约时间");
          return;
        }
        if(this.danxuanShow1 == false&&this.danxuanShow2 == false){
          alert("请选择质保状态");
          return;
        }
        if(this.danxuanShow3 == false&&this.danxuanShow4 == false){
          alert("请选择紧急程度");
          return;
        }

      },
      detailClick(v,i){  //删除
        this.tableListData = this.tableListData.filter((item,index)=>{
//
          return v.fenlei != item.fenlei;
        })
        if(this.tableListData.length <= 0){
          this.peijiankuang = false;
        }

      },
      bianjiClick(v,i){  //编辑

          this.bianjiData = v;
          this.bianjiShow = true;
      },
      pejianzengjia(obj){
        this.peijiankuang = true;
        if(this.tableListData.length > 0){
          this.tableListData.forEach((item)=>{
            if(item.str == obj.str&&obj.input1 == item.input1&&obj.input2 == item.input2){
              item.num += obj.num;
            }else{
              this.tableListData.push(obj)
            }
          })
        }else{
          this.tableListData.push(obj)
        }

      },
      isClose(val){//增加配件弹框
        this.addShow = val;
        this.bianjiShow = val;
      },
      addProduct(){//添加产品
          this.addShow = true;
      },

      danxuan1(){//保内单选
        this.danxuanShow1=true ; //保内单选
        this.danxuanShow2=false;//保外单选
      },
      danxuan2(){//保外单选
        this.danxuanShow1=false;  //保内单选
        this.danxuanShow2=true ;//保外单选
      },
      danxuan3(){//正常单选
        this.danxuanShow3=true; //保内单选
        this.danxuanShow4=false;//保外单选
      },
      danxuan4(){//加急单选
        this.danxuanShow3=false;  //保内单选
        this.danxuanShow4=true ;//保外单选

      },
//
    },
    mounted() {
    },
  }
</script>
<style>
  #shijian .ivu-input{
    height: 36px !important;
    border: 1px solid #bfcbd9
  }
</style>
<style scoped lang="scss">
  .newOrder{
    position: relative;
    overflow-y: auto;
      .el-menu-demo {
        background: #FFFFFF;
        margin-bottom: 2px;
        .el-menu-item {
          background: #FFFFFF;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(136, 136, 136, 1);
          border-bottom: 5px solid transparent;
        }
        .el-menu-item:hover {
          background: #FFFFFF;
          font-size: 14px;
          font-family: PingFangSC-Medium;
          color: rgba(230, 88, 49, 1);
          border-bottom: 5px solid rgba(230, 88, 49, 1);
        }
      }
    .chanpin{
      width: 100%;
      border-top: 3px solid #F1F4F5;
      margin-bottom: 15px;
      overflow: hidden;
      .alertOne{
        width: 100%;
        padding: 10px;
         table{
            width: 100%;
           thead{
             width: 100%;
             background:rgba(229,233,242,1);
             tr{
               width: 100%;
               display: flex;
               th{
                 flex: 1;
                 height:52px;
                 font-size:14px;
                 font-family:PingFangSC-Regular;
                 color:rgba(57,57,57,1);
                 line-height:52px;
                 text-align: center;
               };
               th:nth-child(2){
                 flex-grow:3;
               }
             }
           }
           tbody{
             width: 100%;

             tr{
               width: 100%;
               display: flex;
               border-left: 1px solid #bfcbd9;
               background:rgba(255,255,255,1);
               td{
                 height:46px;
                 flex: 1;
                 line-height:46px;
                 text-align: center;
                 border: 1px solid #bfcbd9;
                 border-bottom: 0;
                 border-left: 0;
                .track,.detail{
                   cursor: pointer;
                   color:rgba(32,160,255,1);
                 }
                 .track:hover,.detail:hover{
                   color:purple;
                 }
               }
             }
             tr:last-child{
               border-bottom: 1px solid #bfcbd9;
             }
             tr:hover{
               background: #DBF0FF;
             }
           }
          }
      }
      .feiyongList{
        width: 100%;
        height: 44px;
        background:rgba(255,247,204,1);
        padding-left:50% ;
        li{
          height: 44px;
          line-height: 44px;
          float: left;
          margin: 0 5%;
        }
        li:last-child{
          color: #EA3047;
        }
      }
      .chanpinP{
        width: 100%;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:22px;
        span{
          display:inline-block;
          width:4px;
          height:18px;
          background:rgba(230,88,49,1);
          margin: 0 5px;
          transform: translateY(2px);
        }
      }
      .el-button{
        margin: 20px 5%;

      }
      .alertOne{
        margin: 0 10px;
      }
    }
    .yuyue{
      widows:100;
        .yuyueP{
          width: 100%;
          height:22px;
          font-size:16px;
          font-family:PingFangSC-Regular;
          color:rgba(136,136,136,1);
          line-height:22px;
          margin-bottom: 15px;
          span{
            display:inline-block;
            width:4px;
            height:18px;
            background:rgba(230,88,49,1);
            margin: 0 5px;
            transform: translateY(2px);
          }

      }
      ul{
        width: 100%;
        li{
          width: 100%;
          margin-bottom: 15px;
          padding-left: 10px;
          span{
            color: #EA5413;
            margin-right: 20px;
          }
        }
      }
    }
    .zhibao{
      width:100%;
      overflow: hidden;
      margin-bottom: 15px;
      .zhibaoP{
        margin-bottom: 15px;
        width: 100%;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:22px;
        margin-bottom: 15px;
        span{
          display:inline-block;
          width:4px;
          height:18px;
          background:rgba(230,88,49,1);
          margin: 0 5px;
          transform: translateY(2px);
          float: left;
        }
        p{
          width: 25%;
          margin-left: 20px;
          float: left;
          position: relative;
          .el-button{
             width: 100%;
          }
          img{
            display: inline-block;
            position: absolute;
            right: 0;
            top:0;
          }
        }

      }
    }
    .jinji{
      width:100%;
      overflow: hidden;
      margin-bottom: 15px;
      .jinjiduP{
        margin-bottom: 15px;
        width: 100%;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:22px;
        margin-bottom: 15px;
        span{
          display:inline-block;
          width:4px;
          height:18px;
          background:rgba(230,88,49,1);
          margin: 0 5px;
          transform: translateY(2px);
          float: left;
        }
        p{
          position: relative;
          width: 25%;
          margin-left: 20px;
          float: left;
          .el-button{
            width: 100%;
          }
          img{
            display: inline-block;
            position: absolute;
            right: 0;
            top:0;
          }
        }

      }
    }
    .ziqudao{
      width: 100%;
      padding: 0  0 0 15px;

      .qitaP{
        span{
          display: inline-block;
          float: left;
        }
        width: 100%;
        overflow: hidden;
        margin-bottom: 15px;
        .el-textarea{
          display: inline-block;
          float: left;
          width: 25%;
          margin-left: 20px;
        }
      }
      .ziqudaoP{
        overflow: hidden;
        margin-bottom: 15px;
        width: 100%;
        .el-select{
          margin-left: 20px;
          width: 25%;
        }

      }
    }

  }

</style>


