<template>
  <div id="box">
       <section class="data_item" v-for="(item,index) in 5" :key="index">
          <order-title :index="index" :orderNumber="4564642124654545" :state="index" :isClamant="false"></order-title>   
          <div class="order_info">
            <order-info-list v-for="(item,index) in orderInfoItems" :key="index" :item="item"></order-info-list>
          </div>
          <section class="operate_content"> 
            <div class="operate_content_item">
                    <a href="tel:10086">联系师傅</a>
            </div>
            <div class="operate_content_item">
                      <a href="tel:10086"> 联系用户</a>
            </div>
            <div class="operate_content_item">
                     改派
            </div>
          </section>
       </section>
  </div>
</template>

<script>
import orderTitle from "./orderTitle"
import orderInfoList from "./orderInfoList"
  export default {
    props:["id"],
    components:{
      orderTitle,
      orderInfoList
    },
    data () {
      return {
        orderInfoItems:[
          {
            name:"师傅姓名",
            value:"广东深圳市南山区科技园A大厦B栋145",
            
          },
           {
            name:"联系人",
            value:"陈小姐"
          },
            {
            name:"预约时间",
            value:"2018-05-08 15:00:00"
          },
           {
            name:"预约时间",
            value:"2018-05-08 15:00:00"
          },
            {
            name:"监控原因",
            value:"迟到30分钟",
            color:"color:#E65831"
          },
           {
            name:"监控原因",
            value:"迟到30分钟",
            color:"color:#E65831"
          },
          ]
      }
    },
    methods:{
   
    },
    created() {
    
    },
   mounted(){
		
   },
  }
</script>
<style scoped lang="less">
#box{
  background:#F1F1F1;
  .order_info{
    padding:.3rem 0;
  }

.operate_content{
      width:100%;
      border-top:1px solid #ccc;
      height:.9rem;
      overflow: hidden;
      .operate_content_item{
        float:left;
        text-align: center;
        width:33.33%;
        line-height:.9rem;
        font-size:0.32rem;
        color:rgba(83,107,210,1);
        font-family:PingFangSC-Regular;
        >a{
           font-size:0.32rem;
           color:rgba(83,107,210,1);
        }
      }
      // #536BD2
      .operate_content_item:last-of-type{
        border-left:1px solid #ccc;
        
      }
        .operate_content_item:first-of-type{
          background:#536BD2;
          >a{
             color:rgba(255,255,255,1);
          }
       
      }
    }
}
 .data_item{
   width:100%;
   min-height: 5rem;
   background:#FFFFFF;
   margin-top:.16rem;
   border-radius: 4px;
 }
</style>

