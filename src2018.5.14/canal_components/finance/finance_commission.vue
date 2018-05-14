<template>
    <div class="finance_bill">
        <div class="bill_header">
            <ul>
                <li v-show="isShow">
                    <p>本期收入 (元)</p>
                    <p>{{data_display.currentIncomeFee}}</p>
                </li>
                <li v-show="isShow">
                    <p>上期收入 (元)</p>
                    <p>{{data_display.previousIncomeFee}}</p>
                </li>
                <li v-show="isShow">
                    <p>累计收入 (元)</p>
                    <p>{{data_display.cumulativeIncomeFee}}</p>
                </li>
                <li>
                    <p @click="takeUp">{{content}}<img :src="arrow"></p>
                </li>
            </ul>
          
        </div>
        <div class="tab">
            <el-menu theme="dark" class="el-menu-demo" mode="horizontal" >
               <el-menu-item  v-for="(item,index) in tabList" index="index" v-bind:class="{'active':flag==index}"
               :key="index" @click="tabClick(item,index)" >
                 {{item}}
               </el-menu-item>
            </el-menu>
        </div>
        <hr>
        <ComDailySum v-if="tabIndex == 0" :type-state="sum"></ComDailySum> 
        <ComMonthSum v-if="tabIndex == 1" :type-state="sum"></ComMonthSum>
    </div>
</template>
<script>
    import ComDailySum from "./comDailySum.vue";
    import ComMonthSum from "./comMonthSum.vue";
    export default{
    components:{
        ComDailySum,ComMonthSum
       },
     data(){
         return{
            isShow:true,
            num:1,
            arrow:"./static/images/xia.png",
            content:"收起数据展示",
            tabList:["日汇总","月汇总"],
            tabIndex:0,
            flag:0 ,  //设置tab高亮
            data_display:{},
            sum:1
        }   
     },
     created(){
       const url = `${this.$apidomain}/officialPartnerExtractSettlementController/feeStatistics`;
       this.$http.post(url).then(res =>{
          let data = res.data;
          console.log(data)
          if(data.code==="0000"){
              this.data_display=data.result;
          }else{
              this.$queryFun.successAlert.call(this,data.error)
          }
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
         tabClick(item,i){
             this.tabIndex = i;
             this.flag = i;
             if(item==='日汇总'){
                 this.sum=1;
             }else{
                 this.sum=2;
             }
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
            float: left;
            height:80px;
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
            background:#77ACEA;
            margin-left:32px;
        }
         ul li:nth-of-type(2){
            background:#67D5BC;
            margin-left:18px;
        }
         ul li:nth-of-type(3){
            background:#9984E3;
            margin-left:18px;
        }
        ul li:nth-of-type(4){
            margin-left:25px;
            height:0px;
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
        //margin-left:24px;
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
