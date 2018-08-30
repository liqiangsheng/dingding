<template>
  <div id="app" class="channel-app-box">
    <div class="container">
      <h4>位置：{{position}}</h4>
      <div class="selector_list">
          <ul>
            <li><p>【活动】</p><p>2017年11月2号</p></li>
            <li v-html="text"></li>
          </ul>
        <ul class="bottom">
          <li><p>【活动】</p><p>2017年11月2号</p></li>
          <li v-html="text2"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components:{
    },
    data() {
      return {
        position:"消息详情",
        text:"叮叮快修新店开张</br>油烟机保养只需要88元！</br>给心情的家电洗个澡吧！</br>家具保养，全场低价5折 <a href='www.baidu.com'>http:www.baidu.com</a>",
        text2:"叮叮快修新店开张,叮叮快修新店开张叮叮快修新店开张叮叮快修新店开张叮叮快修新店开张叮叮快修新店开张叮叮快修新店开张叮叮快修新店开张"
      }
    },
    methods: {

    },
    mounted() {
    },
    created(){

    }
  }
</script>
<style>
  .el-dialog__wrapper{
    z-index: 9999 !important;
  }
  .el-message-box__wrapper{
    z-index: 9999 !important;
  }
</style>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";
  #app{

    .container{
      >.selector_list{
        margin-top:0;
        >ul{
          /*width:40%;*/
          overflow: hidden;
          >li{
            overflow: hidden;
            line-height: 3em;
            >P{
            float:left;
            }
            >p:last-of-type{
              transform:translateX(100%);
            }
          }
        }
        .bottom{
          border-top:1px solid #000;
          border-bottom:1px solid #000;
        }
      }
    }
  }

  .confirm_btn{
    margin-left:50%;
    transform:translateX(-50%);
  }



  h4{
    font-weight: normal;
    padding:15px 5px;
    color:#000;
    background: #ecc2ff;
  }
</style>








