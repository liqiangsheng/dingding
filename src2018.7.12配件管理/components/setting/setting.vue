<template>
  <!--设置-->
    <div id="setting">
       <ul>
         <li v-for="(item,index) in listData"  @click="setClick(index)">
           <span>{{item}}</span>
           <span><img src="../../assets/images/gobackOne.png"></span>
         </li>
       </ul>
      <div class="footer">
        <button @click="exitLogin">退出登录</button>
      </div>
      <signOutAlter v-if="signOutAlterShow" @isClose="isClose"></signOutAlter>
    </div>

</template>
<script>
  import signOutAlter from "./components/signOutAlter.vue" //退出框处
    export default {
        components:{
          signOutAlter
        },
        data() {
            return {
              listData:["网点信息","修改密码"],
              signOutAlterShow:false,
            }
        },
        methods: {
          setClick(i){ //网点详情或则改密码
            if(i == 0){
             this.$router.push({ path:"/dotInformation" })
            }else if(i == 1){
              this.$router.push({path:"/revisePassword"})
            }
          },
          exitLogin() {//退出登录
            console.log('退出登录')
            this.signOutAlterShow = true;
          },
          isClose(v){
            this.signOutAlterShow = v;
          }
        },
        created() {

        }
    }
</script>
<style scoped lang="less">
  #setting{
    position: absolute;
    left: 0;
    top:0;
    bottom: 0;
    right: 0;
    background:rgba(241,241,241,1);
    ul{
      margin-top: 0.3rem;
      width: 100%;
      background: #ffffff;
      padding:0 0.3rem;
      li{
        height:1rem;
        width: 100%;
        line-height: 1rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        border-bottom: 0.01rem solid rgba(241,241,241,1);
         span:nth-child(2){
           img{
             width: 0.54rem;
             height: 0.75rem;
             transform: translateY(0.1rem);
           }
           float: right;
           transform:rotate(180deg);
           display: inline-block;
           width: 1rem;
           height: 1rem;
         }
      }
    }
    .footer{
      width: 100%;
      height: 0.9rem;
      padding: 0 5%;
      position: absolute;
      left: 0;
      bottom:0.3rem ;
      button{
        border: 0;
        background:rgba(83,107,210,1);
        border-radius: 0.1rem;
        width: 100%;
        height: 0.9rem;
        font-size:0.36rem;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
      }
    }
  }
</style>


