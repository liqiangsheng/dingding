<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{detailedIsShow.title}}  <p class="closeX" id="closeX" @click="close(detailedIsShow)"></p></h3>
      <div class="content">
        <div class="left_info">
          <div class="title">
            师傅业务信息
            <div class="position_icon">
                 <i ></i>
              查看师傅位置
            </div>

          </div>
          <ul>
            <li>服务区域：{{areas|listshow}}</li>
            <li>服务工种: {{skills|listshow}}
            </li>
            <li>工作状态:{{dataObj.workState|showWorkState}}</li>
            <li>总单数:{{dataObj.allOrderCount}}</li>
            <li>已完成:{{dataObj.completeCount}}</li>
            <li>待服务:{{dataObj.waitService}}</li>
            <li>异常挂起:{{dataObj.abnormalHangUp}}</li>
            <li>异常结款:{{dataObj.abnormalMoney}}</li>
            <li>平均分:{{dataObj.applauseRate}}</li>
            <li>准时率:{{dataObj.punctualityRate}}</li>
            <li>完成率:{{dataObj.completeRate}}</li>
            <li>投诉工单:{{dataObj.complainOrder}}</li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
      </div>
    </div>

    <div class="btn">
      <button @click="close(detailedIsShow)">关闭</button>
    </div>
  </div>
</template>
<script>
  export default {
    props:["detailedIsShow"],
    data(){
      return{
        dataObj:{},
        areas:[],
        skills:[],
      }
    },
    created(){
      let url=this.$apidomain+"/masterinfo/finddetail?id="+this.detailedIsShow.id;
      this.$http.get(url).then(res=>{
        let data = res.data;
        this.dataObj = data.result.masterInfo;
        this.areas = data.result.areas;
        this.skills = data.result.skills;
      })
    },
    methods: {
      close(isShow){
        isShow.isShow=false;
      },
      getIds(obj){
        let k = "";
        obj.forEach((e,i)=>{
          k += e.id+",";
        });
        k = k.substring(0,k.length-1);
        return k;
      },
    },
    mounted() {

    },
    watch:{

    }
  }
</script>
<style scoped lang="scss">
  @import "../../../../assets/styles/commButton";
  .el-input, .el-input__inner{
    width:auto;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:70%;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{
      overflow-y: auto;
      height: 85%;
      width:100%;
      display:flex;
      >div{
        flex:1;
        >ul{
        }
      }
      >.left_info{
        >.title{
          padding-left:10px;
        }
      }
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
    .consume_info{
      padding-bottom:200px;
      position:relative;
      >.title{
        padding-left:10px;
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
  }
  ul{
    padding-left:10px;
    list-style:none;
    >li{
      line-height:40px;
    }
  }
  .el-select-dropdown__item{
    line-height: 20px;
  }
  .position_icon{
    float:right;
    margin-right:50%;
    cursor:pointer;
    >i{
      display: inline-block;
      width:16px;
      vertical-align: middle;
      height:16px;
      background:url(../../../../../static/images/position.png) center center no-repeat;
      background-size:100% 100%;

    }
  }
  .closeX{
    background:url(../../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
</style>

