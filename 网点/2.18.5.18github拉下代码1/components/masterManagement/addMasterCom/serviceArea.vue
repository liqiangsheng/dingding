<template>
  <div class="addMasterList">
    <C_header title="服务区域" right_number="2" :reset='resetArea' left_number='2'></C_header>
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
                       <!-- <input type="checkbox" :checked='selectedChild'> -->
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
        //isShow:false,
        isReduce: [],
        workerList: [],
        flag: [],           //子类下标
        flag_show: [],
        selected: false,
        selectedChild: false,
        areaData: [],      //选中的数据,传给后台
        areaLabel: [],
        subShow: ''
      }
    },
    created() {
      this.getWorkList();
    },
    watch: {},
    methods: {
      //服务工种数据
      getWorkList() {
        let url = this.$common.apidomain + "/common/findareaandstreetoptions" + '?cityId=0101'  //服务区域列表
        this.$http.get(url).then(res => {
          let data = res.data;
          if (data.code === "0000") {
            this.workerList = data.result;
            // console.log(this.workerList,"/////")
            this.workerList.forEach((v, i) => {
              //v.isShow=false;
              this.flag_show.push([])
            //   v.cities.forEach((j, k) => {
              //     //j.isShowChild=false;
              //     j.label = j.label.substring(5);
            //   })
            });

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
        //console.log(item,'大类')
        if (this.flag[indexs]) {
          this.$set(this.isReduce, indexs, false)
          this.$set(this.flag, indexs, false)
          var size = item.cities.length;
          for (var i = 0; i < size; i++) {
            this.$set(this.flag_show[indexs], i, false)
          }
          for (var i = 0; i < this.workerList[indexs].cities.length; i++) {
            this.areaData.splice(this.areaData.findIndex(v => v.id === this.workerList[indexs].cities[i].id), 1);
            this.areaLabel.splice(this.areaLabel.findIndex(v => v.id === this.workerList[indexs].cities[i].Label), 1);
          }

          // console.log(this.areaLabel,'选中label')
        } else {
          this.$set(this.isReduce, indexs, false)
          this.isReduce[indexs] = false;
          this.$set(this.flag, indexs, true)
          var size = item.cities.length;
          for (var i = 0; i < size; i++) {
            this.$set(this.flag_show[indexs], i, true)
          }
          for (var i = 0; i < this.workerList[indexs].cities.length; i++) {
            this.areaData.push(this.workerList[indexs].cities[i].id);
            this.areaLabel.push(this.workerList[indexs].cities[i].label);
          }
          //console.log(this.areaData,'选中')
          //console.log(this.areaLabel,'选中label')
        }
        this.areaData = Array.from(new Set(this.areaData))
        // console.log(this.areaData,'选中xxxxx')
      },
      //选择子类
      selectChild(d, indexs, index) {
        //event.stopPropagation();
        if (this.flag_show[indexs][index]) {
          // console.log(this.workerList[indexs].cities[index].label,'label')
          //this.areaData.splice(this.areaData.findIndex(v => v.id === this.workerList[indexs].cities[index].id),1);
          this.areaData.splice(index, 1)
          this.areaLabel.splice(index, 1);
          this.$set(this.flag_show[indexs], index, false);
          // console.log(this.areaData,'删除id')
          // console.log(this.areaLabel,'删除label')
        } else {
          // console.log(this.workerList[indexs].cities[index].label,'label')
          this.areaData.push(this.workerList[indexs].cities[index].id);
          this.areaLabel.push(this.workerList[indexs].cities[index].label);
          this.$set(this.flag_show[indexs], index, true)
          // console.log(this.areaData,'选中')
          // console.log(this.areaLabel,'选中label')
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
      //传给子类的事件
      resetArea() {
        let id = Array.from(new Set(this.areaData));
        let label = Array.from(new Set(this.areaLabel));
        let serviceArea = {}
        serviceArea.id = id;
        serviceArea.label = label;
        this.$store.dispatch('serviceArea', serviceArea)
        this.$router.push({path: '/addMaster'})
        console.log(this.$store.getters.serviceArea, '保存服务区域数据')
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
