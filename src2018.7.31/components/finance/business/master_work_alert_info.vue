<template>
  <div id="app">
    <div class="container">
      <h3>{{dataObj.title}}</h3>
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
            <li>服务区域：{{dataObj.serveArea}}</li>
            <li>服务工种:
              {{dataObj.workerType}}
            </li>
            <li>工作状态:{{dataObj.workStatus}}</li>
            <li>提点:{{dataObj.remindedSet}}</li>
            <li>总单数:{{dataObj.overallOrderSum}}</li>
            <li>已完成:{{dataObj.completeOrder}}</li>
            <li>待服务:{{dataObj.stayServe}}</li>
            <li>异常挂起:{{dataObj.unusual}}</li>
            <li>异常结数:{{dataObj.unusualFinish}}</li>
            <li>平均分:{{dataObj.favourable}}</li>
            <li>准时率:{{dataObj.punctual}}</li>
            <li>完成率:{{dataObj.accomplish}}</li>
            <li>投诉工单:{{dataObj.complainOrder}}</li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
      </div>
    </div>
    <p class="closeX" @click="close(detailedIsShow)"></p>
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
        dataObj:{       //alertinfo
          title:"师傅业务详情",
          netDrop:"网点", //
          serveArea:"南山区",
          workStatus:"空闲中",
          remindedSet:"提点设置",
          overallOrderSum:"12",
          completeOrder:"1220",
          stayServe:"121212",
          unusual:"121212",
          unusualFinish:"66",
          favourable:"55%",
          punctual:"55%",
          accomplish:"55%",
          complainOrder:"11",
          workerType:"电工", //服务工种

        },
      }
    },
    methods: {
      close(isShow){
        isShow.isShow=false;
      }
    },
    mounted() {

    },
    watch:{

    },
    created(){
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  .el-input, .el-input__inner{
    width:auto;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    overflow-y: auto;
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
      background:url(../../../../static/images/position.png) center center no-repeat;
      background-size:100% 100%;

    }
  }
  .closeX{
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
</style>

