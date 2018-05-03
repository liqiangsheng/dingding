<template>
    <div>
      <el-dialog style="z-index:999999"   :visible.sync="editAlert.isShow" size="tiny">
        <ul class="alert_forbidden_text">

          <li>
              <span class="list_name">积分 : </span>
              <el-input style="width:50%"  v-model="number">
              </el-input>
          </li>
        </ul>
        <div class="btn">
          <el-button @click="editAlert.isShow=false" style="width:100px;" class="confirm_btn" type="primary">取消</el-button>
          <el-button style="width:100px;" @click="subMit(editAlert.data.id,number)" class="confirm_btn" type="primary">确定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
    export default {
      props:["editAlert","quiry"],
        data() {
            return {
              number:""
            }
        },
        methods: {
          subMit(id,number){
            if(number) {
              let url = `${this.$apidomain}/userFriendsShareRecord/changeIntegral`,
                params = {"id": id, "totalCommission": number};
              this.$http.post(url, params).then(res => {
                let data = res.data;
                if (data.code === "0000") {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.quiry();
                  this.editAlert.isShow = false;
                } else {
                  this.$message.error(data.error);
                }
              })
            }else{
              this.$message({
                message: '请填写积分',
                type: 'warning'
              });
            }
          },
        },
        created() {

        }
    }
</script>
<style scoped lang="scss">
  .btn{
    margin-top:30px;
    text-align: center;
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

  }
  .alert_forbidden_area{
    width:100%;
    height:60px;
    border:1px solid #c0c0c0;
  }
  .list_name{
    width:100px;
  }
</style>


