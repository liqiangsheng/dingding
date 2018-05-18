<template>
  <!--完成-->
  <div id="complete">
    <ul class="completeBox" v-for="(item,index) in userList">
      <li><span class="span1">工单号:</span>{{item.id}}
        <!--<span style="display: inline-block;width: 0.72rem;height: 0.33rem" v-if="item.emergencyDegree==0">{{item.emergencyDegree|Emergencydegree}}</span>-->
        <img style="display: inline-block;width: 0.72rem;height: 0.33rem" v-if="item.emergencyDegree==1" src="/static/images/urgent.png">
        <b>{{item.state|BackOrderStatus}}</b></li>
      <li><span class="span1">师傅姓名:</span>{{item.masterName}} </li>
      <li><span class="span1">分类:</span>{{item.catalogName}} </li>
      <li><span class="span1">联系人:</span>{{item.linkmanName}} </li>
      <li><span class="span1">服务地址:</span>{{item.linkmanAddress}} </li>
      <li><span class="span1">预约时间:</span>{{item.appointmentDatetime}} </li>
      <img v-else-if class="img" :src="item.type|typeImg"></img>
    </ul>
    <div v-show="PagingShow"
         style="width: 100%;height: 0.9rem;text-align: center;line-height: 0.9rem;background: rgba(241,241,241,1)"
         @click="jiazai">点击加载更多...</div>

  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
    export default {
      data() {
        return {
          userList:[],
          showPages:"1",  //分页
          currentPageSize:"5", //数量
          total:0,
          PagingShow:false,
        }
      },
      created(){
        this.getTableList();
      },
      methods: {
        jiazai(){
          this.showPages = Number(this.showPages);
          this.showPages  += 1;
          this.showPages =this.showPages+"";
          if(this.showPages > this.total){
            Toast("已经是最后一页")
            return;
          }
          this.getTableList();
        },
        getTableList(){
          let objData = {};
          objData.states = ["09","12","15","17","18","19"];
          objData.id = "";
          objData.page = this.showPages;
          objData.rows = this.currentPageSize;
          objData.siteId=JSON.parse(localStorage.getItem("userInfo")).id;
          let url= this.$common.apidomain+"/site/order/list";
          this.$http.post(url,objData).then(res=>this.$httpFilter(res).then(data=>{
            this.total = data.result.pages;
            if(this.total>1){
              this.PagingShow = true;
            }else{
              this.PagingShow = false;
            }
            this.userList =  this.userList.concat(data.result.list);
          }))
        }

      }

    }

</script>
<style scoped lang="less">
  #complete{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top:1.96rem;
    background:rgba(241,241,241,1);
    overflow-y: auto;
    .completeBox{
      width: 100%;
      margin-top: 0.16rem;
      background: #ffffff;
      padding: 2.5%;
      position: relative;
      .img{
        width: 0.94rem;
        height: 0.42rem;
        position: absolute;
        right: 0.16rem;
        top:1.0rem;
      }
      li:last-child{
        width: 100%;
        margin-bottom: 0.16rem;
        button{
          border: 0;
          background: none;
          float: right;
          width:1.6rem;
          height:0.7rem;
          background:rgba(83,107,210,1);
          border-radius:0.08rem ;
          font-size:0.32rem;
          font-family:PingFangSC-Regular;
          color:rgba(255,255,255,1);
          line-height:0.32rem;
          img{
            display: inline-block;
            width:.31rem;
            height: .3rem;
            margin-right: 0.16rem;
          }
        }
      }

      li{
        width: 100%;
        height: 0.58rem;
        line-height: 0.58rem;
        .span1{
          display: inline-block;
          width:1.2rem;
          text-align: right;
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(136,136,136,1);
          margin-right: 0.15rem;
        }
      };
      li:nth-child(1){
        width: 100%;
        height:.58rem;
        font-size:.24rem;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:.33rem;
        border-bottom: 0.01rem solid #cccccc;
        span:nth-child(2){
          display: inline-block;
          width: 0.72rem;
          height: 0.32rem;
          margin: 0 0.2rem;
        }
        b{
          font-weight: 100;
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(230,88,49,1);
          line-height:0.4rem;
          float: right;
        }
      }
    }

  }
</style>


