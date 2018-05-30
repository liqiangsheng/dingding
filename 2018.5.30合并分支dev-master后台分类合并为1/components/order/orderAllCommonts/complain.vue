<template>
    <div id="box">
      <el-dialog style="z-index:999999"   :visible.sync="complain.isShow" size="tiny" v-if="complain.isShow">
        <h3>{{complain.title}}</h3>
        <ul class="alert_forbidden_text">
          <li v-for="(item,index) in content.list" :key="index" @click="masterImposeSelector(item,content)">
            {{item.name}} <span v-show="item.selector!='0'"></span>
          </li>
        </ul>
        <textarea placeholder="输入其他原因" class="alert_forbidden_area" v-model="content.textareaContent">
        </textarea>
        <el-button style="position:absolute; width:220px; right:50%; transform:translate(50%,-50% )"
                   @click="confirm(content)" type="primary">确定</el-button>
      </el-dialog>
    </div>
</template>
<script>
  import {clearSelector,getThis} from "@/components/order/js/pagingPages"
    export default {
      props:["complain","quiry"],
        data() {
            return {
              content:""
            }
        },
        methods: {
          confirm(data){
            if(!data.selectorContent){
              alert("请选择原因");
            }
            let url=`${this.$apidomain}/${this.complain.url}`,
                params={"orderId":this.complain.id,"remark":data.textareaContent,"reasonOfComplain":data.selectorContent};
            this.$http.post(url,params).then(r=>{
                let data=r.data;
                if(data.code==='0000'){
                  this.$notify({
                    title: '成功',
                    message: '提交成功',
                    type: 'success'
                  });
                  if(this.quiry){
                    this.quiry();
                  }
                  this.complain.isShow=false;
                }
            })
          },
          masterImposeSelector(item,content){
               clearSelector(content);
              item.selector=!item.selector;
              if(item.selector){
                content.selectorContent=item.name;
              }
            }
        },
      watch:{
        "complain.isShow":function(v,o){
          if(!v){
            clearSelector(this.content);
            this.content.textareaContent='';
            this.content.selectorContent='';
          }
        }
      },
      created() {
        if(this.complain.status==='0'){
          this.content=this.$store.state.content
        }else{
          this.content=this.$store.state.content2
        }
          getThis(this);
        }
    }
</script>
<style scoped lang="scss">
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
    height:100px;
    border:none;
    margin-bottom:30px;
    border:1px solid #ccc;
  }
</style>


