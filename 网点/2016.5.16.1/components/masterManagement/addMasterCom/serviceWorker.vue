<template>
  <div class="addMasterList">
    <C_header title="服务工种" leftName="取消" rightName="完成"></C_header>
    <div class="workerList">
      <ul>
        <li v-for="(item,index) in workerList" :key="index">
          <div>
            <p>
              {{item.label}}
              <span @click="selectClass(item,index)">
                      <i :class="{i:true,isSelect_icon:true}"></i>
                     </span>
            </p>
            <div>
              <p v-for="(d,index) in item.cities" :key="index" class="workChild" v-if="isSelect">
                    <span>
                      <i class="i SelectChild_icon"></i>
                     </span>
                {{d.label}}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        isSelect: false,
        workerList: []
      }
    },
    created() {
      this.getWorkList();
    },
    methods: {
      //服务工种数据
      getWorkList() {
        let url = this.$common.apidomain + "/common/findlabelbusinessoptions"  //服务工种列表
        this.$http.get(url).then(res => {
          let data = res.data;
          if (data.code === "0000") {
            this.workerList = data.result;
            this.workerList.forEach((v, i) => {
              v.cities.forEach((j, k) => {
                j.label = j.label.substring(5);
              })
            });
            console.log(this.workerList)
          } else {
            this.$Toast(data.error)
          }
        })
      },
      //选择大类
      selectClass(item, index) {

      }
    }
  }
</script>
<style scoped lang="less">
  .addMasterList {
    width: 100%;
    //height: 100%;
    position: absolute;
    top: -.96rem;
    background: #F1F1F1;
    .workerList {
      margin-top: .3rem;
      padding: 0 .25rem;
      ul > li {
        width: 100%;
        margin-bottom: .16rem;
        background: rgba(255, 255, 255, 1);
        border-radius: .08rem;
        > div {
          position: relative;
          width: 100%;
          > p:nth-of-type(1) {
            height: 1.1rem;
            //background: red;
            padding: .29rem .34rem .31rem .41rem;
            width: 100%;
            font-size: .36rem;
            font-family: PingFangSC-Regular;
            color: rgba(57, 57, 57, 1);
            line-height: .5rem;

            > span {
              color: green;
              position: absolute;
              right: .33rem;
              top: .2rem;
              width: .44rem;
              height: .44rem;
              > .isSelect_icon {
                background: url(../../../assets/images/select.png) center center no-repeat;
                background-size: 100% 100%;
                width: 100%;
                height: 100%;
                top: .33rem;
                right: .34rem;
              }
            }
          }
          > div {
            .workChild {
              padding-bottom: .42rem;
              position: relative;
              margin-top: .16rem;
              display: inline-block;
              margin-left: .08rem;
              width: 2.2rem;
              height: .8rem;
              line-height: .8rem;
              font-size: .28rem;
              background: rgba(255, 255, 255, 1);
              border: .01rem solid RGBA(220, 220, 220, 1);
              color: rgba(57, 57, 57, 1);
              text-align: center;
              border-radius: .08rem;
              > span {
                position: absolute;
                width: .26rem;
                height: .26rem;
                top: .27rem;
                left: .13rem;
                //background: red;
                > .SelectChild_icon {
                  background: url(../../../assets/images/selectChilds.png) center center no-repeat;
                  background-size: 100% 100%;
                  width: 100%;
                  height: 100%;
                  top: .13rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
