<template>
    <div id="app">
      <div>
        <div id="detailAlert"><!--背阴-->
        </div>
        <div id="detailAlert_box">
          <div class="el-message-box__title">
            <span>{{$store.state.accountOverviewAlertData.title}}</span>
            <i class="el-message-box__close el-icon-close" @click="$store.commit('closeIsOpen')"></i>
          </div>

          <component :parentData="parentData" :is="parentData.isShow?'recharSuccess':'rechargeList'"></component>

        </div>
      </div>
    </div>
</template>
<script>

  import rechargeList from "./rechargeList"
  import recharSuccess from "./recharSuccess"

    export default {
    components:{
          rechargeList,
          recharSuccess
    },

        data() {
            return {
              parentData:{
                isShow:false,
              }
            }
        },
        methods: {

        },
      computed:{
        getPaState(){
          return this.$store.state.accountOverviewAlertData.paState=="2"?'recharSuccess':'rechargeList';
        }
      },
        created() {

        },
      watch:{

      }
    }
</script>

<style scoped lang="scss">
  p,div,ul,li,span,h3{
    font-family:PingFangSC-Regular;
  }
  #detailAlert{
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
  #detailAlert_box{
    width: 80%;
    height: 75%;
    background-color: #fff;
    position: absolute;
    left: 11%;
    top:12%;
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
      line-height:48px;
      text-align: center;
    }
  }
  #app{
    font-size: 62.5%;
    .list_name{
      width:7em;
      margin-right:2em;
      color:#5E6D82;
    }

  }

</style>
<style lang="scss">
  #el-tabs{
    >.el-tabs--border-card{
      > .el-tabs__header{
        > .el-tabs__nav-wrap{
          >.el-tabs__nav-scroll {
            >.el-tabs__nav{
              >.el-tabs__item.is-active{
                color:#000;
              }
            }
          }
        }
      }
    }
  }
</style>


