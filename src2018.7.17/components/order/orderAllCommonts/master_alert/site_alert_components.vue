<template>
  <div id="app">
    <div class="left">
      <table class="leftTable">
        <thead>
         <tr>
           <th v-for="(item,index) in theadList" :key="index">{{item}}</th>
         </tr>
        </thead>
        <tbody>
         <tr v-for="(item,index) in replaceMasterObj" :key="index" :class="{active:flag=index}">
           <td  @click="isCheckbox(item,index)">
             <el-radio style="width:100%;height:100%" class="radio" v-model.trim="replaceMasterObj.radio" :label="index">
               {{v}}
             </el-radio>
           </td>
           <td>
             {{item.name}}
           </td>
           <td v-if="isShow">
             {{item.masternum}}
           </td>
           <td>
             {{item.skills}}
           </td>
           <td>
             {{item.ordernum}}
           </td>
         </tr>
        </tbody>
      </table>
    </div>
    <div class="right">
      <ul>
        <li v-for="(item,index) in infoTableData" :key="index">
          <p>
            <span>服务时间</span>
            <span>{{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}</span>
          </p>
          <p>
            <span>服务地址</span>
            <span>{{item.linkmanDetails}}</span>
          </p>
          <p>
            <span>工单状态</span>
            <span>{{item.state |orderStateShow}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    props:["replaceMasterObj","data","type",'theadList','isShow'],
    data(){
      return{
        flag:3,
        isShowInfo:false,
        theadsName:[
          '选择',
          '网点名称',
          '网点人数',
          '服务技能',
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
        let o = {params:{"workerid":item.id,"type":this.type,"dateStr":this.data.dateStr}};
        let url=this.$apidomain+"/orderquery/findtodayorder";
        this.$http.get(url,o).then(res=>{
          let data = res.data;
          this.infoTableData = data.result;
          this.isShowInfo = true;
        })
        this.data.masterId = item.id;
        this.data.type = this.type;
      },
//      affirm(){ //确认提交
//        alert("确认")
//      },
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
  .left,.right{
    width: 484px;
    float: left;
    margin-right: 10px;
    margin-left: -15px;
    margin-bottom: 100px;
  }
  .left{
    >.leftTable{
      width: 100%;
      //border:1px #C0CCDA solid;
      border-collapse: collapse;
      tr{
        text-align: center;
      }
      thead{
        tr{
          height: 44px;
          background: #F0F0F0;
          th{
            border-right:1px #E0E6ED solid;
          }
        }
      }
      td,tr{border: none}
      tr:nth-of-type(even){
        background: #F8F8F8;
      }
      .active{
       // background: #C6E7FF;
      }
    }
  }
  .right{
    //overflow: auto;
    width: 396px;
    border:1px #E0E6ED solid ;
    margin: 0;
    margin-right: -20px;
    >ul{
      //height: 100%;
      >li{
        width: 100%;
        padding: 14px 0;
        p{
          width:396px;
          display: block;
          padding: 0 13px;
          margin-top: 8px;
          >span{
            display: inline-block;
          }
          >span:nth-of-type(1){
            width: 68px;
            margin-right: 8px;
          }
          span:nth-of-type(2){
            width: 281px;
          }
        }
        p:nth-of-type(2){
          position: relative;
          span:nth-of-type(1){
            position: absolute;
            top:0;
          }
          span:nth-of-type(2){
            margin-left:80px;
          }
        }
        p:nth-of-type(3){
          border-bottom: 1px #E0E6ED solid;
        }
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
          padding:10px 25px;
          text-align:center;
        }
        >td:first-of-type{
          border-right:1px solid #ccc;
          border-left:1px solid #ccc;
          padding:10px 10px;
        }
        >td:last-of-type{
          //display: flex;
          padding-top:0;
          padding-bottom:0;
          border-right:1px solid #ccc;
        }
      }
      >tr:nth-of-type(even){
        background: #F9FAFC;
      }
    }
  }
</style>




