<template>
  <div class="tdList" style="z-index: 99999">
     <div v-if="item.type == '01'">
       <Tooltip content="派单"
                placement="top-end"
                v-if="sendOrder(item.state)"
                v-show="$isButtonObj('bn-order-all-send')" >
         <span class="iconStyle"  @click="replaceMaster(item,index,item.id,true)">派单</span>
       </Tooltip>
       <Tooltip content="取消工单"
                v-if="cancelOrder(item.state)"
                placement="top-end"
                v-show="$isButtonObj('bn-order-all-refund')">
         <span class="iconStyle"  @click="drawbackIsShow(item)">取消</span>
       </Tooltip>

       <Tooltip content="添加备注" placement="top-end" hidden v-show="$isButtonObj('bn-order-all-remark')">
         <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
       </Tooltip>

       <Tooltip content="更多" placement="top-end" hidden v-show="$isButtonObj('bn-order-all-details')">
         <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
       </Tooltip>
       <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)">
         <li>
           <Tooltip content="派单"
                    placement="top-end"
                    v-if="sendOrder(item.state)"
                    v-show="$isButtonObj('bn-order-all-send')" >
             <span @click="replaceMaster(item,index,item.id,true)">派单</span>
           </Tooltip>
         </li>
         <li>
           <Tooltip content="取消工单"
                    v-if="cancelOrder(item.state)"
                    placement="top-end"
                    v-show="$isButtonObj('bn-order-all-refund')">
             <span  @click="drawbackIsShow(item)">取消工单</span>
           </Tooltip>
         </li>
         <li>
           <Tooltip content="添加备注" placement="top-end" hidden v-show="$isButtonObj('bn-order-all-remark')">
             <span  @click="addRemarksIsShow(item)">添加备注</span>
           </Tooltip>
         </li>
         <li>
           <Tooltip content="工单详情" placement="top-end" v-show="$isButtonObj('bn-order-all-details')">
             <span  @click="orderDetails(item,item.id)">工单详情</span>
           </Tooltip>
         </li>
         <li>
           <Tooltip content="投诉工单"
                    placement="top-end"
                    v-if="comlainbuttonStatus(item.state)"
                    v-show="$isButtonObj('bn-order-all-complaints')">
             <span  @click="complainFn(item.id)">投诉工单</span>
           </Tooltip>
         </li>
         <li>
           <Tooltip content="异常挂起"
                    placement="top-end"
                    v-if="unusualStatusButton(item.state)"
                    v-show="$isButtonObj('bn-order-all-abnormal')">
             <span  @click="unusual(item.id)">异常挂起</span>
           </Tooltip>
         </li>
         <li>
           <Tooltip content="罚款师傅" placement="top-end"
                    v-if="masterStatus(item.state)"
                    v-show="$isButtonObj('bn-order-all-fine')" >
             <span @click="masterImposeIsShow(item)">罚款师傅</span>
           </Tooltip>
         </li>
         <li>
           <Tooltip content="改约时间"
                    v-if="changeTime(item.state)"
                    placement="top-end"
                    v-show="$isButtonObj('bn-order-all-changetime')">
             <span @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
           </Tooltip>
         </li>
         <li>
           <Tooltip content="新增服务产品" placement="top-end" hidden v-if="addSaverProduvtFilter(item.state)" v-show="$isButtonObj('bn-order-all-newproduct')">
             <span @click="addSaverProduct(item,isAddProduct)">新增服务产品</span>
           </Tooltip>
         </li>
         <li>
           <Tooltip content="催单" placement="top-end" hidden v-if="item.state=='05'||item.state=='06'">
                      <span @click="reminder(item)" style="height: 18px;width: 18px;display: inline-block">
                        催单
                        <!--<img src="../../assets/images/cuidan.png" alt="" style="width: 100%;height: 100%;display: inline-block">-->
                      </span>
           </Tooltip>
         </li>
       </ul>

     </div>

  </div>

</template>
<script>
  export default {
    props:["itemData"],
    components:{
    },
    data() {
      return {

      }
    },
    created(){
      console.log(this.itemData)
    },
    methods: {


    },
    mounted() {
    },
  }
</script>

<style scoped lang="scss">

</style>

