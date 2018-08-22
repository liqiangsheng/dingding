<template>
    <div class="finance_bill">
        <div class="bill_header">
            <ul>
                <li>
                    <p>本期待结算金额 (元)</p>
                    <p>{{data_display.feePending}}</p>
                </li>
                <li>
                    <p>未出账金额 (元)</p>
                    <p>{{data_display.feeNotAccount}}</p>
                </li>
            </ul>

        </div>
        <div class="tab">
            <el-menu theme="dark" class="el-menu-demo" mode="horizontal" >
              <el-menu-item v-for="(item,index) in tabList" index="index" v-model.trim="sum"
                            :key="index" @click="tabClick(item,index)" :class="{'active':flag==index}">
                 {{item}}
               </el-menu-item>
            </el-menu>
        </div>
        <hr>
        <DailySum v-if="tabIndex == 1" :type-state="sum" :labeloptions = 'labeloptions'></DailySum>
        <MonthSum v-if="tabIndex == 0" :type-state="sum" :labeloptions = 'labeloptions'></MonthSum>
    </div>
</template>
<script>
    import DailySum from "./dailySum.vue";
    import MonthSum from "./monthSum.vue";
    export default{
    components:{
        DailySum,MonthSum
       },
     data(){
         return{
            data_display:{}, //数据展示
            content:"收起数据展示",
            tabList:["月汇总","日汇总"],
           sum: 1,
            tabIndex:0,
            flag:0,   //控制tab高亮
            channelList:[],  //渠道数据
           labeloptions:[]
        }
     },
     created(){
        this.sum=2;
        let url = `${this.$apidomain}/billManageController/feeStatistics`;
        this.$http.post(url).then(res =>{
            let data = res.data;
            if(data.code=="0000"){
                this.data_display=data.result;
              //console.log(this.data_display,"费用流水金额统计");
            }else{
                this.$queryFun.successAlert.call(this,data.error);
            }
        })


       this.labeloptions=[{name:'--请选择--',id:''},{name:'--全部渠道--',id:'1'},...this.$store.state.findchannel]
       this.labeloptions.forEach((obj,i)=>{
         this.$set(obj,'childChannel',[])
       })
     },
     methods:{
         tabClick(v,i){
             this.tabIndex = i;
             this.flag= i;
             if(v==="日汇总"){
                 this.sum=1
             }else{
                 this.sum=2
             }
            // console.log(this.sum)
         }

     }
    }
</script>
<style scoped lang="scss">
    .finance_bill,.bill_header{
        width:100%;
        background:#FFFFFF;
        //overflow-y:auto;
    }
    .bill_header{
        margin-top:24px;
        ul{
            width:90%;
            display:flex;
        }
        ul li{
            width:265px;
            height:86px;
            float: left;
            border-radius:4px;
            p{
                width:100%;
                color:#FFFFFF;
                text-align: center;
            }
            p:nth-of-type(1){
                font-size:16px;
                height:22px;
                line-height: 22px;
                margin:17px 0px 4px 0px;
            }
             p:nth-of-type(2){
                font-size:24px;
                height:33px;
                line-height:33px;
                margin-bottom:12px;
            }
        }
        ul li:nth-of-type(1){
            background:#69C9B4;
            margin-left:50px;
        }
         ul li:nth-of-type(2){
            background:#61A5F3;
            margin-left:12px;
        }
    }
    hr{
        height:1px;
        border:none;
        border-top:1px solid #C0CCDA;
    }
    .el-menu-demo{
      display:flex;
      background:#FFFFFF;
      margin-left:30px;
      margin-top:38px;
      .el-menu-item{
          width:130px;
          text-align: center;
          background:#FFFFFF;
          color:#888888;
          font-size:14px;
          font-family: PingFangSC;
          border-bottom: 5px solid transparent;

      }
      .active{
          background:#FFFFFF;
          color:#A470CD;
          border-bottom: 4px solid #A470CD;
      }
      .el-menu-item:hover{
          background:#FFFFFF;
      }
    }

</style>
