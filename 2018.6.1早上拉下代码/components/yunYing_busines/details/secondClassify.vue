
<template>
  <div id="app">
    <div class="container">
      <p class="closeX" id="closeX" @click="close"></p>
      <!--<h3>工单跟踪</h3>-->
      <div class="content">
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in dataList">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.labelName}}
            </td>
            <td>
              {{item.serviceTotalNum}}
            </td>
            <td>
              {{item.serviceCompleteNum}}
            </td>
            <td>
              {{item.revenue}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="btn">
      <button @click="close">关闭</button>
    </div>
  </div>
</template>

<script>

  export default {
    props:["dailyIsShow"],
    data(){
      return{
        theadsName:[
          '序号',
          '二级类目',
          '下单台数',
          '完工工单台数',
          '营收（元）',
        ],
        dataList:[],
      }
    },
    created(){
      this.quiry();
    },
    methods: {
      quiry(){
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {params: {
          "labelId":this.dailyIsShow.labelId,
          "statisticsDateStartStr":this.dailyIsShow.statisticsDateStartStr,
          "statisticsDateEndStr":this.dailyIsShow.statisticsDateEndStr,
        }}
      },
      getTableList(params){
        let url=`${this.$apidomain}/statisticsOrderSecondClassify/findWithfLabelIdStatisticsOrderSecondClassify`;
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.dataList = data.result;
        })
      },
      close(){
        this.dailyIsShow.isShow=false
      }
    },
    mounted() {

    },
    watch:{

    },

  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
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
    background:green;
    outline:none;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;

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
    >.content{
      margin-top:50px;
      width:100%;
      overflow: auto;
      height: 78%;
      display:flex;
      >div{
        flex:1;
      }
      >.left_info{
        >.title{
          padding-left:10px;
        }
      }
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
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
  ul{
    padding-left:10px;
    list-style:none;
    >li{
      line-height:40px;
    }
    >.edit_open{
      background: #E8D7F6;
      border-radius: 4px;
      padding-left:10px;
      >span{
        height:100%;
        padding:0 10px;
        color:blue;
        cursor: pointer;
        display: inline-block;
      }
      >input{
        width:50px;
        border:none;
        outline:none;
      }
    }
  }
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
              background:url(../../../../static/images/ban.png) center center no-repeat;
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
              background:url(../../../../static/images/detailed.png) center center no-repeat;
              background-size:100% 100%;
            }
          }
          >.Reminded_icon{
            i{
              background:url(../../../../static/images/Reminded.png) center center no-repeat;
              background-size:100% 100%;
            }
          }
          >.recover{
            i{
              background:url(../../../../static/images/recover.png) center center no-repeat;
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
  .closeX{
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
</style>
<style lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }
</style>




