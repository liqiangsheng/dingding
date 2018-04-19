<template>
  <div>
    <div class="center">
      <div class="fenlei">一级分类：
        <el-select id="yiiId" v-model="options" filterable placeholder="请选择"  @change="yijifenlei2">
          <el-option
            v-for="(item1,index1) in yijifenlei"
            :key="index1"
            :label="item1.name"
            :value="item1.id">
          </el-option>
        </el-select>
        分　　类:
        <el-cascader id="labelId"
                     @change="changeSelector2"
                     :disabled="isKeXuan"
                     :options="labeloptions2"
                     change-on-select
                     :props="props"
      ></el-cascader>
      </div>

      <ul>
        <li>费用类型：
          <el-select v-model="moneyOption" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in moneyOptions"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </li>
        <li>产品编号：<el-input v-model="input1" placeholder="请输入产品编号" style="width:200px;margin-left: 7px"></el-input></li>
        <li>产品名称：<el-input v-model="input2" placeholder="产品名称" style="width:200px;margin-left: 7px"></el-input></li>
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
              <tr v-for="(item,index) in tableListData.serviceInfos">
                <!--序号-->
                <td>
                {{index+1}}
                </td>
                <!--产品编码-->
                <td>
                {{item.id}}
                </td>
                <!--分类-->
                <td>
                  {{item.labelParentId}}
              </td>
                <!--产品名称-->
                <td>
                {{item.fullName}}
              </td>
                <!--检测费-->
                <td>
                  {{item.price1}}
                </td>
                <!--费用类型-->
                <td>
                  {{item.name}}
                </td>
                <!--金额-->
                <td>
                  {{item.price2}}
                </td>
                  <td>
                    <span @click="accessories(item)" style="cursor:pointer;color:rgba(32,160,255,1);font-family:PingFangSC-Regular;">查看配件</span>
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
        moneyOptions:["检修","小修","中修","大修","服务费"],//费用类型
        moneyOption:"", //选中费用类型
        options:"", //选择项 分类
        input1:"",  // 编号编号
        input2:"",  //产品名称
        theadsName: [
          '序号',
          '产品编码',
          '分类',
          '产品名称',
          "检测费",
          '费用类型',
          '金额（元）',
          '操作',
        ],
        tableListData:{},//列表数据
        showPages: 1, //分页
        currentPageSize: 20, //分页
        total: 0, //分页
        pageTotal: 0, //分页
        selectorBehindObj: { //选择查询数据
         fullName:"",
          labelId:"",
          id:"",
          name:''
      },
      }
    },
    created(){
       this.query();
       let urlOne=this.$common.apidomain+'/common/findflabelbusinessname'; //分类数据请求
        this.$http.get(urlOne).then(res=>{
        this.yijifenlei = res.data.result;
      })
    },
    methods:{
      accessories(v){ //查看配件
        this.$emit("callBack","2")
        this.$store.commit("product",v)
      },
      reset(){ //重置
        this.query();
      },
      yijifenlei2(id){ ////选中分类数据请求
        let urlTwo=this.$common.apidomain+'/articleinfo/findlabelbusinessbyflabel?id='+id;
        this.$http.get(urlTwo).then(res=>{
          if(res.data.code === "0000"){
            this.isKeXuan = false;
            this.labeloptions2=[]
            this.labeloptions2.push(res.data.result)
          }
        })
      },

        query(){ //数据初始化
             this.paramsData();
             this.getTableList(this.paramsData());
          this.$store.commit("fenyeObj",this.paramsData())
        },
      paramsData(){  //传数据给后台
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "fullName":this.selectorBehindObj.fullName,
          "labelId":this.selectorBehindObj.labelId,
          "serviceId":this.selectorBehindObj.id,
          "name":this.selectorBehindObj.name,
        }}
      },
      getTableList(params){ //搜索
        let url=`${this.$apidomain}/serviceinfo/findpage`;
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal;
          let obj={};
          obj.showPages= data.result.pageNo;
          obj.currentPageSize = data.result.pageSize;
          obj.total = data.result.total;
          obj.pageTotal = data.result.pageTotal;
          this.$store.commit("fenyeObj",obj)

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
  }
  .productList table theads{
    width: 100%;
    display: flex;
  }
  .productList table th{
    flex: 1;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(57,57,57,1);
    line-height:20px;
    text-align: center;
  }
  .productList table td{
    height:46px;
    background:rgba(255,255,255,1);
    flex: 1;
    line-height:46px;
    text-align: center;
  }
  .center{
    width:100%;
    height:182px;
    background: #FFFFFF;
    margin-top:2px ;
    padding-top:20px ;
    .fenlei{
      float: left;
      margin: 0 0 20px 5%;

    }
    ul{
      width: 95%;
      display: flex;
      li{
        float: left;
        margin-left: 5%;
      }
    }
    .bnt{
      margin-top: 20px;
      width: 90%;
      margin-left: 10%;
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
