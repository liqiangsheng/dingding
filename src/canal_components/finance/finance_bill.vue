<template>
    <div class="finance_bill">
        <div class="bill_header">
            <ul>
                <li v-show="isShow">
                    <p>待结款金额 (元)</p>
                    <p>{{data_display.feePending}}</p>
                </li>
                <li v-show="isShow">
                    <p>未出账金额 (元)</p>
                    <p>{{data_display.feeNotAccount}}</p>
                </li>
                <li v-show="isShow">
                    <p>累计已结款 (元)</p>
                    <p>{{data_display.feeAccumulated}}</p>
                </li>
                <li>
                    <p>{{content}}<img :src="arrow"   @click="takeUp"></p>
                </li>
            </ul>

        </div>
        <div class="tab">
            <el-menu theme="dark" class="el-menu-demo" mode="horizontal" >
               <el-menu-item  v-for="(item,index) in tabList" index="index"  v-model="sum"
               :key="index" @click="tabClick(item,index)" :class="{'active':flag==index}">
                 {{item}}
               </el-menu-item>
            </el-menu>
        </div>
        <hr>
        <DailySum v-if="tabIndex == 0" :type-state="sum"></DailySum>
        <MonthSum v-if="tabIndex == 1" :type-state="sum"></MonthSum>
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
            isShow:true,
            num:1,
            arrow:"./static/images/xia.png",
            content:"收起数据展示",
            tabList:["日汇总","月汇总"],
            sum:1,         
            tabIndex:0,
            flag:0,   //控制tab高亮
        }
     },
     created(){
        let url = `${this.$apidomain}/officialPartnerBillSettlementController/feeStatistics`;
        this.$http.post(url).then(res =>{
            let data = res.data;
            if(data.code=="0000"){
                this.data_display=data.result;
            }else{
                this.$queryFun.successAlert.call(this,data.error);
            } 
           // console.log(this.data_display,"费用流水金额统计");          
        })
     },
     methods:{
          takeUp(){   //完工的消失显示
                this.num++;
                if(this.num%2== 0){
                this.arrow = "./static/images/shang.png";
                this.content = "展开数据展示";
                this.isShow = false;
                }else{
                this.arrow = "./static/images/xia.png";
                this.isShow = true;
                this.content = "收起数据展示";
                }
         },
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
            width:282px;
            height:80px;
            float: left;
            border-radius:4px;
            p{
                width:100%;
                color:#FFFFFF;
                text-align: center;
            }
            p:nth-of-type(1){
                font-size:14px;
                height:20px;
                line-height: 20px;
                margin:10px 0px 2px 0px;
            }
             p:nth-of-type(2){
                font-size:30px;
                height:36px;
                line-height:36px;
                margin-bottom:12px;
            }
        }
        ul li:nth-of-type(1){
            background:#E7B869;
            margin-left:32px;
        }
         ul li:nth-of-type(2){
            background:#ADA699;
            margin-left:18px;
        }
         ul li:nth-of-type(3){
            background:#F08162;
            margin-left:18px;
        }
        ul li:nth-of-type(4){
            height:0px;
            margin-left:25px;
            p{
                width:100%;
                color:#20A0FF;
                font-size:14px;
                text-align:left;
                margin-top:4px;
                height :30px;
                line-height:30px;
                img{
                    margin-left:6px;
                }
            }
            p:hover{
                cursor: pointer;
            }
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
      margin-left:24px;
      margin-top:30px;
      .el-menu-item{
          background:#FFFFFF;
          color:#888888;
          font-size:14px;
          font-family: PingFangSC;
          border-bottom: 5px solid transparent;

      }
      .active{
          background:#FFFFFF;
          color:#EA5413;
          border-bottom: 4px solid #EA5413;
      }
      .el-menu-item:hover{
          background:#FFFFFF;
      }
    }

</style>
