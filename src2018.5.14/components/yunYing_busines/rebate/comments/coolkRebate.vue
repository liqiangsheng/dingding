<template>
    <div>
      <el-dialog style="z-index:999999"   :visible.sync="data.isShow" size="small">
        <h3>参与活动</h3>
        <table  id="table" cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName1" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableList" :key="index" v-if="tableList.length">
              <td>
                {{item.saleName}}
              </td>
              <td>
                {{item.startTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}~{{item.endTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
              </td>
              <td class="icon">
                     <span>
                       <el-button @click="annul(item)"  type="text">
                          撤销折扣
                        </el-button>
                     </span>
              </td>
            </tr>

            <tr v-if="!tableList.length">
                <td colspan="3" align="center" style="border:none;padding-top:20px;">
                  无
                </td>
            </tr>
          </tbody>
        </table>
      </el-dialog>
    </div>
</template>
<script>
    export default {
      props:["data","quiry"],
        data() {
            return {
              tableList:[],
              theadsName1:[
                "活动名称",
                "活动周期",
                "操作",
              ],
            }
        },
        methods: {
          annul(item){
            this.$confirm('此操作将撤销，是否继续？', '撤销', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let url=`${this.$apidomain}/sale/delServiceSale`, o={
                "saleId":item.saleId,
                "serviceId":item.serviceId
              };
              this.$http.post(url,o).then(res=>{
                let data = res.data;
                if(data.code==="0000"){
                  this.$message({
                    type: 'success',
                    message: '撤销成功!'
                  });
                  this.quiry();
                  this.data.isShow=false;
                }else{
                    this.$queryFun.successAlert.call(this,data.error);
                }
              });
            }).catch(() => {
              this.$queryFun.successAlert.call(this, '已取消撤销操作');
            });
          }
        },
        created() {
          let url= `${this.$apidomain}/sale/findServiceSale?serviceId=${this.data.id}`;
          this.$http.get(url).then(res=>{
            let data=res.data;
            if(data.code==="0000"){
              this.tableList=data.result;
            }else{
              this.$queryFun.successAlert.call(this,data.error);
            }
          })
        }
    }
</script>
<style scoped lang="scss">
  h3{
    position:absolute;
    left:20px;
    font-size:14px;
    top:20px;
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
          padding:11px 10px;
          text-align:center;
        }
        .icon{
          padding:0;
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
      }
      >tr:nth-of-type(even){
        background: #F9FAFC;
      }
    }
  }
  #table{
    width:100% !important;
  }
</style>
<style>
  .el-message-box__wrapper{
    z-index: 989898989898 !important;
  }
</style>

