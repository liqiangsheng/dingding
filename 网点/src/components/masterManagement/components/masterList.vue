<template>
  <!--师傅列表-->
  <div id="masterList_box">
   <div class="search">
     <div id="search_box">
         <mt-search
           v-model="searchData"
           cancel-text="取消"
           placeholder="搜索">
         </mt-search>
     </div>
   </div>
    <div class="userList">
      <div v-for="(item,index) in userList" class="userListBox">
          <p class="userListOne"><span>{{item.name}}</span><span>{{item.state}}</span><span @click="seeOlder(item)">查看师傅工单></span></p>
        <p class="userListTwo"><span>城市:<b>{{item.city}}</b></span><span>已完成:<b>{{item.completed}}</b></span></p>
          <p class="userListThree">
            <span @click="masterDetailClick(item)"><img src="../../../assets/images/personal_information_icon.png">个人信息</span>
            <span><img src="../../../assets/images/telphone.png" alt="">联系师傅</span>
          </p>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      data() {
        return {
          searchData:"", //搜素内容
          userInfoData:"",//网点数据
          userList:[ //列表数据
            {
              "id":"0101003",
              name:"张侠名",
              state:"空闲中",
              city:" 深圳市",
              completed:"10",
            },
            {
              "id":"0101003",
              name:"张侠名",
              state:"空闲中",
              city:" 深圳市",
              completed:" 20",
            },

          ]
        }
      },
      created(){
         this.userInfoData = JSON.parse(localStorage.getItem("userInfo"));
//         let url = this.$apidomain+"/siteInfo/findmaster?siteId="+this.userInfoData.id;
//         this.$http.get(url).then(res=>{
//           console.log(res)
//         })
      },
      methods: {
        seeOlder(v){
          sessionStorage.removeItem("masterOrder");
          sessionStorage.setItem("masterOrder",JSON.stringify(v));
          this.$router.push({path:"../masterOrder"});
        },
        masterDetailClick(v){
          sessionStorage.removeItem("masterDetail");
          sessionStorage.setItem("masterDetail",JSON.stringify(v));
          this.$router.push({path:"../masterDetail"});
        }

      }

    }

</script>
<style lang="less">
  #search_box .mint-search>.mint-searchbar>.mint-searchbar-inner>.mintui-search{
          display:none;
  }
</style>
<style scoped lang="less">
  #masterList_box{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top:1.96rem;
    background:rgba(241,241,241,1);
    overflow-y: auto;
    .search{
      width:100%;
      height:1.32rem;
      background:rgba(255,255,255,1);
      padding:0.2rem 0;
      margin-bottom: 0.26rem;
        .mint-search{
          width: 90%;
          margin-left: 5%;
          height: 0.9rem;
          background:rgba(255,255,255,1);
          border-radius: 0.45rem;
        }
    }
    .userList{
      width:100%;
      overflow: hidden;
      .userListBox{
        overflow: hidden;
        width: 96%;
        height: 3.06rem;
        margin-bottom:0.15rem ;
        margin: 0.15rem;
        background: #ffffff;
        .userListOne{
          width: 100%;
          height: 0.6rem;
          margin: 0.15rem;
          overflow: hidden;
          span{
            display: inline-block;
            float: left;
          }
          span:nth-child(1){
            width:1.08rem;
            height:0.5rem;
            font-size:0.36rem;
            font-family:PingFangSC-Semibold;
            color:rgba(57,57,57,1);
            line-height:0.5rem;

          }
          span:nth-child(2){
            display: inline-block;
            transform: translateY(0.08rem);
            width:1.1rem;
            height:0.36rem;
            font-size:0.24rem;
            font-family:PingFangSC-Regular;
            color:rgba(83,107,210,1);
            line-height:0.36rem;
            margin-left: 0.38rem;
            padding:0 0.15rem;
            border: 0.01rem solid rgba(83,107,210,1);
          }
          span:nth-child(3){
            float: right;
            margin-right: 0.3rem;
            font-size:0.24rem;
            font-family:PingFangSC-Regular;
            color:rgba(136,136,136,1);
            line-height:0.5rem;
          }
        }
        .userListTwo{
          width: 100%;
          height: 1.2rem;
          margin: 0.15rem;
          display: flex;
          span{
            flex: 1;
            text-align: center;
            line-height: 1.2rem;
            font-size:0.24rem;
            font-family:PingFangSC-Regular;
            color:rgba(136,136,136,1);
            b{
              flex: 1;
              text-align: center;
              line-height: 1.2rem;
              font-size:.3rem;
              color:rgba(57,57,57,1);
              font-weight: 100;
            }
          }
        }
        .userListThree{
          width: 100%;
          height: 0.9rem;

          span{
            display: inline-block;
            text-align: center;
            line-height: 0.89rem;
            height: 0.89rem;
            width: 50%;
            float: left;
            border-top:0.01rem solid #cccccc;
            font-size:0.32rem;
            font-family:PingFangSC-Regular;
            color:rgba(83,107,210,1);
            img{
              display:inline-block;
              width: 0.28rem;
              height: 0.35rem;
              margin: 0 0.1rem;
            }
          }
          span:nth-child(1){
            border-right:0.01rem solid #cccccc;
          }
        }
      }
    }
  }


</style>


