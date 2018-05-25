<template>
  <div id="app">
    <div class="top_nav">
      <el-breadcrumb-item :to="{path:'/sitemaster/list'}">
        <div
          class="user_type">
          师傅列表
        </div>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/sitemaster/vacate'}">
        <div
          class="user_type"
        >
          请假申请
        </div>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/sitemaster/profession'}">
        <div
          class="user_type selector"
        >
          业务信息
        </div>
      </el-breadcrumb-item>
    </div>
    <div class="container">
      <el-card>
        <div class="dable_lsit">
          <table cellSpacing="0px" cellpadding="0">
            <thead  >
            <tr class="theads">
              <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tableListData.productInfos">
              <td>
                {{item.serialNumber}}
              </td>
              <td>
                {{item.workOrderNumber}}
              </td>
              <td>
                {{item.contactPerson}}
              </td>
              <td>
                {{item.mobile}}
              </td>
              <td>
                {{item.serviceRegion}}
              </td>
              <td>
                {{item.time}}
              </td>
              <td>
                {{item.category}}
              </td>
              <td>
                {{item.order}}
              </td>
              <td>
                <span @click="refuse(item)"> <i></i>禁用</span>
                <span @click="viewDteail(item)"> <i></i>查看详情</span>
              </td>
            </tr>
            </tbody>
          </table>
          <el-pagination
            :current-page.sync="currentPage1"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </el-card>

    </div>
    <hsy-dialog class="confirm monitor-dialog" v-model="professionFlag" :closeButton="false" :clickMask2Close="false">
      <div slot="title">业务信息</div>
      <div class="dialogContent" slot="body">
        <professionDetail @closeReset="closeReset" :queryId="id"></professionDetail>
      </div>
    </hsy-dialog>
  </div>
</template>
<script>
  import professionDetail from './components/professionDetail.vue'
  export default {
    components:{
      professionDetail
    },
    data() {
      return {
        currentPage1:1,
        professionFlag:false,
        id:'',
        value: '',
        theadsName:[
          '序号',
          '工单号',
          '联系人',
          '下单手机',
          '服务区域',
          '预约时间',
          '分类时间',
          '下单时间',
          '操作'
        ],
        tableListData:{
          pageNum:1,
          pageSize:50,
          total:50,
          pageTotal: 1,
          productInfos:[
            {
              id: '1',
              serialNumber:"01",
              workOrderNumber:'0002',
              contactPerson:'联系人',
              mobile:'11111111',
              serviceRegion:'神准',
              time:'2019-01-01',
              category:'空调',
              order:'2019-01-01'
            },{
              id: '1',
              serialNumber:"01",
              workOrderNumber:'0002',
              contactPerson:'联系人',
              mobile:'11111111',
              serviceRegion:'神准',
              time:'2019-01-01',
              category:'空调',
              order:'2019-01-01'
            },{
              id: '1',
              serialNumber:"01",
              workOrderNumber:'0002',
              contactPerson:'联系人',
              mobile:'11111111',
              serviceRegion:'神准',
              time:'2019-01-01',
              category:'空调',
              order:'2019-01-01'
            },{
              id: '1',
              serialNumber:"01",
              workOrderNumber:'0002',
              contactPerson:'联系人',
              mobile:'11111111',
              serviceRegion:'神准',
              time:'2019-01-01',
              category:'空调',
              order:'2019-01-01'
            },{
              id: '1',
              serialNumber:"01",
              workOrderNumber:'0002',
              contactPerson:'联系人',
              mobile:'11111111',
              serviceRegion:'神准',
              time:'2019-01-01',
              category:'空调',
              order:'2019-01-01'
            },{
              id: '1',
              serialNumber:"01",
              workOrderNumber:'0002',
              contactPerson:'联系人',
              mobile:'11111111',
              serviceRegion:'神准',
              time:'2019-01-01',
              category:'空调',
              order:'2019-01-01'
            },{
              id: '1',
              serialNumber:"01",
              workOrderNumber:'0002',
              contactPerson:'联系人',
              mobile:'11111111',
              serviceRegion:'神准',
              time:'2019-01-01',
              category:'空调',
              order:'2019-01-01'
            },{
              id: '1',
              serialNumber:"01",
              workOrderNumber:'0002',
              contactPerson:'联系人',
              mobile:'11111111',
              serviceRegion:'神准',
              time:'2019-01-01',
              category:'空调',
              order:'2019-01-01'
            }
          ]
        },
      }
    },
    methods: {
      viewDteail(item){
        this.id = item.id
        this.professionFlag = true
      },
      closeReset(){
        this.professionFlag = false
      }
    },
    mounted() {

    },
    created(){

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
              padding-bottom:0;
              >span{
                height:100%;
                float:left;
                padding-top:4px;

                padding-left:30px;
                i{
                  width:16px;
                  height:16px;
                  background-size:100% 100%;
                  float:left;
                  margin-right:3px;

                  vertical-align: middle;
                }
              }
              >span:last-of-type{
                float:right;
                padding-left:0px;
                padding-top:8px;
                padding-right:20px;
                cursor:pointer;
                i{
                  width:16px;
                  height:16px;
                  margin-top:3px;
                  background-size:100% 100%;
                  float:left;
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
  .monitor-dialog{
    z-index: 300;
  }
  .dialogContent{
    height:500px;
    overflow: scroll;
  }
</style>
