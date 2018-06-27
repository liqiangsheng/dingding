<template>
  <div>
    <div class="center">
      <div class="fenlei">
        分　　类:
        <el-cascader id="labelId"
                     @change="changeSelector2"
                     style="margin-left:14px"
                     :options="labeloptions2"
                     change-on-select
                     :props="props"
        ></el-cascader>
      </div>
      <ul>
        <li>产品名称：
          <el-input v-model.trim="selectorBehindObj.fullName" placeholder="请填写产品名称"
                    style="width:200px;margin-left: 7px"></el-input>
        </li>
        <li>配件名称：
          <el-input v-model.trim="selectorBehindObj.name" placeholder="请填写配件名称"
                    style="width:200px;margin-left: 7px"></el-input>
        </li>
      </ul>
      <div class="bnt">
        <el-button type="primary" @click="query">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>

    <div class="productList">
      <!--表格数据-->
      <table>
        <thead>
        <tr class="theads">
          <th v-for="(item,index) in theadsName">{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableListData.serviceAreaMountings">
          <!--序号-->
          <td style="flex-grow: 0.2">
            {{index+1}}
          </td>
          <!--产品编码-->
          <td>
            {{item.id}}
          </td>
          <!--分类-->
          <td>
            {{item.labelParentId|FLabelBusiness}}
          </td>
          <!--产品名称-->
          <td>
            {{item.serviceName}}
          </td>
          <!--检测费-->
          <!--<td>-->
            <!--{{item.price1}}-->
          <!--</td>-->
          <!--费用类型-->
          <td>
            {{item.name}}
          </td>
          <!--金额-->
          <td>
            {{item.price}}
          </td>
        </tr>
        </tbody>
      </table>
      <!--表格数据结束-->
    </div>
    <!--分页组件-->
    <div class="paging">
      <p class="home">总页数{{tableListData.pageNo}}/{{tableListData.pageTotal}}</p>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes='[20,50,100,200]'
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="showPages"
        :total="total"
        :page-size="currentPageSize"
        :page-count="pageTotal"
      >
      </el-pagination>
      <p class="home last_page cursor" @click="lasePage">尾页</p>
      <p class="home cursor" @click="firstPage">首页</p>
    </div>
    <!--分页组件结束-->
  </div>
</template>

<script>
  export default {
    data(){
      return{
        props: {   //一级分类联动选择
          value: 'a',
          label: "b",
          children: 'beans'
        },
        isKeXuan:true,   // 分类是否可以选择
        labeloptions2: [],
        yijifenlei:[],
        options:"", //选择项 分类
        input1:"",  // 编号编号
        input2:"",  //产品名称
        input3:"",  //配件名称
        theadsName: [
          '序号',
          '配件编码',
          '分类',
          '产品名称',
//          "检测费",
          '配件名称',
          '金额（元）',
        ],
        tableListData:{},//列表数据
        showPages: 1, //分页
        currentPageSize: 20, //分页
        total: 0, //分页
        pageTotal: 0, //分页
        selectorBehindObj: { //选择查询数据
          fullName:"",
          labelId:"",
          name:''
        },
      }
    },
    created(){
      this.query();
      let urlOne=this.$common.apidomain+'/common/findflabelbusinessname'; //分类数据请求
      this.$http.get(urlOne).then(res=>{
        res.data.result.forEach(v => {
          this.yijifenlei2(v.id);
        })
      })
    },
    methods:{
      accessories(){ //查看配件
        this.$emit("callBack","1")
      },
      reset(){ //重置
        this.selectorBehindObj= {fullName:"",labelId:"",name:''};
        this.labeloptions2=[];
        this.options = "";
      },
      yijifenlei2(id){ ////选中分类数据请求
        let urlTwo=this.$common.apidomain+'/articleinfo/findlabelbusinessbyflabel?id='+id;
        this.$http.get(urlTwo).then(res=>{
          if(res.data.code === "0000"){
            this.labeloptions2.push(res.data.result)
          } else {
            this.$queryFun.successAlert.call(this, res.data.error);
          }
        })
      },

      query(){ //数据初始化
        this.paramsData();
        this.getTableList(this.paramsData());
      },
      paramsData(){  //传数据给后台
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "fullName":this.selectorBehindObj.fullName,  //产品名称
          "labelId":this.selectorBehindObj.labelId,//分类id
          "mountingsName":this.selectorBehindObj.name,//产品编号
        }}
      },
      getTableList(params){ //搜索
        let url=`${this.$apidomain}/serviceinfo/findServiceAreaMountingsPage`;
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          if (data.code == "0000") {
            this.tableListData = data.result;
            this.showPages = data.result.pageNo;
            this.currentPageSize = data.result.pageSize;
            this.total = data.result.total;
            this.pageTotal = data.result.pageTotal;

          } else {
            this.$queryFun.successAlert.call(this, r.data.error);
          }
        })
      },
      //分页查询 事件 start
      handleSizeChange(val) {      //每页显示多少条
        this.$queryFun.handleSizeChange.call(this,val)
      },
      handleCurrentChange(val) {
        this.$queryFun.handleCurrentChange.call(this,val)
      },
      firstPage(){
        this.$queryFun.firstPage.call(this)
      },
      lasePage(){
        this.$queryFun.lasePage.call(this)
      },
      changeSelector2(value){
        if(value.length === 1){
          this.selectorBehindObj.labelId=value[0];
        }else if(value.length === 2){
          this.selectorBehindObj.labelId=value[1];
        }else if(value.length === 3){
          this.selectorBehindObj.labelId=value[2];
        }else if(value.length === 4){
          this.selectorBehindObj.labelId=value[3];
        }else if(value.length === 5){
          this.selectorBehindObj.labelId=value[4];
        }else if(value.length === 6){
          this.selectorBehindObj.labelId=value[5];
        }else if(value.length === 7){
          this.selectorBehindObj.labelId=value[6];
        }
      },

    }

  }
</script>

<style scoped lang="scss">
  .productList,.productList table{
    width: 100%;
    background:rgba(229,233,242,1);
  }
  .productList table thead{
    width: 100%;
    tr{
      width: 100%;
      th{
        height:52px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        line-height:52px;
        text-align: center;
      };
    };
  }
  .productList table tbody{
    width: 100%;
    tr{
      width: 100%;
      border-left: 1px solid #bfcbd9;
      background:rgba(255,255,255,1);
      td{
        height:46px;
        line-height:46px;
        text-align: center;
      }
    }
    tr:hover{
      background: #DBF0FF;
    }
    tr:nth-child(2n){
      background:#F7F8FA ;
    }
  }
  .productList table tbody tr:hover{
    background: #DBF0FF;
  }
  .center{
    width:100%;
    /*height:182px;*/
    overflow: hidden;
    background: #FFFFFF;
    margin-top:2px ;
    padding-top:20px ;
    .fenlei{
      float: left;
      margin: 0 0 20px 75px;

    }
    ul{
      width: 95%;
      display: flex;
      li{
        float: left;
        margin-left: 75px;
      }
    }
    .bnt{
      margin: 20px 0;
      width: 90%;
      margin-left: 140px;
      .el-button{
        width:200px;
      }
    }
  }
  .el-pagination{
    float: right;
    margin:12px 0;
    cursor: pointer;
  }
  .home{
    float: right;
    margin: 18px 5px;
  }
  .cursor{
    cursor: pointer;
  }
  .cursor:hover{
    color:rgba(32,160,255,1);
  }

</style>
<style lang="scss">
  #labelId{
    >.el-cascader__label{
      line-height: 36px !important;
    }

  }

</style>
