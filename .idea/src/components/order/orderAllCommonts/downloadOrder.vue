<template>
  <div id="app">
    <div class="container">
      <h3>{{isDownloadOrder.title}}</h3>
      <div class="content">
        <div class="left_info">
          <p class="title">{{isDownloadOrder.title}}</p>
          <ul>
            <li >
              导出时间：
              <el-date-picker
                id="date"
                style="width:500px;"
                v-model="value4"
                type="daterange"
                :picker-options="pickerOptions2"
                placeholder="选择时间范围"
                align="right">
              </el-date-picker>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="closeX" @click="orderClose(isDownloadOrder)"></p>
    <div class="btn">
      <button @click="orderClose(isDownloadOrder)">取消</button>
      <button @click="quiry" class="selector">下载</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["isDownloadOrder"],
    components: {
    },
    data() {
      return {
        Date:"",
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value4: ''
      }
    },
    created() {

    },
    methods: {
      //取消完成按钮操作；
      orderClose(isShow) {
        isShow.isShow = false;
      },
      quiry(){
        let arr = this.getDateArray();
        arr.forEach((v,i)=>{
          let url=`${this.$apiCSV}/OrderExcel/${v}.csv`;
          try{
            var elemIF = document.createElement("iframe");
            elemIF.src = url;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
          }catch(e){
            console.log(e);
          }
        });
      },
      getDateArray(){
        let arr = [];
        if(this.value4&&this.value4.length>0){
          let startTime = new Date(this.value4[0]);
          let endTime = new Date(this.value4[1]);
          while((endTime.getTime()-startTime.getTime())>=0){
            arr.push(this.$moment(startTime).format("YYYYMMDD"));
            startTime.setDate(startTime.getDate()+1);
          }
        }
        return arr;
      },
    },
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
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
    line-height:3.2em;
     padding-left:10px;
     letter-spacing: 0;
   }
  >.content{

     width:100%;
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

   >.position{
    float:left;
    }
    >.position:first-of-type{
    float:none;
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
  .el-select{
    width: 85px;
  }
  table{
    width:100%;
  .theads{
  >th{
     padding:4px 10px;
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
     padding:4px 10px;
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
     height:100%;
     padding-top:4px;
  i{
    width:16px;
    height:16px;
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
  }
  >.Reminded_icon{
  i{
    display: inline-block;
    background:url(../../../../static/images/del.png) center center no-repeat;
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
<style  lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 99999 !important;
  }
.left_info ul > li > .el-cascader .el-cascader__label{
  line-height: 40px !important;
}
</style>


