<template>
    <div>
      <table style="border-left:1px solid #ccc;"  id="table" cellSpacing="0px" cellpadding="0">
        <thead>
        <tr class="theads">
          <th>
            <el-checkbox :disabled="!$store.state.rightTableList.length"
                          v-model="$store.state.checked"
                          @change="wholeSelector($store.state.rightTableList,$store.state.checked)"
                          ></el-checkbox>
          </th>
          <th v-for="(item,index) in theadsName1" :key="index">{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in $store.state.rightTableList">
          <td>
            <el-checkbox v-model="$store.state.rightCheckbox[index]"   @change="isCheckbox(item,index)"></el-checkbox>
          </td>
          <td style="width:80px;">
            {{item.cityName}}
          </td>
          <td style="width:220px;">
                {{item.fullName}}
          </td>
          <td>
            {{item.name}}
          </td>
          <td>
            {{item.servicePrice}}
          </td>
          <td :class="isEdit[index]?'lastTd':'lastTD'"  @dblclick="dblclickEdit(index,item,isEdit)" @keyup.enter="onEnter(index,item,isEdit,0)">
            <el-input v-if="isEdit[index]" style="width:80px;" autofocus
                      @blur="confirm(index,item,isEdit,sunm[index],0)"
                      type="number" v-model="sunm[index]" max="10"
            >
            </el-input>
            <span v-else v-text="(item.agio-0).toFixed(3)" style="color:green"></span>
          </td>
          <!--toFixed(2)-->
          <td :class="isEdit[index]?'lastTd':'lastTD'"  @dblclick="dblclickEdit(index,item,isEditRebate)" @keyup.enter="onEnter(index,item,isEdit,1)">
            <el-input v-if="isEditRebate[index]" style="width:80px;" autofocus @blur="confirm(index,item,isEditRebate,rebateSunm[index],1,item.servicePrice)" type="number" v-model="rebateSunm[index]"></el-input>
            <span :style="{color:item.color}" v-else style="color:green">{{item.agioSaver?item.agioSaver.toFixed(3):item.servicePrice}}</span>
          </td>
          <td class="icon">
            <span>
            <el-button @click="del(item,index)"  type="text">
                        删除
            </el-button>
            </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
</template>
<script>
    export default {
      props:["leftTableList","leftIsCheckboxList"],
        data() {
            return {
              theadsName1:[
                "城市",
                "产品名称",
                "服务费类型",
                "服务费（元）",
                "折扣",
                "服务费折后（元）",
                "操作"
              ],
              beforeData:"",
              isEdit:[],
              isEditRebate:[],
              isParent:true,
              checked:this.$store.state.checked,
              sunm:[],
              rebateSunm:[]
            }
        },
      watch:{
            "$store.state.rightTableList":function(v,o){
//                  this.sunm=v.map((v,i)=>{return v.agio-0});    //返回折扣
//                  this.rebateSunm=v.map(v=>{return v.agioSaver||v.servicePrice})  //返回折后服务费
                    this.initGetDataSum(v);
            },
      },
        methods: {
          dblclickEdit(i,item,isEdit){
            this.$set(isEdit,i,true);
          },
          onEnter(i,item,data){
//            this.enitItem(i,item,data);
          },
          enitItem(i,item,data,currentSum,status,agioSaver){
            this.$confirm('此操作将编辑该数据，是否继续？', '编辑', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '编辑成功!'
              });
//              0 代表是设置折扣
//              1 代表是设置折后服务费
              if(status){
                let newCurrentSum=currentSum?currentSum:agioSaver;
                  if( newCurrentSum -0 > item.servicePrice-0){       //设置折后
                    this.$queryFun.successAlert.call(this,"折后价不得大于原服务费")
                    this.$set(item,"color","red");
                  }else{
                    this.$store.commit("setSaverPrice",{servicePrice:item.servicePrice,currentSum:newCurrentSum,i,type:2});
                    this.$set(item,"color","black")
                  }
              }else{
                  if(currentSum>10)return this.$queryFun.successAlert.call(this,"设置折扣数不得大于10");
                  let newCurrentSum = currentSum?currentSum:10;
                  this.$store.commit("setServicePrice",{servicePrice:item.servicePrice,currentSum:newCurrentSum,i,type:1})
              }
              this.$set(data,i,false);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消编辑操作'
              });
              this.$set(data,i,false);
              this.isParent=true;
            });
          },
          confirm(i,item,data,currentSum,status,agioSaver){
//            if(this.isParent){
                    this.enitItem(i,item,data,currentSum,status,agioSaver)
//            }
          },
          initChexkboxListFun(index=false){
            if(index||index===0){
              this.isCheckboxList.splice(index,1);
            }else{
              this.tableList.forEach(v=>{
                this.isCheckboxList.push(false);
              });
            }
          },
          isCheckbox(data,index){   //列表单选
//            this.$queryFun.isCheckbox.call(this,data,index,true);
            this.$store.commit("isCheckbox");
          },
          wholeSelector(data,currentState){ //全选
            this.$queryFun.wholeSelector.call(this,data,currentState,true)
          },
          del(item,index){
            this.$queryFun.confirm.call(this,{
                  text:"此操作将删除，是否继续？",
                  title:"删除",
                  success:function (){
                    this.$store.commit("delRightTable", index);
                    this.$store.state.delNewArray.forEach(v=>{
                      this.leftTableList.push(v);
                      this.leftIsCheckboxList.push(false);
                    });
                    this.$store.commit("delRightTableCheckbox",index);
                    this.$queryFun.successAlert.call(this,"删除成功","1");
                  }
            });
//                  this.$confirm('此操作将删除，是否继续？', '删除', {
//                    confirmButtonText: '确定',
//                    cancelButtonText: '取消',
//                    type: 'warning'
//                  }).then(() => {
//                    this.$store.commit("delRightTable", index)
//                    this.$store.state.delNewArray.forEach(v=>{
//                      this.leftTableList.push(v);
//                      this.leftIsCheckboxList.push(false);
//                    });
//                    this.$store.commit("delRightTableCheckbox",index);
//                    this.$message({
//                      type: 'success',
//                      message: '删除成功!'
//                    });
//                  }).catch(() => {
//                    this.$message({
//                      type: 'info',
//                      message: '已取消删除操作'
//                    });
//                  });
              },
            initGetDataSum(lists){
                this.sunm=lists.map(v=>{return v.agio-0;});
                this.rebateSunm=lists.map(v=>{return v.agioSaver||v.servicePrice})
            }
          },
        created() {
                this.initGetDataSum(this.$store.state.rightTableList)
        }
    }
</script>
<style scoped lang="scss">
  #table{
    width:50% !important;
    float:left;
  }
  table{
    .theads{
      >th{
        padding:10px 10px;
        text-align:center;
        background: #E5E9F2;
        box-shadow: inset 0 1px 0 0 #E0E6ED,
        inset 0 -1px 0 0 #E0E6ED;

      }
      >.multiple{
        width:30px;
        cursor:pointer;
        box-size:border-box;
      }
    }
    >tbody{
      >tr{
        border-top:1px solid #ccc;
        >td{
          border-bottom:1px solid #ccc;
          padding:10px 10px;
          text-align:center;
        }
        .icon{
          padding:0 20px;

          i{
            cursor:pointer;
            padding:10px 0;
            font-size:18px;
            display: inline-block;
            padding-right:5px;
          }
          >i:last-of-type{
            padding-right:0;
          }
        }
        >td:first-of-type{
          border-right:1px solid #ccc;
        }
        >td:last-of-type{
          //display: flex;
          padding-top:0;
          padding-bottom:0;
          >span{
            flex:1;
            height:100%;
            /*float:left;*/
            padding-top:4px;
            /*padding-left:30px;*/
            i{
              width:16px;
              height:16px;
              background:url(../../../../../static/images/ban.png) center center no-repeat;
              background-size:100% 100%;
              float:left;
              margin-right:3px;
              vertical-align: middle;
            }
          }
          >.details_icon{
            flex:1;
            /*float:right;*/
            padding-left:0px;
            /*padding-top:8px;*/
            text-align: center;
            /*padding-right:20px;*/
            cursor:pointer;
            i{
              width:16px;
              height:16px;
              margin-right:0;
              /*margin-top:3px;*/
              background:url(../../../../../static/images/detailed.png) center center no-repeat;
              background-size:100% 100%;
            }
          }

        }
        >.lastTd{
          padding-top:4.5px;padding-bottom:4px;
        }
        >.lastTD{
          padding-top:10px;padding-bottom:13px;
        }
      }
      >tr:nth-of-type(even){
        background: #F9FAFC;
      }
    }
  }

</style>


