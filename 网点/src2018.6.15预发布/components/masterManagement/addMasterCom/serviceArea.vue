<template>
  <div class="addMasterList">
    <C_header title="服务区域" right_number="2" :addResetArea='resetArea' left_number='4'></C_header>
    <div class="workerList">
      <ul>
        <li v-for="(item,indexs) in areaList" :key="indexs">
          <div>
            <p @click="showAll(indexs)">
              {{item.label}}
              <span @click="selectClass(item,indexs)">
                      <i class="i isSelect_icon"
                         :class="{isSelected_icon:item.show===1,isReduce_icon:item.show===2}"></i>
              </span>
            </p>
            <!-- v-if="subShow === indexs" -->
            <div>
              <p v-for="(d,index) in item.cities" :key="index" class="workChild" @click="selectChild(d,indexs,index)">
                     <span>
                       <i
                         :class="{i:true, SelectChild_icon:true,SelectChilded_icon:areaList[indexs].cities[index].show}"></i>
                       <!-- <input type="checkbox" :checked='selectedChild'> -->
                     </span>
                <font>{{d.label}}</font>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import storage from "@/assets/js/storage"
  export default {
    components: {},
    data() {
      return {
        isSelect: false,
        //isShow:false,
        isReduce: [],
        areaList: [],
        flag: [],           //子类下标
        flag_show: [],
        selected: false,
        selectedChild: false,
        areaData: [],      //选中的数据,传给后台
        areaLabel: [],
        subShow: '',
        workerDetailsId: [],      //上一次选中的小类状态
        workerList: []
      }
    },
    created() {
      this.getWorkList();
    },
    watch: {},
    methods: {
      //服务工种数据
      getWorkList() {
//        this.areaList = this.$route.query.areaData;
        this.areaList = storage.getSession('areaList');
//        this.workerList = this.$route.query.workerData;
        //console.log(storage.getSession('areaList'),'uiouioiu');
//        console.log(this.$route.query.areaData,'服务区域')
//        console.log(this.$route.query.cityId,'111',this.areaList)
        if (!this.areaList || this.areaList.length == 0) {
          let url = this.$common.apidomain + "/common/findareaandstreetoptions?cityId=" + this.$route.query.cityId; //服务区域列表
          this.$http.get(url).then(res => {
            let data = res.data;
            if (data.code === "0000") {
              this.areaList = data.result;
              console.log(this.areaList, "/////")
              this.areaList.forEach((v, i) => {
                //this.flag_show.push([])
                v.show = 0;
                v.cities.forEach((j, k) => {
                  j.show = false;
                  //j.label = j.label.substring(5);
//                var len = this.workerDetailsId.length;
//                if (len != 0) {
//                  this.workerDetailsId.forEach((m, n) => {
//                    if (j.id === m) {
//                      this.$set(this.flag_show[i], k, true);
//                      this.areaData.push(j.id);
////                      this.areaLabel.push(j.label);
//                    }
//                  })
//                } else {
//                  return;
//                }
                })
              });
              //判断大类选中状态
              // this.flag_show.forEach((v, i) => {
              // v.forEach((m, n) => {
              //   if(v.length!=0&&v.length!==this.areaList[i].length){
              //    this.$set(this.isReduce,i,true);
              //    this.$set(this.flag,i,false);
              // }else if(v.length==this.areaList[i].length&&v.length!=0){
              //    this.$set(this.isReduce, i, false)
              //    this.$set(this.flag, i, true)
              // }else{
              //    this.$set(this.isReduce,i,false);
              //    this.$set(this.flag,i,false);
              // }
              //  var sumValue = 0;
              //  var itemsLength = this.areaList[i].cities.length;
//                for (var j = 0; j < itemsLength; j++) {
//                  var itemValue = 0;
//                  var item = this.flag_show[i][j];
//                  if (item) {
//                    itemValue = 1;
//                  }
//                  sumValue += itemValue;
//                }
//                var isSelectAll = '';
//                if (sumValue === 0) {
//                  isSelectAll = '0';
//                } else if (sumValue === itemsLength) {
//                  isSelectAll = '1'
//                } else {
//                  isSelectAll = '2'
//                }
//                if (isSelectAll === '0') {
//                  this.$set(this.isReduce, i, false)
//                  this.$set(this.flag, i, false)
//                } else if (isSelectAll === '1') {
//                  this.$set(this.isReduce, i, false)
//                  this.$set(this.flag, i, true)
//                } else {
//                  this.$set(this.isReduce, i, true)
//                  this.$set(this.flag, i, false)
//                }
//              })
//            })
            } else {
              this.$Toast(data.error)
            }
          })
        }
      },
      showAll(indexs) {
        this.subShow = indexs;
      },
      //选择大类
      selectClass(item, indexs) {
        if (this.areaList[indexs].show === 1) {
//          this.$set(this.isReduce, indexs, false)
//          this.$set(this.flag, indexs, false)
          this.areaList[indexs].show = 0
          this.$set(this.areaList, indexs, this.areaList[indexs])
          var size = item.cities.length;
          for (var i = 0; i < size; i++) {
//            this.$set(this.flag_show[indexs], i, false)
            this.areaList[indexs].cities[i].show = false
          }
//          for (var i = 0; i < this.areaList[indexs].cities.length; i++) {
//            this.selectData.splice(this.selectData.findIndex(v => v.id === this.areaList[indexs].cities[i].id), 1);
//            this.selectLabel.splice(this.selectLabel.findIndex(v => v.id === this.areaList[indexs].cities[i].Label), 1);
//          }
        } else {
//          this.$set(this.isReduce, indexs, false)
//          this.isReduce[indexs] = false;
//          this.$set(this.flag, indexs, true)
          this.areaList[indexs].show = 1
          this.$set(this.areaList, indexs, this.areaList[indexs])
//          console.log(this.$set(this.areaList, [indexs]['show'], 1))
          var size = item.cities.length;
          for (var i = 0; i < size; i++) {
//            this.$set(this.flag_show[indexs], i, true)
            this.areaList[indexs].cities[i].show = true
          }

          /*for (var i = 0; i < this.areaList[indexs].cities.length; i++) {
            this.selectData.push(this.areaList[indexs].cities[i].id);
            this.selectLabel.push(this.areaList[indexs].cities[i].label);
          }*/
        }
//        this.selectData = Array.from(new Set(this.selectData))

        //   console.log(this.areaList, '--1111----')
      },
      //选择子类
      selectChild(d, indexs, index) {
//        if (this.flag_show[indexs][index]) {
        if (this.areaList[indexs].cities[index].show) {
//          this.selectData.splice(index, 1)
//          this.selectLabel.splice(index, 1);
//          this.$set(this.flag_show[indexs], index, false);

          this.areaList[indexs].cities[index].show = false;
        } else {
//          this.selectData.push(this.areaList[indexs].cities[index].id);
//          this.selectLabel.push(this.areaList[indexs].cities[index].label);

//          this.$set(this.flag_show[indexs], index, true)

          this.areaList[indexs].cities[index].show = true;
        }
        var sumValue = 0;
        var itemsLength = this.areaList[indexs].cities.length;
        for (var i = 0; i < itemsLength; i++) {
          var itemValue = 0;
//          var item = this.flag_show[indexs][i];
          var item = this.areaList[indexs].cities[i].show;
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
//          this.$set(this.isReduce, indexs, false)
//          this.$set(this.flag, indexs, false)
          this.areaList[indexs].show = 0
          this.$set(this.areaList, indexs, this.areaList[indexs])
        } else if (isSelectAll === '1') {
//          this.$set(this.isReduce, indexs, false)
//          this.$set(this.flag, indexs, true)
          this.areaList[indexs].show = 1
          this.$set(this.areaList, indexs, this.areaList[indexs])
        } else {
//          this.$set(this.isReduce, indexs, true)
//          this.$set(this.flag, indexs, false)
          this.areaList[indexs].show = 2
          this.$set(this.areaList, indexs, this.areaList[indexs])
        }


//        console.log(this.areaList[indexs].cities[index].show,'--2222----')

      },
      //
      //传给子类的事件
      resetArea() {
//        let id = Array.from(new Set(this.areaData));
//        let label = Array.from(new Set(this.areaLabel));
//        let serviceArea = {}
//        serviceArea.id = id;
//        serviceArea.label = label;
//        this.$store.dispatch('serviceArea', this.areaList)
//        this.$router.go(-1)
        //console.log(this.$store.getters.serviceArea, '保存服务区域数据')
        storage.setSession("areaList", this.areaList)
        this.$router.push({path: `/addMaster`});
//        this.$router.push({path: `/addMaster`, query: {areaData: this.areaList, workerData: this.workerList}});
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
      margin-top: 1.2rem;
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
            .workChild::-webkit-scrollbar {
              display: none
            }
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
              //text-align: center;
              border-radius: .08rem;
              overflow: auto;
              padding-left: .5rem;
              > font {
                position: absolute;
                display: inline-block;
                height: 100%;
                width: 2.8rem;
                overflow: hidden;
                //overflow-x: hidden; overflow-y: auto;
              }
              > span {
                display: inline-block;
                position: absolute;
                width: .26rem;
                height: .26rem;
                top: .27rem;
                left: .13rem;
                //margin-right:2rem;
                > .SelectChild_icon {
                  background: url(../../../assets/images/selectChilds.png) center center no-repeat;
                  background-size: 100% 100%;
                  width: 100%;
                  height: 100%;
                  top: .13rem;
                }
                > .SelectChilded_icon {
                  background: url(../../../assets/images/selectChild.png) center center no-repeat;
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
