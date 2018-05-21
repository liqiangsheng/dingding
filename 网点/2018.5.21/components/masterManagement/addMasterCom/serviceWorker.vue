<template>
  <div class="addMasterList">
    <C_header title="服务工种" right_number="1" :reset='resetWorker' left_number='2'></C_header>
    <div class="workerList">
      <ul>
        <li v-for="(item,indexs) in workerList" :key="indexs">
          <div>
            <p @click="showAll(indexs)">
              {{item.label}}
              <span @click="selectClass(item,indexs)">
                      <i class="i isSelect_icon"
                         :class="{isSelected_icon:flag[indexs],isReduce_icon:isReduce[indexs]}"></i>
              </span>
            </p>
            <!-- -->
            <div v-if="subShow === indexs">
              <p v-for="(d,index) in item.cities" :key="index" class="workChild" @click="selectChild(d,indexs,index)">
                     <span>
                       <i :class="{i:true, SelectChild_icon:true,SelectChilded_icon:flag_show[indexs][index]}"></i>
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
        isReduce: [],       //判断大类部分选中
        workerList: [],
        flag: [],           //判断大类全选
        flag_show: [],      //小类选中状态
        selected: false,
        selectedChild: false,
        selectData: [],      //选中的数据,传给后台
        selectLabel: [],
        subShow: '',
        workerDetailsId: [],      //上一次选中的小类状态
        secondId: []
      }
    },
    created() {
      this.getWorkList();
    },
    watch: {},
    methods: {
      //服务工种数据
      getWorkList() {
        this.workerDetailsId = this.$store.getters.serviceWorker.id;
        console.log(this.workerDetailsId, '上一次选中的小类')
        let url = this.$common.apidomain + "/common/findlabelbusinessoptions";  //服务工种列表
        this.$http.get(url).then(res => {
          let data = res.data;
          if (data.code === "0000") {
            this.workerList = data.result;
            this.workerList.forEach((v, i) => {
              this.flag_show.push([]);
              v.cities.forEach((j, k) => {
                j.label = j.label.substring(5);
                var len = this.workerDetailsId.length;
                if (len != 0) {
                  this.workerDetailsId.forEach((m, n) => {
                    if (j.id === m) {
                      this.$set(this.flag_show[i], k, true);
                      this.selectData.push(j.id);
                      this.selectLabel.push(j.label);
                    }
                  })
                } else {
                  return;
                }
              })
            });
            //判断大类选中状态
            this.flag_show.forEach((v, i) => {
              v.forEach((m, n) => {
                var sumValue = 0;
                var itemsLength = this.workerList[i].cities.length;
                for (var j = 0; j < itemsLength; j++) {
                  var itemValue = 0;
                  var item = this.flag_show[i][j];
                  if (item) {
                    itemValue = 1;
                  }
                  sumValue += itemValue;
                }
                var isSelectAll = '';
                if (sumValue === 0) {
                  isSelectAll = '0';
                } else if (sumValue === itemsLength) {
                  isSelectAll = '1'
                } else {
                  isSelectAll = '2'
                }
                if (isSelectAll === '0') {
                  this.$set(this.isReduce, i, false)
                  this.$set(this.flag, i, false)
                } else if (isSelectAll === '1') {
                  this.$set(this.isReduce, i, false)
                  this.$set(this.flag, i, true)
                } else {
                  this.$set(this.isReduce, i, true)
                  this.$set(this.flag, i, false)
                }
              })

            })

          } else {
            this.$Toast(data.error)
          }
        })
      },
      showAll(indexs) {
        this.subShow = indexs;
      },
      //选择大类
      selectClass(item, indexs) {
        if (this.flag[indexs]) {
          this.$set(this.isReduce, indexs, false)
          this.$set(this.flag, indexs, false)
          var size = item.cities.length;
          for (var i = 0; i < size; i++) {
            this.$set(this.flag_show[indexs], i, false)
          }
          for (var i = 0; i < this.workerList[indexs].cities.length; i++) {
            this.selectData.splice(this.selectData.findIndex(v => v.id === this.workerList[indexs].cities[i].id), 1);
            this.selectLabel.splice(this.selectLabel.findIndex(v => v.id === this.workerList[indexs].cities[i].Label), 1);
          }
        } else {
          this.$set(this.isReduce, indexs, false)
          this.isReduce[indexs] = false;
          this.$set(this.flag, indexs, true)
          var size = item.cities.length;
          for (var i = 0; i < size; i++) {
            this.$set(this.flag_show[indexs], i, true)
          }

          for (var i = 0; i < this.workerList[indexs].cities.length; i++) {
            this.selectData.push(this.workerList[indexs].cities[i].id);
            this.selectLabel.push(this.workerList[indexs].cities[i].label);
          }
        }
        this.selectData = Array.from(new Set(this.selectData))
      },
      //选择子类
      selectChild(d, indexs, index) {
        if (this.flag_show[indexs][index]) {
          this.selectData.splice(index, 1)
          this.selectLabel.splice(index, 1);
          this.$set(this.flag_show[indexs], index, false);
        } else {
          this.selectData.push(this.workerList[indexs].cities[index].id);
          this.selectLabel.push(this.workerList[indexs].cities[index].label);
          this.$set(this.flag_show[indexs], index, true)
        }
        var sumValue = 0;
        var itemsLength = this.workerList[indexs].cities.length;
        for (var i = 0; i < itemsLength; i++) {
          var itemValue = 0;
          var item = this.flag_show[indexs][i];
          if (item) {
            itemValue = 1;
          }
          sumValue += itemValue;
        }
        var isSelectAll = '';
        if (sumValue === 0) {
          isSelectAll = '0';
        } else if (sumValue === itemsLength) {
          isSelectAll = '1'
        } else {
          isSelectAll = '2'
        }
        if (isSelectAll === '0') {
          this.$set(this.isReduce, indexs, false)
          this.$set(this.flag, indexs, false)
        } else if (isSelectAll === '1') {
          this.$set(this.isReduce, indexs, false)
          this.$set(this.flag, indexs, true)
        } else {
          this.$set(this.isReduce, indexs, true)
          this.$set(this.flag, indexs, false)
        }

      },
      resetWorker() {
        let id = Array.from(new Set(this.selectData));
        let label = Array.from(new Set(this.selectLabel));
        let serviceWorker = {}
        serviceWorker.id = id;
        serviceWorker.label = label;
        this.$store.dispatch('serviceWorker', serviceWorker)
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped lang="less">
  .addMasterList {
    width: 100%;
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
              > .isSelected_icon {
                background: url(../../../assets/images/selectAreas.png) center center no-repeat;
              }
              > .isReduce_icon {
                background: url(../../../assets/images/selectArea.png) center center no-repeat;
              }
            }
          }
          > div {
            padding-bottom: .42rem;
            .workChild {
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
                //border-radius:.13rem;
                top: .27rem;
                left: .13rem;
                //background: red;
                > input {
                  position: absolute;
                  top: 0.02rem;
                  width: 100%;
                  height: 100%;
                }
                > .SelectChild_icon {
                  background: url(../../../assets/images/selectChilds.png) center center no-repeat;
                  background-size: 100% 100%;
                  width: 100%;
                  height: 100%;
                  top: .13rem;
                }
                > .SelectChilded_icon {
                  background: url(../../../assets/images/selectChild.png) center center no-repeat;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
