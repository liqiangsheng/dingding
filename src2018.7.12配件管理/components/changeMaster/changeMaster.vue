<template>
    <div id="box" >
        <header class="time_container">
          预约时间：{{ routeParams.date}}
        </header>
        <section class="master_container">
            <div class="master_items" v-for="(item,index) in masterList" :key="index"
                 @click="selectorMaster(item,index)"
                 :class="{select_master:select===index}"
                 :style="isSelectorMaster(item.id)?'backgroundColor:#C3C3C3':''"
            >
               {{item.name}}
            </div>
        </section>
        <section class="current_day">
            <h3>当日工单</h3>
        </section>
      <section class="table_container">
          <table border="0" cellpadding="0"  cellspacing="0">
            <thead>
              <tr>
                <th>预约时间</th>
                <th>工单号</th>
                <th>工单状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in currentOrder" :key="index">
                <td>
                 {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}
                </td>
                <td>
                {{item.id}}
                </td>
                <td>
                  {{item.state | BackOrderStatus}}
                </td>
              </tr>
            </tbody>
          </table>
        <article class="placeholder_container" v-show="!currentOrder.length">
                <i class="i placeholder"></i>
        </article>
      </section>

      <section class="operate">
        <div class="button" @click="subMit">
          确定{{$store.state.exportOrder}}
        </div>

      </section>

    </div>
</template>
<script>
  import storage from "@/assets/js/storage"
    export default {
        data() {
            return {
              masterList:[],
              select:-1,
              sitite:[{
                isShow:false,
              }],
              routeParams:this.$route.params,
              currentOrder:[],
            }
        },
        methods: {
          isSelectorMaster(id){
           return id===this.routeParams.masterId?true:false;
          },
          getMasterOrder(id){
            let params={
                "type":"2",
                "workerid":id,
                "keywords":"",
                "dateStr":this.routeParams.date,
              },
              url=`${this.$common.apidomain}/orderquery/findtodayorder`;
            this.$http.get(url,{params}).then(res=>this.$httpFilter(res).then(data=>{
              this.currentOrder=data.result||[];
            }))
          },
          selectorMaster(v,i){
            if(this.select!==i&&!this.isSelectorMaster(v.id)){
              this.select=i;
              this.getMasterOrder(v.id);
            }
          },
          subMit(data){
            if(this.select===-1){
              return this.$Toast("请选择师傅");
            }
              let url = `${this.$common.apidomain}/order/orderallocation`,
                  params={
                    "orderIds":this.routeParams.orderId,
                    "type":"3",
                    "keywords":"",
                    "dateStr":this.routeParams.date,
                    "masterId":this.masterList[this.select].id
                  };
            this.$http.post(url,params).then(res=>this.$httpFilter(res).then(data=>{
              this.$Toast({
                message: `${this.$store.state.exportOrder}成功`,
                iconClass: 'mintui mintui-success'
              });
                setTimeout(()=>this.$router.back(-1),1200)
            },res=>{

            }));
          },
          paramsData(){
            return { params: {
              "siteId":storage.getLocalStorage("userInfo").id,
              "keywords":"",
            }}
          },
        },
      mounted(){
          document.title=this.$store.state.exportOrder
      },
        created() {
          this.$http.get(`${this.$common.apidomain}/siteInfo/findValidMasters`, this.paramsData()).then(res =>
            this.$httpFilter(res).then(data => this.masterList = data.result));
          if(!!this.routeParams.masterId)this.getMasterOrder(this.routeParams.masterId);
        }
    }
</script>
<style scoped lang="less">
  @import "../../assets/style/base.less";
  #box{
    min-height:100vh;
    position:relative;
    padding-top:0 !important;
    padding-bottom:2rem;
   /*transform:translateY(-.96rem);*/

    .time_container{
      line-height: .7rem;
      background:rgba(216,223,253,1);
      text-align: center;
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      color:rgba(83,107,210,1);
    }
    .master_container{
      display: flex;
      flex-wrap:wrap;

      text-align: center;

      padding:0.39rem .1rem;
      padding-bottom:.19rem;
      .master_items{
        display: flex;
        font-size:0.3rem;
        font-family:PingFangSC-Regular;
        justify-content:center;
        color:#393939;
        align-items: center;
        margin-bottom:.2rem;
        width:1.64rem;
        margin-left:.15rem;
        height:0.8rem;
        background:rgba(241,241,241,1);
        border-radius: 0.08rem ;
      }
      .select_master{
        background:rgba(83,107,210,1);
        color:#fff;
      }
    }
    .current_day{
      background:#F1F1F1;
      h3{
        line-height: 1rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        color:rgba(83,107,210,1);
        font-weight: normal;
        text-align: center;
      }

    }
    .table_container{
      th,hr,td{
        outline: none;
        padding:0;
        margin: 0;
        text-align: center;
        border:0;

      }

      table{
        width:100%;
        border-collapse:collapse;
        thead{
          background:rgba(207,207,207,1);
          tr{
            th{
              font-size:0.28rem;
              font-family:PingFangSC-Regular;
              color:rgba(57,57,57,1);
              font-weight: normal;
              line-height: .8rem;
            }
          }
        }
        tbody{

          /*border-collapse:collapse;*/
          tr{
            /*border-collapse:collapse;*/
            td{
              border:none;
              border-collapse:collapse;
              border-bottom:.5px solid #C3C3C3;
              padding:.15rem .1rem;

            }
            td:nth-of-type(n+2){
              /*max-width:1rem;*/
              border-left:1px solid #C3C3C3;
            }
            td:last-of-type{
              min-width:1.5rem;
            }
            td:first-of-type{
              min-width:1.8rem;
            }
          }
        }
      }
    }
    .operate{
      width:100vw;
      position:fixed;
      bottom:.5rem;
      left:0;
      z-index: 999999;
      .button{
        width:6.3rem;
        margin:0 auto;
        text-align: center;
        line-height: .9rem;
        background:rgba(83,107,210,1);
        border-radius: 0.1rem ;
        font-size:0.36rem;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
      }
    }
  }
  .filx {
    display: flex;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background: red;
  }
  .placeholder_container{
    height:2.6rem;
    width:100vw;
    position:relative;
    .placeholder{
      top:50%;
      width:1.26rem;
      height:1.3rem;
      .img("../images/wait.png");

    }
    &::after{
      position:absolute;
      bottom:0;
      content:"暂无工单...";
      color:rgba(136,136,136,1);
      width:100vw;
      text-align: center;
      font-size:.3rem;
    }
  }

</style>


