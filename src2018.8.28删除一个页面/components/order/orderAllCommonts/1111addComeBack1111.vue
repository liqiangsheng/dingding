<template>
  <div class="come_back_box">
      <div class="come_back_box_head">
        <button>×</button>
      </div>

      <div class="come_back_box_main">
        <div class="come_back_box_main_select">
          <div>回访主题</div>
            <div class="">
              <select name="" id="">
                <option value="1">取消工单</option>
                <option value="2">投诉工单</option>
                <option value="3">定期回访</option>
              </select>
            </div>
        </div>
      </div>
      <div class="come_back_box_footer">
        <button>创建</button>
      </div>

  </div>
</template>

<script>
  export default {
    props: [],
    components: {

    },
    data() {
      return {

      }
    },
    created() {
      // let url = `${this.$apidomain}/common/findprovinceandcitylist`;
//      this.$http.get(url).then(r => {
//          console.log(r);
//
//      });
    },
    methods: {

    },
  }
</script>
<style scoped lang="scss">
  .come_back_box{
    width:600px;
    height:220px;
    border-radius: 10px;

    .come_back_box_head{
      width: 100%;
      height: 40px;
      position: relative;
      background-color:red;

      button{
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        background-color:forestgreen;
        position: absolute;
        right: 5px;
        top: 5px;
      }
    }

    .come_back_box_main{
      width: 100%;
      height:90px;
      background-color:yellow;

      .come_back_box_main_select{
        width: 60%;
        overflow: hidden;
        margin: 0 auto;
        margin-top:30px;
        div{
          display: inline-block;
        }
        div:nth-of-type(1){
          width:30%;
          height: 100%;
          background-color:red;
        }
        div:nth-of-type(2){
          width: 68%;
          height: 100%;
          background-color:blue;
        }
      }
    }
    .come_back_box_footer{
        width:100%;
        button{
          display: block;
          width: 80px;
          height: 36px;
          line-height: 36px;
          border-radius:6px;
          background-color: red;
          margin:0 auto;
        }
    }
  }
</style>


