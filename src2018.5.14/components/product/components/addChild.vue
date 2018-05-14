
<template>
  <div>
    <el-dialog style="z-index:999999"   :visible.sync="data.isShow" size="mini">
      <div class="list">
        <div class="list_name">
          类目名称 :
        </div>
        <el-input v-model="selectorBehindObj.name"></el-input>
      </div>
      <div class="list">
        <div class="list_name">
          末级分类 :
        </div>
        <el-radio-group v-model="selectorBehindObj.isEnd">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </div>


      <div class="list" v-show="!selectorBehindObj.isEnd">
        <div class="list_name">子级标题 :
        </div>
        <el-input v-model="selectorBehindObj.sublevelTitle"></el-input>
      </div>
      <div class="btnBox">
        <el-button style="width:120px;" class="confirm_btn" @click="cancel(data)" type="primary">取消</el-button>
        <el-button style="width:120px;" class="confirm_btn" @click="preserveSubmit()" type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import queryFun from "@/components/commonJs/queryFun"
  export default {
    props:["data","query"],
    data() {
      return {
        selectorBehindObj:{
          "name":"",
          "isEnd":0,
          "sublevelTitle":"",
          "id":this.data.id
        },

      }
    },
    watch:{

    },
    mounted(){
    },
    methods: {
      preserveSubmit(){
        if(!this.selectorBehindObj.name){return this.$queryFun.successAlert.call(this,"请输入分类名称","0")}else if(!this.selectorBehindObj.isEnd){
          if(!this.selectorBehindObj.sublevelTitle)return this.$queryFun.successAlert.call(this,"请输入子类名称","0");
        };
        let url=`${this.$apidomain}/labelbusiness/save`;
        this.$http.post(url,this.selectorBehindObj).then(r=>{
          let data=r.data;
          if(data.code==="0000"){
                  this.$queryFun.successAlert.call(this,"新增成功","1");
                  this.query();
                  this.data.isShow=false;
                }else{
                  this.$queryFun.successAlert.call(this,data.error,"0");
              }
              });
      },
      cancel(data){
        data.isShow=false;
      },

    },
    created() {
//      this.city.SourceTypeValue=this.data.data.areaInfos[0].areaName;
//      this.selectorBehindObj.cityId=this.data.data.areaInfos[0].areaId;
    }
  }
</script>
<style scoped lang="scss">
  .edit_list_name{
    >li{
      line-height: 2.5em;
    }
  }

 .list{

   margin:0 80px 30px 40px;
 }
  .btnBox{
    width:100%;
    margin-top:20px;
    text-align: center;
  }
  .el-dialog__body{
    padding-top:0 !important;
  }
</style>



