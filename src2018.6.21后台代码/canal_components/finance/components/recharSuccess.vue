<template>
    <div id="app">
      <section class="container">
        <div class="icon_box">
         <!--<i class="success_icon"></i>-->
          <img :src="'/static/images/'+$store.state.accountOverviewAlertData.image+'.png'" alt="">
          <br>
          <h3>{{$store.state.accountOverviewAlertData.successTitle}}</h3>
        </div>

        <p>
          {{$store.state.accountOverviewAlertData.successDescribe}}
        </p>

        <el-button type="primary" @click="$store.commit('closeIsOpen')"> 知道了 </el-button>
      </section>
    </div>
</template>
<script>
//  renovate
    export default {

        data() {
            return {

            }
        },
        methods: {

        },
        created() {

        }
    }
</script>
<style scoped lang="scss">
  i{
    display: block;
    width:40px;
    height:40px;
  }
  #app{
    height:100%;
    display: flex;
    .container{
        display: flex;
        width:409px;
        margin:auto;
        /*background:red;*/
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      .icon_box{
        width:100%;
        text-align: center;
        .success_icon{

        }
        h3{
          margin-top:28px;
          margin-bottom:45px;
          font-weight: normal;
          font-size:20px;
          font-family:PingFangSC-Regular;
          color:rgba(230,88,49,1);

        }
      }
      p{
        text-align: center;
        width:100%;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:20px;
        margin-bottom:6em;
      }
      button{
        padding-left:3em;
        padding-right:3em;

      }

    }
  }

</style>


