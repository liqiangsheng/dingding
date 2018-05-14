<template>
  <div id="app">
    <div class="top_nav">
      <el-breadcrumb-item :to="{path:'/product/list'}">
        <div
          class="user_type">
          产品管理
        </div>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/product/add'}">
        <div
          class="user_type selector"
        >
          新增/编辑产品
        </div>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/product/category'}">
        <div
          class="user_type"
        >
          产品分类管理
        </div>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/product/charge'}">
        <div
          class="user_type"
        >
          高空费管理
        </div>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <div
          class="user_type"
        >
          控单库存管理
        </div>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/product/detail'}">
        <div
          class="user_type"
        >
          详情管理
        </div>
      </el-breadcrumb-item>
    </div>
    <div class="container">
      <div class="user_sum">
        <span>服务类型</span>
        <span></span>
      </div>
      <div class="dable_lsit">
        <div class="derive">
          <el-button @click="route()" size="large">新增</el-button>
        </div>
        <table cellSpacing="0px" cellpadding="0">
          <thead  >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.productInfos">
            <td>
              {{item.number}}
            </td>
            <td>
              <el-input v-model="item.paretsName" placeholder="请输入配件名称"></el-input>
            </td>
            <td>
              <el-input-number v-model="item.price" :min="0"></el-input-number>
            </td>
            <td>
              <span @click="deleteItem(item.id)"> <i class="el-icon-delete"></i>删除</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import productSum from "./components/productSum.vue"
  export default {
    components:{
      productSum
    },
    data() {
      return {
        radio2: '',
        productType: '',
        theadsName:[
          '序号',
          '配件名称',
          '价格',
          '操作'
        ],
        selectorBehindObj: {},
        tableListData:{
          pageNum:1,
          pageSize:50,
          total:50,
          pageTotal: 1,
          productInfos:[
            {
              id: '1',
              number: '01',
              paretsName:'空调主板',
              price:'30'
            },{
              id: '1',
              number: '01',
              paretsName:'空调主板',
              price:'30'
            },{
              id: '1',
              number: '01',
              paretsName:'空调主板',
              price:'30'
            },{
              id: '1',
              number: '01',
              paretsName:'空调主板',
              price:'30'
            },{
              id: '1',
              number: '01',
              paretsName:'空调主板',
              price:'30'
            },{
              id: '1',
              number: '01',
              paretsName:'空调主板',
              price:'30'
            },{
              id: '1',
              number: '01',
              paretsName:'空调主板',
              price:'30'
            },{
              id: '1',
              number: '01',
              paretsName:'空调主板',
              price:'30'
            }
          ]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0

      }
    },
    methods: {
      changeSelector(value){
        this.options2.forEach((v,i)=>{
          if(value[0]===v.label){
            this.cityId=v.id;    //选择城市
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.cityId=e.id    //选择区
              }
            })
          }
        });
      },
      deleteItem (id){
        this.$confirm('此操作将删除，是否继续？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '下架成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下架操作'
          });
        });
      }
    },
    mounted() {

    },
    created(){
      console.log(this.$route.params.id)

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
                  background:url(../../../static/images/ban.png) center center no-repeat;
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
                  background:url(../../../static/images/detailed.png) center center no-repeat;
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

</style>
