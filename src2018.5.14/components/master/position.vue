<template>
        <div id="container" tabindex="0"></div>
</template>
      <script>
        let map;
        let marker;
        let infoWindow;
        export default {
          props:["mapData"],
          data() {
            return {
              dataObj:{},
              info:[]
            }
          },
          mounted() {
            let url=this.$apiGps+"/mastergps/querymastergps?masterId="+this.mapData.masterId;
            this.$http.get(url).then(r=>{
              let data=r.data;
              if("0000"==data.code){
                this.dataObj = data.result;
                this.init();
                AMap.event.addListener(marker, 'click', function() {
                  this.openInfo();
                });
              }else{
                this.mapData.isShow=false;
                alert(data.error);
              }
            })
          },
          methods: {
            init: function () {
              map = new AMap.Map('container', {
                center: [this.dataObj.lon, this.dataObj.lat],
                resizeEnable: true,
                zoom: 6
              });
              AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                map.addControl(new AMap.ToolBar());
                map.addControl(new AMap.Scale())
              });
              map.setZoomAndCenter(14, [this.dataObj.lon, this.dataObj.lat])
              //构建信息窗体中显示的内容
              this.info.push("师傅编号 : "+ this.dataObj.masterInfo.id);
              this.info.push("状态 : "+ this.dataObj.masterInfo.name);
              if("BeOnLeave"!=this.dataObj.workState&&this.dataObj.order){
                this.info.push("订单编号 : "+ this.dataObj.order.id);
                this.info.push("订单下单号码 : "+ this.dataObj.order.userPhoneNum);
                this.info.push("订单联系号码 : "+ this.dataObj.order.linkmanPhoneNum);
                this.info.push("订单联系地址 : "+ this.dataObj.order.linkmanDetails);
                //根据联系地址文字信息提取gps信息
                if(this.dataObj.order.linkmanDetails){
                  let url = "http://restapi.amap.com/v3/geocode/geo?key=4ffb6164f759dd2141acf966e9a42cde&address="+this.dataObj.order.linkmanDetails;
                  this.$http.get(url).then(r=>{
                    let data=r.data;
                    console.log(data);
                    let location = data.geocodes[0].location.split(",");
                    let lon = location[0];
                    let lat = location[1];
                    new AMap.Map('container', {
                      center: [lon, lat],
                      resizeEnable: true,
                      zoom: 5
                    });
                    var lnglat = new AMap.LngLat(lon, lat);
                    this.info.push("距离维修点 : "+ lnglat.distance([this.dataObj.lon, this.dataObj.lat])+"米");
                    this.openInfo();
                  })
                }else{
                  this.openInfo();
                }
              }else{
                this.openInfo();
              }
            },
            openInfo: function () {
              marker = new AMap.Marker({
                map: map,
                zIndex: 9999999,
                position: map.getCenter()
              });
              infoWindow = new AMap.InfoWindow({
                content: this.info.join("<br>"),  //使用默认信息窗体框样式，显示信息内容
                //基点指向marker的头部位置
                offset: new AMap.Pixel(0,0)
              });
              infoWindow.open(map, [this.dataObj.lon, this.dataObj.lat]);
            }
          }
        }
      </script>
      <style>
        #container{
          width: 100%;
          height: 100%;
          margin: 0px;
        }
        .grid-content,.content-wrapper{
          height:100%;
        }
      </style>
<style scoped lang="scss">
  @import "../../assets/styles/commButton";
  .el-input, .el-input__inner{
    width:auto;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    overflow-y: auto;
    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:70%;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{

      width:100%;
      display:flex;
      >div{
        flex:1;
        >ul{
        }
      }
      >.left_info{
        >.title{
          padding-left:10px;
        }
      }
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
    .consume_info{
      padding-bottom:200px;
      position:relative;
      >.title{
        padding-left:10px;
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
  }
  ul{
    padding-left:10px;
    list-style:none;
    >li{
      line-height:40px;
    }
  }
  .el-select-dropdown__item{
    line-height: 20px;
  }
  .position_icon{
    float:right;
    margin-right:50%;
    cursor:pointer;
    >i{
      display: inline-block;
      width:16px;
      vertical-align: middle;
      height:16px;
      background:url(../../../static/images/position.png) center center no-repeat;
      background-size:100% 100%;

    }
  }
  .closeX{
    background:url(../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
</style>

