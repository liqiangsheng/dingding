<template>
<div>
  <el-dialog  ref="dialog" style="z-index:999999"   :visible.sync="data.isShow" size="tiny">
   <div ref="list" class="list" v-for="(item,index) in inputs">
     <inputs-list  :item="item"></inputs-list>
   </div>
    <div class="btnBox">
      <el-button style="width:120px;" class="confirm_btn" @click="data.isShow=false" type="primary">取消</el-button>
      <el-button style="width:120px;" class="confirm_btn" @click="preserve(inputs)" type="primary">保存</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
  export default {
    props: ["data","query"],
    data() {
      return {
        isShow:true,
        inputs:[
          {
            name:"配件名称",
            value:"",
            type:"text",
            key:"name"
          }, {
            name:"价格",
            value:"",
            key:"price",
            type:"number"
          },
        ],
      }
    },
    methods: {
      preserve(inputs){
        let url= `${this.$apidomain}/serviceinfo/saveServiceAreaMountings`,params={};
        inputs.forEach(v=>{
          params[v.key]=v.value;
        });
        params["serviceAreaId"]=this.data.data.id;
        this.$http.post(url,params).then(res=>{
          let data=res.data;
          if(data.code==="0000"){
            this.successAlert("添加成功","1");
            this.query();
            this.data.isShow=false;
          }else{
            this.successAlert(data.error,"0")
          }
        })
      },
      successAlert(text,state){
        if(state==="1"){
          this.$message({
            type: 'success',
            message: text
          });
        }else{
          this.$message({
            type: 'info',
            message: text
          });
        }
      },
    },
    mounted(){
    },
  }
</script>
<style scoped lang="scss">
  .list{
    line-height: 5em;
  }
  .btnBox{
    width:100%;
    margin-top:20px;
    text-align: center;
  }
</style>
