<template>
  <div id="app">
    <div class="container">

      <h3>{{isDetailed.title}}</h3>
      <div class="content">
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in dataObj">
            <td :class="{red:item.state=='05'||item.state=='06'}">
              {{item.state|orderStateShow}}
            </td>
            <td>
              {{item.id}}
            </td>
            <td>
              {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.linkmanName}}
            </td>
            <td>
              {{item.linkmanPhoneNum}}
            </td>
            <td>
              {{item.linkmanArea}}
            </td>
            <td>
              {{item.linkmanDetails}}
            </td>
            <td>
              {{item.fLabelBusiness|FLabelBusinessShow}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p class="closeX" @click="close"></p>
    <div class="btn">
      <button @click="close">关闭</button>
    </div>
  </div>
</template>

<script>
  export default {
    props:['isDetailed','quiry'],
    data(){
      return {
        theadsName:[
          '订单状态',
          '订单号',
          '预约时间',
          '客户姓名',
          '手机号',
          '服务区域',
          '服务地址',
          '服务类型'
        ],
        dataObj:[],
      }
    },
    created(){
      let url=this.$apidomain+"/orderquery/findtodayorder";
      this.$http.get(url,this.paramsData()).then(res=>{
        let data = res.data;
        this.dataObj = data.result;
      })
    },
    methods: {
      paramsData(){
        return {params: {
          "workerid":this.isDetailed.masterId,
          "type":"2",
        }}
      },
      //编辑模块结束
      close(){
        this.isDetailed.isShow=false
        this.$store.commit("edit",false);
      },
    },
    mounted() {

    },
    watch:{

    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/styles/commButton";
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
    >.content{

      width:100%;
      overflow-x: auto;
      display:flex;
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
          >li{
            /*text-align: right;*/
            margin-top:20px;
            .files{
              display: flex;
              flex-wrap:wrap;
              padding:0;
              >li{
                width:50%;
                height:auto;
                margin-bottom:30px;
                >input{

                }
                >img{
                  display: block;
                  width:270px;
                  height: 130px;
                }
              }
            }
          }
        }
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
  .file {
    position: relative;
    display: block;

    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    width:280px;
    height: 140px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    width:100%;
    height: 100%;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
  table{
    width:100vW;
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
              background:url(../../../../../static/images/ban.png) center center no-repeat;
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
              background:url(../../../../../static/images/detailed.png) center center no-repeat;
              background-size:100% 100%;
            }
          }
          >.Reminded_icon{
            i{
              background:url(../../../../../static/images/Reminded.png) center center no-repeat;
              background-size:100% 100%;
            }
          }
          >.recover{
            i{
              background:url(../../../../../static/images/recover.png) center center no-repeat;
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
    background:url(../../../../../static/images/del.png) center center no-repeat;
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


