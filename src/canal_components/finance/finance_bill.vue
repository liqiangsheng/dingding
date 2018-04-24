<template>
    <div class="finance_bill">
        <div class="bill_header">
            <ul>
                <li v-if="isShow">
                    <p>待借款金额 (元)</p>
                    <p>28,888.00</p>
                </li>
                <li v-if="isShow">
                    <p>未出账金额 (元)</p>
                    <p>1,531.00</p>
                </li>
                <li v-if="isShow">
                    <p>累计已借款 (元)</p>
                    <p>245,221.00</p>
                </li>
                <li>
                    <p>{{content}}<img :src="arrow"   @click="takeUp"></p>
                </li>
            </ul>

        </div>
        <div class="tab">
            <el-menu theme="dark" class="el-menu-demo" mode="horizontal" >
               <el-menu-item  v-for="(item,index) in tabList" index="index" @click="tabClick(item,index)" >
                 {{item}}
               </el-menu-item>
            </el-menu>
        </div>
        <DailySum v-if="tabIndex == 0"></DailySum>
        <MonthSum v-if="tabIndex == 1"></MonthSum>
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
            isShow:true,
            num:1,
            arrow:"../../assets/images/xia.png",
            content:"收起数据展示",
            tabList:["日汇总","月汇总"],
            tabIndex:0
        }
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
         }

     }
    }
</script>
<style scoped lang="scss">
    .finance_bill,.bill_header{
        width:100%;
        background:#FFFFFF;
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
            //float: left;
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
            margin-left:25px;
            p{
                width:100%;
                color:#20A0FF;
                font-size:14px;
                text-align:left;
                margin-top:4px;
                height :20px;
                line-height:20px;
                img{
                    margin-left:6px;
                }
            }
        }
    }
    .el-menu-demo{
      display:flex;
      background:#FFFFFF;
      margin-left:24px;
      margin-top:20px;
      border-bottom: 5px solid transparent;
      .el-menu-item{
          background:#FFFFFF;
          color:#888888;
          font-size:14px;
          font-family: PingFangSC;

      }
      .el-menu-item:hover{
          background:#FFFFFF;
          color:#EA5413;
          border-bottom: 4px solid #EA5413;
      }
    }

</style>
