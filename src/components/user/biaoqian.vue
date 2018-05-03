<template>
      <div class="biaoqian">
        <div class="biaoqianShowdn">

        </div>
         <div class="biaoqian_box">
                <div class="biaoqian_boxTop">打标签
                </div>

                 <div class="biaoqian_number">
                   <ul>
                     <li v-for="(item,index) in biaoqianArray"><span @click="spanClick(item,index)"
                        :class="{spanActive:spanIndex == index}"></span>
                        <input maxlength=15 minlength=1 type="text" v-model="item.name" @blur.prevent="blurClick(item,index)"/>
                        <span @click="shanchu(item,index)">X</span>
                        <span>({{item.serviceNumber}})</span>
                     </li>

                   </ul>
                   <div v-show="yesShow1" style="position: absolute;left: 30%;top: 30%;width: 40%;height:30%;border: 1px solid #CCCCCC;border-radius: 10px">
                     <p style="width: 100%;text-align: center;line-height:150px;font-size: 16px;">确定删除</p>
                     </br>
                     <el-button @click="addClick1" style="border-left:0;background: #ffffff;position: absolute;right:0;bottom:0;width: 50%;order-radius: 10px">确定</el-button>
                     <el-button @click="quxiaoClick1" style="color:#FFFFFF;border-right:0;background:#279447;position: absolute;right: 49%;bottom: 0;width: 51%;order-radius: 10px">取消</el-button>
                   </div>
                   <div v-show="yesShow" style="position: absolute;left: 30%;top: 30%;width: 40%;height:30%;border: 1px solid #CCCCCC;border-radius: 10px">
                     <p style="width: 100%;text-align: center;line-height:150px;font-size: 16px;">确定修改</p>
                   </br>
                     <el-button @click="addClick" style="border-left:0;background: #ffffff;position: absolute;right:0;bottom:0;width: 50%;order-radius: 10px">确定</el-button>
                     <el-button @click="quxiaoClick" style="color:#FFFFFF;border-right:0;background:#279447;position: absolute;right: 49%;bottom: 0;width: 51%;order-radius: 10px">取消</el-button>
                   </div>
                 </div>
                 <div class="biaoqian_center">
                   <el-input type="text" placeholder="请输入标签名字" v-model="biaoqianName" style="width:15%; margin:2% 2% 1% 2%; height: 38%;"></el-input>
                   <el-button @click="yesClick" style="width:10%; height: 45%;">确定</el-button>
                 </div>
                 <div class="biaoqian_footer">
                    <div>
                      <span @click="OneYesClick">确定</span>
                      <span @click="quxiao">取消</span>
                    </div>

                 </div>
         </div>

      </div>
</template>
<script>
//  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  export default {
    props:{
      str:String    //要传的id
    },
    data(){
      return{
        yesShow:false,
        yesShow1:false,
        vItem :"",
        iIndex:"",
        biaoqianName : "",  //输入的标签
        biaoqianArray : [],//显示的标签
        spanIndex:-1,  //选中的下标
        lableID : "",  // 单选选中的id
        shanchuObj:{},

      }
    },
    created(){
          this.chushihua();
//      let url = common.apidomain+"/userLabel/findlistUserLabel";
//      this.$http.get(url).then((res)=>{
//        this.biaoqianArray = res.data.result
//      })
    },
    methods:{
        chushihua(){
          let url = common.apidomain+"/userLabel/findlistUserLabel";
          this.$http.get(url).then((res)=>{
            this.biaoqianArray = res.data.result
          })
        },

      yesClick(){ //确定的click
        let reg = /^[\u4E00-\u9FA5A-Za-z0-9_]{1,15}$/ig;
           if(this.biaoqianName === ""){
               return this.$queryFun.successAlert.call(this,"标签不能为空")
           }else if(reg.test(this.biaoqianName)){

               var objParms ={}
               objParms.name = this.biaoqianName;
               let url = common.apidomain+"/userLabel/saveUserLabel";
               this.$http.post(url,objParms).then((res)=>{
                   if(res.data.code === "0000"){
                           this.$queryFun.successAlert.call(this,"添加成功","1")
                            this.chushihua();
                   }else{
                             this.biaoqianName = "";
                               return this.$queryFun.successAlert.call(this,res.data.error);
                           }
                       }).catch((error)=>{
                          console.log(error)
                       })
                }else{
                   this.biaoqianName= "";
                   return this.$queryFun.successAlert.call(this," 输入必须为1-15个中文、英文、数字包括下划线")
           }
      },
      OneYesClick(){
        if(this.spanIndex == -1){
          return this.$queryFun.successAlert.call(this,"请选择标签")
        }else{
          let objParmOne = {};
          objParmOne.userIds =this.str;
          objParmOne.labelId =this.lableID;
          let url = common.apidomain+"/userInfo/createUserLabel";
          this.$http.post(url,objParmOne).then((res)=>{
            if(res.data.code === "0000"){
              this.$queryFun.successAlert.call(this,"添加成功","1")
            }else{
              return this.$queryFun.successAlert.call(this,res.data.error)
            }
          }).catch((error)=>{
            this.$queryFun.successAlert.call(this,error)  //弹框
          })
             this.$emit("fouShow",false);
          setTimeout(()=>{
            location.reload();

          },500)

        }
      },
      spanClick(v,i){
         this.spanIndex = i;
         this.lableID = v.id;
      },
      shanchu(v,i){
        this.yesShow1 = true;
//        let shanchuObj = {}
        this.shanchuObj.state = "1";
        this.shanchuObj.id = v.id;

      },
      blurClick(v,i){
        this.vItem = v;
        this.iIndex = i;
//        alert("我是去焦点了")
        this.yesShow = true;

      },
      addClick1(){
        let url = common.apidomain+"/userLabel/updateUserLabel";
        this.$http.post(url,this.shanchuObj).then((res)=>{
          if(res.data.code === "0000"){
            this.$queryFun.successAlert.call(this,"标签删除成功","1");
            this.yesShow1 = false;
            this.chushihua();
          }

        }).catch((error)=>{
          console.log(error)
        })

      },
      addClick(){
        console.log(this.vItem)
        let jiaodianOnj = {};
        jiaodianOnj.id = this.vItem.id;
        jiaodianOnj.name = this.vItem.name;
        let url = common.apidomain+"/userLabel/updateUserLabel";
        this.$http.post(url,jiaodianOnj).then((res)=>{
          console.log(res)
          if(res.data.code === "0000"){
            this.$queryFun.successAlert.call(this,"标签修改成功","1")
            this.chushihua();
          }else{
            let url = common.apidomain+"/userLabel/findlistUserLabel";
            this.$http.get(url).then((res)=>{
              this.biaoqianArray = res.data.result
            })
            return this.$queryFun.successAlert.call(this,res.data.error);

          }
        }).catch((error)=>{
          console.log(error)
        })
        this.yesShow = false;
      },
      quxiaoClick1(){
        this.yesShow1 = false;
        this.$queryFun.successAlert.call(this,"标签取消删除","1")
        this.chushihua();
      },
      quxiaoClick(){
        this.yesShow = false;
        this.$queryFun.successAlert.call(this,"标签取消修改","1")
        this.chushihua();
      },
      quxiao(){
         this.$emit("fouShow",false)

      }
    },
    updata(){
    },
    mounted(){
    }
  }

</script>

<style scoped lang="scss">
  .biaoqian{
    position: absolute;
    left: 0;
    top:0;
    bottom: 0;
    right: 0;
    z-index:9999;
    .biaoqianShowdn{
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.3;
    }
    .biaoqian_box{
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
      .biaoqian_boxTop{
        width: 100%;
        height: 15%;
        text-align: center;
        line-height:300%;
        font-size: 30px;
        background: #ECECEC;
        position: relative;
      }
      .biaoqian_center{
        width:100%;
        height:13%;
        input{
          width:40%;
          margin:2% 4% 1% 2%;
          height: 45%;
          border: 0;
          border: 1px solid #cccccc;
        }
        button{
          background: #ffffff;
          width:10%;
          height: 45%;
          border: 0;
          border: 1px solid #cccccc;
        }
      }
      .biaoqian_number{
        width:96%;
        height:58%;
        padding: 2%;
        overflow-y: auto;
        ul{
          width:100%;
          li{
              width:25%;
              float: left;
            margin-bottom: 20px;
            span{
              color: black;
            }
          }
          span:nth-child(1){
            display: inline-block;
            width: 10px;
            height: 10px;
            border: 1px solid black;
          }
          span:nth-child(1).spanActive{
            background: #279447;
          }

          input{
            display: inline-block;
            width:50%;
            margin:0 5px;
            border: 0;
          }
          span:nth-child(3){
            // margin-right: 5px;
          }
        }
      }
      .biaoqian_footer{
        width:100%;
        height: 20%;
        div{
          width:40%;
          margin-left: 30%;
          height:45%;
          margin-top:1.5%;
          border-radius:5px;
          span{
            display: inline-block;
            width: 50%;
            cursor: pointer;
            line-height: 44px;
            box-sizing: border-box;
            float: left;
            text-align: center;
            background: #279447;
            color: #ffffff;
            border-radius:2px;
          }
          span:nth-child(1){
            background: #fff;
            color: black;
            border: 1px solid #cccccc;
          }
        }
      }
    }


  }

</style>

