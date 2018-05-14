
<template>
  <div id="app" class="channel-app-box">
    <div class="container">
      <ul>
        <li v-for="(item,index) in option">
          <span class="list_name">{{item.name}} : </span>
          <el-select
            v-model="item.SourceTypeValue" placeholder="请选择" @change="_$.selector({item,value:item.SourceTypeValue,params})">
            <el-option
              v-for="items in item.SourceType"
              :key="items.value"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </li>
        &nbsp;&nbsp;&nbsp;
        <el-button style="padding-left:30px;padding-right:30px;" type="primary" @click="quiry()">查询</el-button>
      </ul>

      <div class="dable_lsit table">
        <!--导出-->
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
              <input type="text" v-model="item.link" ref="contentLink" class="paste_item">
            </td>
            <td>
              {{item.id}}
            </td>
            <td>
              {{item.name}}
            </td>
            <td>
              {{item.details}}
            </td>
            <td>
              {{item.userNumber}}
            </td>
            <td>
              {{item.totalOutput}}
            </td>
            <td>
              {{item.completeCount||0}}
            </td>
            <td>
              {{item.totalWater}}
            </td>
            
            <td style="color:blue;cursor:pointer;" @click="areaDetail(item,index)" class="operate_entry">
              <a :download="item.businessQrCode" :href="item.businessQrCode" style="color:#13CE66"> {{operateName}}</a>
              <a href="javascript:;" class="duplicate" @click="duplicate(index)">复制链接</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components:{
    },
    data() {
      return {
        option:[
          {
            name:"子类渠道",
            key:"channel",
            SourceTypeValue:"",
            SourceType:[]
          }
        ],
        date:{
          startDate:"",
          startEnd:"",
        },
        params:{},
        //查询的date    数据  end
        theadsName:[
          '序号',
          '子渠道编号',
          '子渠道名称',
          '子渠道地址',
          '用户量',
          '总接单量',
          '总完工单量',
          '总流水（元）',
          '二维码'
        ],
        isActive:"0",   //选中的
        operateName:"下载二维码",
        tableListData:[],          //表格数据
      }
    },
    created(){
      this.quiry();
    },
    methods: {
      // 复制链接 start
        duplicate(i){
            const inputValue=this.$refs.contentLink[i];
                  inputValue.select();
                   document.execCommand("copy");
                   this.$queryFun.successAlert.call(this,'复制成功','1')
        },
      // 复制链接 end
      resetting(){
        this.option.forEach((v,i)=>{
          this.option[i].SourceTypeValue="";
        });
        this.params={};
      },
      //      <!--分页查询数据对象功能组合start-->
      quiry(){
        this.getTableList(this.paramsData(this.params));
      },
      paramsData(channel=""){
        return {params: {
          "officialPartnerId":this.$getLocalStorage("enrolleeinfo")[0].id,
           "id":channel.channel
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
      
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal;
        })
      },
//      <!--分页查询数据对象功能组合end-->
      areaDetail(item){
    
      },
    },
    mounted() {
      let params = {params: {
        "officialPartnerId":this.$getLocalStorage("enrolleeinfo")[0].id,
      }};
      let url=this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo";
      this.$http.get(url,params).then(r=>{
        let data=r.data;
                      this.option[0].SourceType.push({"value":"--请选择--",id:""})
        data.result.forEach((e)=>{
          this.option.forEach((v,i)=>{
            if(v.key==="channel"){
              this.option[i].SourceType.push({"value":e.name,"id":e.id})
            }
          });
        });
      })
    },

  }
</script>
<style>
  .el-dialog__wrapper{
    z-index: 9999 !important;
  }
  .el-message-box__wrapper{
    z-index: 9999 !important;
  }
</style>
<style scoped lang="scss">

  @import "../../../assets/styles/comminStyle2";
  @import "../../../assets/styles/Ch_comminStyle";
  #app{
    .container{
      >.selector_list{
        margin-top:0;
      }
      >ul{
        margin-top:40px;
        >li{
          float:left;
        }
      }


    }
    .table {
      #Reminded_icon {
        i {
          background: url(../../../../static/images/del.png) center center no-repeat;
          background-size: 100% 100%;
          width: 14px;
          height: 14px;
        }
      }
      #edit {
        i {
          background: url(../../../../static/images/en.png) center center no-repeat;
          background-size: 100% 100%;
        }
      }
      .child_table{
        tr{
          border:none;
          >.child_table_td{
            border:none;
            padding:10px ;
          }

        }
      }
    }
    .dable_lsit{
      background:#fff;
      padding:20px;
    }

  }

  .alert{
    >p{
      position:absolute;
      top:16%;
      padding:10px 15px;
      cursor: pointer;
      right:22%;
      font-size: 35px;
    }
  }
  .confirm_btn{
    margin-left:50%;
    transform:translateX(-50%);
  }
  .alert_forbidden_text{
    list-style: none;
    >li{
      line-height: 3em;
      border-top:1px solid rgba(0,0,0,.1);
    }
    >li:first-of-type{
      border:none;
    }
    span{
      width:10px;
      /*float:right;*/
      margin-left:20px;
      height:10px;
      display: inline-block;
      background:green;
      border-radius: 50%;
    }
  }

  .alert_forbidden_area{
    width:100%;
    height:60px;
    border:1px solid #c0c0c0;
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

  #city{
    line-height:40px;
  }
  .el-button--text{
    color:#000;
  }
  .el-button--large{
    width:120px;
  }

  .el-dialog__wrapper{
    z-index: 999999;
  }
  .paste_item{
    position:absolute;
    transform:translateX(-1000%);
  }
  .operate_entry{
      >a{
      display:inline-block;
      height:100%;
    }
    >.duplicate{
      padding-left:25px;
    }
  }
</style>






