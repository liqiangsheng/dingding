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
        <li>费用类型：
          <el-select v-model.trim="selectorBehindObj.name" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in moneyOptions"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </li>
        <li>产品编号：
          <el-input v-model.trim="selectorBehindObj.id" placeholder="请填写产品编号"
                    style="width:200px;margin-left: 7px"></el-input>
        </li>
        <li>产品名称：
          <el-input v-model.trim="selectorBehindObj.fullName" placeholder="产品名称"
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
              <tr v-for="(item,index) in tableListData.list">
                <!--序号-->
                <td style="flex-grow: 0.5">
                {{index+1}}
                </td>
                <!--产品编码-->
                <td>
                {{item.serviceId}}
                </td>
                <!--分类-->
                <td>
                  {{item.labelBusinessName}}
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
      <p class="home">总页数{{tableListData.pageNum}}/{{tableListData.pages}}</p>
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
      <p class="home last_page" @click="lasePage">尾页</p>
      <p class="home" @click="firstPage">首页</p>
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
    beforeRouteEnter(to,from,next){
      next(Vue=>{
        Vue.query();
      })
    },
    beforeRouterLeave(to,from,next){
      next()
    },
    created(){
      console.log(JSON.parse(localStorage.getItem('userInfo')).channelId)
       this.query();
       let urlOne=this.$common.apidomain+'/common/findflabelbusinessname'; //分类数据请求
        this.$http.get(urlOne).then(res=>{
          res.data.result.forEach((v, i) => {
            this.yijifenlei2(v.id)
          })
      })
    },
    methods:{
      accessories(v){ //查看配件
        this.$emit("callBack","2")
        this.$store.commit("product",v)
      },
      reset(){ //重置
        this.selectorBehindObj = {fullName:"",labelId:"",id:"", name:''};
        this.moneyOption = "";
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
             this.$store.commit("fenyeObj",this.paramsData())
        },
      paramsData(){  //传数据给后台
        return {params: {
          "page":JSON.stringify(this.showPages),
          "rows":JSON.stringify(this.currentPageSize),
          "channelId":JSON.parse(localStorage.getItem('userInfo')).channelId, //渠道名称
          "fullName":this.selectorBehindObj.fullName,  //产品名称
          "labelId":this.selectorBehindObj.labelId,//分类id
          "serviceId":this.selectorBehindObj.id,//产品编号
          "name":this.selectorBehindObj.name,//费用类型
          "state":"1", // 状态 已上架
        }}
      },
      getTableList(params){ //搜索
        let url=`${this.$apidomain}/serviceareainfo/finServicePage`;
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          if (data.code == "0000") {
            this.tableListData = data.result;
            this.showPages = data.result.pageNum;
            this.currentPageSize = data.result.pageSize;
            this.total = data.result.total;
            this.pageTotal = data.result.pageTotal;
            let obj = {};
            obj.showPages = data.result.pageNum;
            obj.currentPageSize = data.result.pageSize;
            obj.total = data.result.total;
            obj.pageTotal = data.result.pages;
            this.$store.commit("fenyeObj", obj)

          } else {
            this.$queryFun.successAlert.call(this, data.error);
          }
        })
      },
      //分页查询 事件 start
      handleSizeChange(val) {      //每页显示多少条
        this.currentPageSize=val;
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.getTableList(params);
      },
      handleCurrentChange(val) {
        this.showPages=val;
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        if(this.tableListData.list.length !==0){
          this.getTableList(params);
        }
      },
      firstPage(){
        if(  this.showPages===1 ){
          return alert("已经是第一页")
        }
        this.showPages=1;     //第一页
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.getTableList(params);
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.showPages=this.pageTotal; //最后一页
        this.getTableList(params);
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
    background: #FFFFFF;
    margin-top:2px ;
    padding-top:20px ;
    overflow: hidden;
    .fenlei{
      float: left;
      margin: 0 0 20px 75px;
    }
    ul{
      width: 95%;
      display: flex;
      li{
        float: left;
        margin-left:75px;
      }
    }
    .bnt{
      margin: 20px 0;
      width: 91%;
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
