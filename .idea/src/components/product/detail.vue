<template>
  <div id="app">

    <div class="container">
      <!--查询按钮-->
      <app-button :props="buttonObj" v-show="$isButtonObj('bn-product-details-apply')"></app-button>
      <div class="dable_lsit">
        <table cellSpacing="0px" cellpadding="0">
          <thead >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.name}}
            </td>
            <td class="cursor">
                 <span @click="editDetailItem(item,detailData)" v-show="$isButtonObj('bn-product-details-edit')"><i class="edit_icon"></i>编辑</span>
                  <span @click="deleteDetailItem(item)"  v-show="$isButtonObj('bn-product-details-edit')"><i class="del_icon"></i>删除</span>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
      <div class="alert" v-if="detailData.isShow">
        <detailEditDialog @closeReset="closeReset1" :detailData="detailData" ></detailEditDialog>
      </div>
 </div>
  <!--</div>-->
</template>
<script>
//  import detailAddDialog from './components/detailAdd.vue'
  import detailEditDialog from './components/detailEdit.vue'
  import appButton from "@/components/commInfo/Button"
  export default {
    components:{
//      detailAddDialog,
      appButton,
      detailEditDialog
    },
    data() {
      return {
        buttonObj:{
          name:"应用列表",
          http:"articleinfo/findinfo",
        },
        keyword:'',
        checked:false,
        detailEditFlag:false,
        detailAddFlag:false,
        detailData:{
          isShow:false,
          content:"",
          classifyName:"家电维修"
        },
        theadsName:[
          '序号',
          '名称',
          '操作'
        ],
        selectorBehindObj: {},
        tableListData:{
        },
      }
    },
    methods: {
      query(){
        let params={params:{
          "pageNum":this.currentPageSize,
          "pageSize":this.showPages,
          "status":this.selectorBehindObj.status,
          "cityId":this.cityId,
          "tel":this.telBind
        }};
        this.getTableList(params);
      },
      wholeSelector(data,currentState){ //全选
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },
      paramsData(){
        return {params: {"pageNum":JSON.stringify(this.showPages),"pageSize":JSON.stringify(this.currentPageSize)}}
      },

      editDetailItem(item,isShow){
        //数据放在这传到弹框里
       isShow.data=item;
       isShow.isShow = true
      },
      deleteDetailItem(item){

        this.$confirm('此操作将删除，是否继续？', '删除详情条目', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url=`${this.$apidomain}/labelbusinessdetails/delete?id=${item.id}`;
          this.$http.get(url).then(r=>{
            let data=r.data;
            if(data.code==="0000"){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getTableList();
            }else{
              this.$message({
                message: data.error,
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作'
          });
        });
      },
      addDetail(){
        this.detailAddFlag = true
      },
      closeReset(){
        this.detailAddFlag= false
      },
      closeReset1(){
        this.detailEditFlag= false
      },
      isCheckbox(data,checkedAll){
        if (!data.checked) {
          this.checked = false;
          return;
        }
        checkedAll.forEach((v, i) => {
          this.checked = v.checked;
        })
      },
      getTableList(params){
        let url=`${this.$apidomain}/labelbusiness/findLabelBusinessByLevel`;
        this.$http.get(url,{params:{"level":2}}).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
        })
      }
    },
    mounted() {

    },
    created(){
      this.getTableList();
    }
  }
</script>

<style scoped lang="scss">
  #app{
    .city{
      padding:0;
    }
    .alert{
      width:100vw;
      height:100vh;
      background:rgba(0,0,0,0.6);
      position:absolute;
      top:0;
      z-index:9999;
      right:0;
      .btn{
        position:absolute;
        bottom:17%;
        left:50%;
        transform:translateX(-50%);
        text-align:center;
        overflow: hidden;
        button{
          width:200px;
          cursor:pointer;
          line-height:44px;
          border:none;
          padding:0;
          margin:0;
          transform: rotate(-360deg);
          border: 1px solid #979797;
          border-radius: 4px;
          float:left;
          background:#fff;
          outline:none;
        }
        .selector{
          color:#fff;
          background: #279447;
        }
      }
    }
    .top_nav{
      font-size:14px;
      width:100%;
      .user_type{
        padding:10px 60px;
        background: #EBDDF6;
        color:#000;
        cursor:pointer;
      }
      .selector{
        background: #A470CD;
        color:#fff;
        font-size:14px;

      }
    }
    >.container{
      font-size:14px;
      width:100%;
      overflow:hidden;
      >.user_sum{
        width:100%;
        height:20px;
        float:left;
        >span{
          margin-right:35px;
          color:blue;
          font-size:14px;
          >b{
            font-weight:normal;
            color:#000;

          }
        }
        >span:last-of-type{
          color:green;
          font-size:14px;
        }

      }
      >.selector_list{
        width:100%;
        overflow: hidden;
        margin-top:40px;
        >.list{
          float:left;
          line-height:60px;
          list-style:none;
          font-size:14px;
          margin-right:5%;

        }
        .el-input{
          width:auto;
        }

        >.list:nth-of-type(3n){
          /*margin-right:0;*/
        }
      }
      .btn_inquiry{
        width:200px;
        height:44px;
        margin:0 auto;
        cursor:pointer;
        margin-top:30px;
        text-align:center;
        line-height:44px;
        background: #A470CD;
        border-radius: 4px;
        color:#fff;
      }
    }
    .dable_lsit{
      margin-top:50px;
      >.paging{
        text-align:right;
        width:100%;
        line-height:50px;
        >input,select{
          width:42px;
          height:20px;
          padding:0;
        }
        >.link_page{
          background: #1C5B94;
          color:#fff;
        }
        .home{
          float:right;
        }
        .last_page{
          color:blue;
          margin-left:10px;
        }
        .el-pagination{
          float:right;
          padding-top:12px;
        }
      }
      margin-bottom:200px;
      table{
        width:100%;
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
            >td:first-of-type{
              border-right:1px solid #ccc;
            }
            >td:last-of-type{
              padding-top:0;
              width:30%;
              padding-bottom:0;
              >span{
                height:100%;
                display: inline-block;
                padding-top:4px;
                padding-left:30px;
                padding-right:30px;
                i{
                  width:16px;
                  vertical-align: middle;
                  height:16px;
                  display: inline-block;
                  margin-right:6px;

                }
              }
            }
          }
          >tr:nth-of-type(even){
            background: #F9FAFC;
          }
        }
      }
      >.derive{
        float:right;
      }
    }
  }
  #city{
    line-height:40px;
  }
  .el-button--text{
    color:#000;
  }
  .el-button--large{
    width:120px;
  }
  .detail-dialog{
    z-index: 301;
  }
  .dialogContent{
    height:500px;
    overflow: scroll;
  }

</style>
