<template>
    <div id="box">
        <header class="time_container">
          预约时间：{{ date |moment('YYYY-MM-DD HH:mm:ss')}}
        </header>
        <section class="master_container">
            <div class="master_items" v-for="(item,index) in masterList" :key="index"
                 @click="selectorMaster(item,index)"
                 :class="{select_master:select===index}"
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
      </section>
      <section class="operate">
        <div class="button" @click="subMit">
          确定改派
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
              date:"",
              orderId:"",
              currentOrder:[],
            }
        },
        methods: {
          selectorMaster(v,i){
            this.select=i;
            let params={
              "type":"1",
              "workerid":v.id,
            };
            let url=`${this.$common.apidomain}/orderquery/findtodayorder`;
            this.$http.get(url,{params}).then(res=>this.$httpFilter(res).then(data=>{
                this.currentOrder=data.result;
            }))
          },
          subMit(data){
            if(this.select===-1){
              return this.$Toast("请选择师傅");
            }
              let url = `${this.$common.apidomain}/order/orderallocation`,
                  params={
                    "orderIds":this.orderId,
                    "type":"3",
                    "masterId":this.masterList[this.select].id
                  };
            this.$http.post(url,params).then(res=>this.$httpFilter(res).then(data=>{
                const result = data.result;
              this.$Toast({
                message: '改派成功',
                iconClass: 'mintui mintui-success'
              });
                setTimeout(()=>this.$router.back(-1),1200)
            },res=>{

            }));
          },
          paramsData(){
            return {params: {
              "siteId":storage.getLocalStorage("userInfo").id
            }}
          },
        },
        created() {
          this.orderId = this.$route.params.id.split(",")[0];
          this.date = this.$route.params.id.split(",")[1]-0;
          let url=`${this.$common.apidomain}/siteInfo/findmaster`;
          this.$http.get(url,this.paramsData()).then(res=>this.$httpFilter(res).then(data=>{
            const result=data.result
                this.masterList=result;
          })
//            r=>{

//            this.siteMasterObj = data.result;
//            this.siteMasterObj.forEach((v,i)=>{
//              v.radio = false;
//            });
//          }
          )
//          siteInfo/findmaster?siteId=0101003
        }
    }
</script>
<style scoped lang="less">
  #box{
    min-height:100vh;
    position:relative;
   transform:translateY(-.96rem);
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
              min-width:2rem;
            }
          }
        }
      }
    }
    .operate{
      width:100vw;
      position:fixed;
      bottom:-.5rem;
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
</style>


