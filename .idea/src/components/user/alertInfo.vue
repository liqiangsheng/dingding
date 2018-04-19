<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{title}} <p class="closeX" @click="dataObj.close()" id="closeX"></p></h3>
      <div class="content">
          <div class="left_info">
            <p class="title">用户信息</p>
            <ul>
              <!--<li>微信名:{{dataObj.userInfo.nickName|placeholder}}</li>-->
              <li>城市:{{dataObj.userInfo.city |placeholder}}</li>
              <li>注册时间:{{dataObj.userInfo.createTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}</li>
              <li>近期登陆:{{dataObj.userInfo.loginTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}</li>
              <li>绑定手机:{{dataObj.userInfo.phoneNum |placeholderTel}}</li>
              <li>用户来源:{{dataObj.userInfo.sourceType| userSourceType}}</li>
              <li v-if="1==dataObj.userInfo.sourceType">渠道:{{dataObj.userInfo.source|placeholder}}</li>
              <li v-if="1==dataObj.userInfo.sourceType&&dataObj.referrerUserPhoneNum">推荐人手机号: {{dataObj.referrerUserPhoneNum|placeholderTel}}</li>
              <li>关注状态: {{dataObj.userInfo.attentionState | userAtentionState}}</li>
              <li>用户积分:{{dataObj.userInfo.cumulativeFraction|checkzero}} </li>
              <li>佣金:{{dataObj.userInfo.commission|checkzero}}元</li>
              <li v-if="2==dataObj.userInfo.state&&dataObj.userInfo.forbiddenCause">异常原因:{{dataObj.userInfo.forbiddenCause|placeholder}}</li>
              <li v-if="2==dataObj.userInfo.state&&dataObj.userInfo.forbiddenRemark">描述:{{dataObj.userInfo.forbiddenRemark|placeholder}}</li>
            </ul>
          </div>
          <div class="right_info">
             <p class="title">用户地址信息</p>
             <ul v-for="(item,index) in dataObj.sites">
              <li>{{item.linkmanPhoneNum|placeholderTel}}</li>
              <li>{{item.linkmanName|placeholder}}</li>
              <li>{{item.linkmanDetails|placeholder}}</li>
            </ul>
          </div>
      </div>
       <div class="consume_info">
            <p class="title">用户信息</p>
            <ul>
              <li>总单数 {{dataObj.orderTotal|checkzero}}</li>
              <li>已完成 {{dataObj.completeTotal|checkzero}}</li>
              <li>总消费金额 {{dataObj.consumeTotal|checkzero}}元</li>
            </ul>
        </div>
    </div>

  </div>
</template>

<script>

export default {
    props:["dataObj","title"],
      data(){
        return{

        }
      },
      methods: {

      },
      created(){
      }
}
</script>

<style scoped lang="scss">
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
        width:100%;
        display:flex;
        >div{

          flex:1;

          >ul{

            >li{
            }
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
</style>
