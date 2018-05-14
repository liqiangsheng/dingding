<template>
  <div class="alert_occlusion">
    <div class="come_back_box">
      <div class="come_back_box_head">
        <div @click="alert_occlusion_show_colse">
          X
        </div>
      </div>

      <div class="come_back_box_main">
        <div class="main_center">
          <div class="main_center_left">回访主题</div>
          <div class="main_center_right">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div class="come_back_box_footer">
        <div class="come_back_box_footer_btn" @click="come_back_box_footer_btn">
          <el-button type="primary" round> 创 建</el-button>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    components: {},
    props:['arrdata'],
    data() {
      return {
        alert_occlusion_show: true,//弹出框的显示与隐藏
        options: [{
          value: '1',
          label: '取消工单'
        }, {
          value: '2',
          label: '投诉工单'
        }, {
          value: '3',
          label: '定期回访'
        }],
        value: ''
      }
    },
    watch: {},
    computed: {},
    created() {
      // let url = `${this.$apidomain}/common/findprovinceandcitylist`;
//      this.$http.get(url).then(r => {
//          console.log(r);
//
//      });
      console.log(this.l_radio_whole);
    },
    methods: {
      alert_occlusion_show_colse(){ //关闭弹出窗
        this.alert_occlusion_show = false;
        this.$emit("addComeBackShow", this.alert_occlusion_show)
      },
      come_back_box_footer_btn(){
        /*
         * 创建回访
         * type:post
         * testUrl:http://192.168.20.42:801/udesk/tickets
         * url:http://admin.test.dingdingkuaixiu.com/udesk/tickets
         * req:{}   //"{"type":"201712051856200039765312,201712051713530030812765","ids":"3"}"     type是点多少添加多少，以逗号区分，ids是select的选项
         * res: '0000'/成功
         * */
          var _this=this,data={type:this.arrdata.join(','),ids:this.value};
          if(!_this.value){
            _this.$message({
              message: "请选择创回访主题",
              type:'warning'
            });
          }else{
            console.log(data);
            _this.$http.post(`${_this.$apidomain}/udesk/tickets`,data).then((data)=>{
              console.log(data);
              if(data.data.code=='0000'){
                _this.alert_occlusion_show_colse();//关闭弹窗
                _this.$message({
                  message: "创建成功",
                  type:'success'
                });
              }else if(data.data.code=='1001'){
                _this.$message({
                  message: "网络不给力,请重试...",
                  type:'warning'
                });
              }
            }).catch((err)=>{
              console.log(err);
              _this.$message({
                message: "创建失败,请稍后再试",
                type:'warning'
              });
            });
          }



      }
    },
  }
</script>
<style scoped lang="scss">
  .alert_occlusion {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(51, 55, 68, .6);
  }

  .come_back_box {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -110px;
    margin-left: -300px;
    width: 600px;
    height: 240px;
    border-radius: 10px;
    background-color: #fff;

  .come_back_box_head {
    width: 100%;
    height: 40px;
    position: relative;

  div:nth-of-type(1) {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    text-align: center;
    color:#fff;
    background-color: #2c3e50;
  }

  }

  .come_back_box_main {
    width: 100%;
    height: 90px;

  .main_center {
    width: 60%;
    margin: 0 auto;
    margin-top: 30px;

  div {
    display: inline-block;
  }

  .main_center_left {
    width: 30%;
    text-align: center;
    font-size: 14px;
  }

  .main_center_right {
    width: 68%;
  }

  }

  }

  .come_back_box_footer {
    width: 100%;
    height: 60px;

  .come_back_box_footer_btn {
    width: 120px;
    height: 40px;
    margin: 10px auto;

  button {
    width: 100%;
  }

  }
  }

  }
</style>


