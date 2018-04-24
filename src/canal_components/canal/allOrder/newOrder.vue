<template>
  <div class="newOrder">
    <div class="tab">
      <el-menu theme="dark" class="el-menu-demo" mode="horizontal" >
        <el-menu-item  v-for="(item,index) in tabList" index="index" @click="tabClick(item,index)" >
          {{item}}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="chanpin">
         <p class="chanpinP"><span></span>产品信息</p><br>
         <el-button type="success">添加产品</el-button>
          <div class="alertOne">
            这里有个弹框
          </div>
    </div>
    <div class="yuyue">
      <p class="yuyueP"><span></span>预约信息</p><br>
      <ul>
        <li>　　联系人<span>*</span><el-input v-model="input1" placeholder="请输入内容" style="width: 25%"></el-input></li>
        <li>联系人手机<span>*</span><el-input v-model="input2" placeholder="请输入内容" style="width: 25%"></el-input> 　　　<b style="font-weight:100; margin: 0 20px">座机</b><el-input v-model="input6" placeholder="请输入内容" style="width: 20%"></el-input></li>
        <li>　服务地区<span>*</span><el-input v-model="input3" placeholder="请输入内容" style="width: 50%"></el-input></li>
        <li>　详细地址<span>*</span><el-input v-model="input4" placeholder="请输入内容" style="width: 25%"></el-input></li>
        <li>　预约时间<span>*</span><el-input v-model="input5" placeholder="请输入内容" style="width: 25%"></el-input></li>

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
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="qita">
      </el-input>
      </p>
    </div>

  </div>
</template>
<script>
  export default {
    components:{
    },
    data() {
      return {
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
      }
    },
    created(){

    },
    methods: {
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


