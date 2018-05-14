<template>
  <div id="app">

          <div class="content">
            <table cellSpacing="0px" cellpadding="0">
              <thead>
              <tr class="theads">
                <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in replaceMasterObj">
                <td  @click="isCheckbox(item,index)">
                  <el-radio style="width:100%;height:100%"  class="radio" v-model="replaceMasterObj.radio" :label="index">{{v}}</el-radio>
                </td>
                <td>
                  {{item.name}}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="content">
            <table cellSpacing="0px" cellpadding="0" v-if="isShowInfo">
              <thead>
              <tr class="theads">
                <th v-for="(item,index) in rightTheadsName" :key="index">{{item}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in infoTableData">
                <td v-show="false"></td>
                <td>
                  {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}
                </td>
                <td>
                  {{item.id}}
                </td>
                <td>
                  {{item.state|orderStateShow}}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
    <!--<div id="btn">-->
      <!--<el-button @click="affirm" style="position:absolute;bottom:-50%;left:2%" type="primary" size="large">确认</el-button>-->
    <!--</div>-->
  </div>
</template>

<script>

  export default {
    props:["replaceMasterObj","data","type"],
    data(){
      return{
        isShowInfo:false,
        theadsName:[
          '选择',
          '师傅名称',
        ],
        rightTheadsName:[
          '预约时间',
          '工单号',
          '工单状态',
        ],
        v:"",//站位符
        infoTableData:[],
      }
    },
    methods: {
      isCheckbox(item,index){
        let o = {params:{"workerid":item.id,"type":"1"}};
        let url=this.$apidomain+"/orderquery/findtodayorder";
        this.$http.get(url,o).then(res=>{
          let data = res.data;
          this.infoTableData = data.result;
          this.isShowInfo = true;
        })
        this.data.masterId = item.id;
        this.data.type = this.type;
      },
      affirm(){ //确认提交
        alert("确认")
      },
    },
    mounted() {

    },
    watch:{

    },
    created(){
    }
  }
</script>

<style scoped lang="scss">
  .el-tabs--border-card{
    height:100%;
  }
  h3{
    text-align: center;
    line-height: 5em;
  }
  .el-input{
    width:217px;
  }
  button{
    width:200px;
    cursor:pointer;
    line-height:44px;
    border:none;
    padding:0;
    margin:0;
    color:#fff;
    transform: rotate(-360deg);
    border: 1px solid #979797;
    border-radius: 4px;
    float:left;
    display: flex;
    background:green;
    outline:none;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    overflow-y: auto;
    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:70%;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    .content{
      float:left;
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
    .content:last-of-type{
      float:right;
      .header_title{
        overflow: hidden;
        padding-bottom:20px;
        > p{
          margin-right:20%;
        }
      }
    }
    .consume_info{
      padding-bottom:200px;
      position:relative;
      >.title{
        padding-left:10px;
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }

    }
  }
  table{
    margin-right:60px;
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
          //display: flex;
          padding-top:0;
          padding-bottom:0;

        }
      }
      >tr:nth-of-type(even){
        background: #F9FAFC;
      }
    }
  }
  table:last-of-type{

  }
  .header_title{
    overflow: hidden;
  }
</style>




