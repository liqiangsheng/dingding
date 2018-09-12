<template>
    <div class="accountSt">
        <div class="main-div">
            <div class="account-btn">
                <el-button type="success" @click="open()">新建账号</el-button>
            </div>
            <div  class="table-list">
                <table cellspacing="0" ref="mybox">
                    <thead>
                        <tr>
                            <th v-for="(item,index) in th_list" :key="index">
                                {{item}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in tableListData.list" :key="index">
                            <td>{{index+1}}</td>          <!--序号-->
                            <td>{{item.roleId|roles}}</td>  <!--角色-->
                            <td>{{item.account||"无  "}}</td>     <!--账号-->
                            <td>{{item.linkmanName    }}</td>        <!--真实姓名-->
                            <td>{{item.linkmanTelephone}}</td>         <!--手机号-->
                            <td>{{item.state|states}}</td>       <!--账号状态-->
                            <td>{{item.recentLogin}}</td>        <!--最近登录时间-->
                            <td>
                                <span @click="open_details(item)">详情</span>
                                <span @click="enable(item)">{{item.state|enable}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- 分页 -->
                <Pagination
                :data="pageData"
                :getTableList="getTableList"
                :paramsData="paramsData"
                :tableListData="tableListData"
                ></Pagination>
            </div>
        </div>
        <account-details v-if="details_show" @isDetails="isDetails" :detailsList="detailsList" :getTableList="getTableList"></account-details>
        <new-account-number v-if="account_show" @isClose="isClose" :getTableList="getTableList"></new-account-number>
        <forbidden v-if="isForbidden" @isForbiddens="isForbiddens" :getTableList="getTableList" :forbiddenId="forbiddenId"></forbidden>
    </div>
</template>
<script>
    import accountDetails from "../childrenCanal/add/account_details"          //账号详情
    import newAccountNumber from "../childrenCanal/add/new_account_number"    //新建账号
    import forbidden from "../childrenCanal/add/forbidden"                    //禁用弹框
    export default{
        components:{
           newAccountNumber,accountDetails,forbidden
        },
        data(){
            return{
                details_show:false,    // 账号详情
                account_show:false,    //新增账号
                th_list:["序号","角色","账号","真实姓名","手机号","账号状态","最近登录时间","操作"],
                detailsList:{}, //账号详情
                isForbidden:false, //禁用弹框
                forbiddenId:"",
                //分页
                tableListData:{
                    page:1,
                    rows:20,
                    startRow:0,
                    pageTotal: 1,
                    list:[]
                    },
                    pageData:{
                    size:20,
                    startRow:0,
                    total:0,
                    pageTotal:0,
                    }
            }
        },
        created(){
           this.getTableList()
        },
        methods:{
            //新增账号弹窗
            open(){
                this.account_show = true;
            },
            //接收子组件传值
            isClose(v){
                this.account_show = v;
            },
            paramsData(){

            },
            //请求列表数据
            getTableList(){
                let mainId = JSON.parse(localStorage.getItem("userInfo")).channelId;
                const url =this.$common.apidomain+"/officialPartnerSubsetAccountInfo/findPage?officialPartnerId="+mainId;
                this.$http.get(url).then(res=>{
                    let data = res.data
                    if(data.code==="0000"){
                        console.log(data,"账号管理")
                        this.tableListData=data.result;
                        this.pageData.total = data.result.total;
                        this.pageData.pageTotal = data.result.pages;
                        //console.log(this.tableListData,"账号管理")
                    }else{
                        this.$queryFun.successAlert.call(this,data.error);
                    }
                })
            },
            //详情弹窗
            open_details(data){
               //console.log(this.$refs.mybox.offsetWidth,"表格宽度")
                const url = this.$common.apidomain+"/officialPartnerSubsetAccountInfo/findoneOfficialPartnerSubsetAccountInfo?id="+data.id;
                    this.$http.get(url).then(res=>{
                        let data=res.data
                        if(data.code==="0000"){
                            this.details_show = true;
                            this.detailsList = data.result;
                            //("编辑账号",this.detailsList)
                        }else{
                            this.$queryFun.successAlert.call(this,data.error)
                        }
                    })
            },
            isDetails(v){
                this.details_show = v;
            },
            isForbiddens(v){
                this.isForbidden = v;
            },
            enable(data){
                // this.$confirm('此操作将开启该账号，是否继续？', '开启', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // })
                 let params = {};
                 if(data.state==="2"){
                     params ={
                         "state":"1",
                         "id":data.id
                     }
                 }else{
                     params = {
                         "state":"2",
                         "forbiddenCause":"",
                         "forbiddenRemark":""
                     }
                 }
                 if("2"===data.state){
                    this.$confirm('此操作将开启该账号, 是否继续?', '开启', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            let url = this.$apidomain + "/officialPartnerSubsetAccountInfo/updateSubsetAccountState"
                            this.$http.post(url,params).then(res =>{
                                let data = res.data
                                this.$message({
                                type: 'success',
                                message: '开启成功!'
                               });
                               this.getTableList();
                            })
                        }).catch(() => {

                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                 }else{
                     this.isForbidden = true;
                     this.forbiddenId = data.id;
                 }

            }

        }
    }

</script>
<style scoped lang="scss">
.accountSt,.main-div,.table-list.table{
    width:100%;
}
 .main-div{
     width:100%;
     .account-btn{
       margin-top: 36px;
       margin-left:92%;
     }
     .table-list{
         margin-top: 19px;
         width:100%;
         table{
             width:100%;
             border-left:1px solid #E0E6ED;
             border-bottom:1px solid #E0E6ED;
             font-size:14px;
             color: #393939;
             tr,th{
                 text-align: center;
             }
             tr{
                 height: 45px;
                 td{
                     border-top:1px solid #E0E6ED;
                     border-right:1px solid #E0E6ED;
                     span:hover{
                         cursor: pointer;
                         color:#EA5413;
                     }
                     span:nth-of-type(1){
                         margin-left:-10px;
                     }
                     span:nth-of-type(2){
                         margin-left:30px;
                     }
                 }
                 td:nth-of-type(8){
                     color: #20A0FF;
                 }
             }
             tr:hover{
                 background:#DBF0FF;
             }
             thead{
                 th{
                     height: 44px;
                     background:#E5E9F2;
                 }
                 th:nth-of-type(1){
                      width:60px;
                  }
                  th:nth-of-type(2){
                      width:200px;
                  }
                  th:nth-of-type(3){
                      width:200px;
                  }
                  th:nth-of-type(4){
                      width:102px;
                  }
                  th:nth-of-type(5){
                      width:200px;
                  }
                  th:nth-of-type(6){
                      width:100px;
                  }
                  th:nth-of-type(7){
                      width:240px;
                  }
                  th:nth-of-type(8){
                      width:320px;
                  }
             }
         }
     }

 }


</style>
