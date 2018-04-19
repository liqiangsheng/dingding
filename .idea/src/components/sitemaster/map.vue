<template>
  <div id="container" tabindex="0"></div>
</template>
<script>
  let map;
  let marker;
  let infoWindow;
  export default {
    mounted: function () {
        let _this=this;
//      let url = "http://192.168.20.36:801/mastergps/querymastergps?masterId=201801161638300901317942";
      var url="http://192.168.20.36:802/mastergps/querymastergpslist";
      _this.$http.get(url).then(function (res) {
        console.log('请求地图',res);
      });


      this.init();
      this.openInfo();
      AMap.event.addListener(marker, 'click', function() {
        var info = [];
        info.push("师傅编号 : B0002");
        info.push("状态 : 上工中");
        info.push("订单编号 :sssss");
        info.push("距离维修点 :sss");

        infoWindow = new AMap.InfoWindow({
          content: info.join("<br>"),  //使用默认信息窗体框样式，显示信息内容
          //基点指向marker的头部位置
          offset: new AMap.Pixel(0, 0)
        });
//        infoWindow.open(map, [116.480983, 39.989628]);
        infoWindow.open(map, [114.057868, 22.543099]);
      });
    },
    methods: {
      init: function () {
        map = new AMap.Map('container', {
          center: [114.057868, 22.543099],
          resizeEnable: true,
          zoom: 6
        });
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar());
          map.addControl(new AMap.Scale())
        });
        map.setZoomAndCenter(14, [116.480983, 39.989628])

      },
      openInfo: function () {
        marker = new AMap.Marker({
          map: map,
          zIndex: 9999999,
          position: map.getCenter()
        });
          //构建信息窗体中显示的内容
          var info = [];
          info.push("师傅编号 : B0002");
          info.push("状态 : 上工中");
          info.push("订单编号 :sssss");
          info.push("距离维修点 :sss");

          infoWindow = new AMap.InfoWindow({
            content: info.join("<br>"),  //使用默认信息窗体框样式，显示信息内容
            //基点指向marker的头部位置
            offset: new AMap.Pixel(0,0)
          });
          infoWindow.open(map, [116.480983, 39.989628]);
      }
    }
  }
</script>
<style>
  #container{
    width: 50%;
    height: 50%;
    margin: 0px;
  }
  .grid-content,.content-wrapper{
    height:100%;
  }
</style>
