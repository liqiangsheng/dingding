<template>
  <div class="position">
    <p class="closeX" @click="orderClose"></p>
    <iframe :src="position_src" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>
<script>
  const dd_apidomain1=common.apidomain;//请求路径  http://admin.test.dingdingkuaixiu.com
  const dd_master_test1=common.masterTest;//请求全部师傅  http://master.test.dingdingkuaixiu.com
  const dd_amap_url1=common.amap_url;//地图  http://manage.testdist.dingdingkuaixiu.com
  export default{
      data(){
          return{
              position_src:'',//师傅方分布图的链接
              position_src_link:`${dd_amap_url1}/amap/position.html`,//给position_src的链接
          }
      },
      created(){
        let _this=this;
        setTimeout(function (){
          _this.position_src=_this.position_src_link;
        },800);
      },
      mounted(){
      },
      props:["mapData"],
      methods:{
        orderClose:function(){
            this.mapData.isShow=false;
        },
      }
  }
</script>
<style scoped lang="scss">
  .position{
    width: 60%;
    height: 40%;
    margin: 30% auto;
  }
  .closeX{
    background:url(../../../../static/images/del.png) center center no-repeat;
    position:absolute;
    top:-24px;
    background-size:100% 100%;
    background-origin: content-box;
    width:16px;
    height: 16px;
    cursor: pointer;
    right:1%;
    font-size: 35px;
  }
</style>

<!--<!doctype html>-->
<!--<html>-->
<!--<head>-->
  <!--<meta charset="utf-8">-->
  <!--<meta http-equiv="X-UA-Compatible" content="IE=edge">-->
  <!--<meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">-->
  <!--<title>单个师傅</title>-->
  <!--<link rel="stylesheet" href="http://cache.amap.com/lbs/static/main1119.css"/>-->
  <!--<script type="text/javascript"-->
          <!--src="http://webapi.amap.com/maps?v=1.4.3&key=您申请的key值"></script>-->
  <!--<script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>-->
<!--</head>-->
<!--<body>-->
<!--<div id="container"></div>-->
<!--<script type="text/javascript">-->
  <!--//初始化地图对象，加载地图-->
  <!--var map = new AMap.Map("container", {resizeEnable: true});-->
  <!--var lnglats = [-->
    <!--[116.368904, 39.923423],-->
    <!--[116.382122, 39.921176],-->
    <!--[116.387271, 39.922501],-->
    <!--[116.398258, 39.914600]-->
  <!--];-->
  <!--var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});-->
  <!--for (var i = 0, marker; i < lnglats.length; i++) {-->
    <!--var marker = new AMap.Marker({-->
      <!--position: lnglats[i],-->
      <!--map: map-->
    <!--});-->
    <!--marker.content = '我是第' + (i + 1) + '个Marker';-->
    <!--marker.on('click', markerClick);-->
    <!--marker.emit('click', {target: marker});-->
  <!--}-->
  <!--function markerClick(e) {-->
    <!--infoWindow.setContent(e.target.content);-->
    <!--infoWindow.open(map, e.target.getPosition());-->
  <!--}-->
  <!--map.setFitView();-->
<!--</script>-->
<!--</body>-->
<!--</html>-->





<!--<template>-->
  <!--<div class="box">-->
    <!--<div id="container" tabindex="0"></div>-->
    <!--<p class="closeX" @click="orderClose(mapData)"></p>-->
  <!--</div>-->

<!--</template>-->
      <!--<script>-->
        <!--let map;-->
        <!--let marker;-->
        <!--let infoWindow;-->
        <!--export default {-->
          <!--props:["mapData"],-->
          <!--data() {-->
            <!--return {-->
              <!--dataObj:{},-->
              <!--info:[]-->
            <!--}-->
          <!--},-->
          <!--mounted() {-->
            <!--let url=this.$apiGps+"/mastergps/querymastergps?masterId="+this.mapData.masterId;-->
            <!--this.$http.get(url).then(r=>{-->
              <!--let data=r.data;-->
              <!--if("0000"==data.code){-->
                <!--this.dataObj = data.result;-->
                <!--this.init();-->
                <!--AMap.event.addListener(marker, 'click', function() {-->
                  <!--this.openInfo();-->
                <!--});-->
              <!--}else{-->
<!--//                this.dataObj.lon=30.6454654;-->
<!--//                this.dataObj.lat=30.0015564;-->
                <!--this.mapData.isShow=false;-->
                <!--alert(data.error);-->
              <!--}-->
            <!--})-->
          <!--},-->
          <!--methods: {-->
            <!--orderClose(){-->
              <!--this.mapData.isShow=false;-->
            <!--},-->
            <!--init: function () {-->
              <!--map = new AMap.Map('container', {-->
                <!--center: [this.dataObj.lon, this.dataObj.lat],-->
                <!--resizeEnable: true,-->
                <!--zoom: 6-->
              <!--});-->
              <!--AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {-->
                <!--map.addControl(new AMap.ToolBar());-->
                <!--map.addControl(new AMap.Scale())-->
              <!--});-->
              <!--map.setZoomAndCenter(14, [this.dataObj.lon, this.dataObj.lat])-->
              <!--//构建信息窗体中显示的内容-->
              <!--this.info.push("师傅编号 : "+ this.dataObj.masterInfo.id);-->
              <!--this.info.push("状态 : "+ this.dataObj.masterInfo.name);-->
              <!--if("BeOnLeave"!=this.dataObj.workState&&this.dataObj.order){-->
                <!--this.info.push("订单编号 : "+ this.dataObj.order.id);-->
                <!--this.info.push("订单下单号码 : "+ this.dataObj.order.userPhoneNum);-->
                <!--this.info.push("订单联系号码 : "+ this.dataObj.order.linkmanPhoneNum);-->
                <!--this.info.push("订单联系地址 : "+ this.dataObj.order.linkmanDetails);-->
                <!--//根据联系地址文字信息提取gps信息-->
                <!--if(this.dataObj.order.linkmanDetails){-->
                  <!--let url = "http://restapi.amap.com/v3/geocode/geo?key=4ffb6164f759dd2141acf966e9a42cde&address="+this.dataObj.order.linkmanDetails;-->
                  <!--this.$http.get(url).then(r=>{-->
                    <!--let data=r.data;-->
                    <!--console.log(data);-->
                    <!--let location = data.geocodes[0].location.split(",");-->
                    <!--let lon = location[0];-->
                    <!--let lat = location[1];-->
                    <!--new AMap.Map('container', {-->
                      <!--center: [lon, lat],-->
                      <!--resizeEnable: true,-->
                      <!--zoom: 5-->
                    <!--});-->
                    <!--var lnglat = new AMap.LngLat(lon, lat);-->
                    <!--this.info.push("距离维修点 : "+ lnglat.distance([this.dataObj.lon, this.dataObj.lat])+"米");-->
                    <!--this.openInfo();-->
                  <!--})-->
                <!--}else{-->
                  <!--this.openInfo();-->
                <!--}-->
              <!--}else{-->
                <!--this.openInfo();-->
              <!--}-->
            <!--},-->
            <!--openInfo: function () {-->
              <!--marker = new AMap.Marker({-->
                <!--map: map,-->
                <!--zIndex: 9999999,-->
                <!--position: map.getCenter()-->
              <!--});-->
              <!--infoWindow = new AMap.InfoWindow({-->
                <!--content: this.info.join("<br>"),  //使用默认信息窗体框样式，显示信息内容-->
                <!--//基点指向marker的头部位置-->
                <!--offset: new AMap.Pixel(0,0)-->
              <!--});-->
              <!--infoWindow.open(map, [this.dataObj.lon, this.dataObj.lat]);-->
<!--//              infoWindow.open(map, ["116.313019","40.047803"]);-->
            <!--}-->
          <!--}-->
        <!--}-->
      <!--</script>-->
      <!--<style>-->
        <!--#container{-->
          <!--width: 100%;-->
          <!--height: 100%;-->
          <!--margin: 0px;-->
        <!--}-->
        <!--.grid-content,.content-wrapper{-->
          <!--height:100%;-->
        <!--}-->
      <!--</style>-->
<!--<style scoped lang="scss">-->
  <!--@import "../../../assets/styles/commButton";-->
  <!--.el-input, .el-input__inner{-->
    <!--width:auto;-->
  <!--}-->
  <!--.container{-->
    <!--font-family: MicrosoftYaHei;-->
    <!--font-size: 14px;-->
    <!--overflow: hidden;-->
    <!--overflow-y: auto;-->
    <!--letter-spacing: 0;-->
    <!--width:60%;-->
    <!--border-radius: 10px;-->
    <!--position:absolute;-->
    <!--left:50%;-->
    <!--top:50%;-->
    <!--transform:translate(-50%,-50%);-->
    <!--background:#fff;-->
    <!--height:70%;-->
    <!--&gt;h3{-->
      <!--font-family: MicrosoftYaHei;-->
      <!--font-size: 14px;-->
      <!--color: #333333;-->
      <!--padding-left:10px;-->
      <!--letter-spacing: 0;-->
    <!--}-->
    <!--&gt;.content{-->

      <!--width:100%;-->
      <!--display:flex;-->
      <!--&gt;div{-->
        <!--flex:1;-->
        <!--&gt;ul{-->
        <!--}-->
      <!--}-->
      <!--&gt;.left_info{-->
        <!--&gt;.title{-->
          <!--padding-left:10px;-->
        <!--}-->
      <!--}-->
      <!--.title{-->
        <!--line-height:30px;-->
        <!--width:100%;-->
        <!--background: #ECECEC;-->
      <!--}-->
    <!--}-->
    <!--.consume_info{-->
      <!--padding-bottom:200px;-->
      <!--position:relative;-->
      <!--&gt;.title{-->
        <!--padding-left:10px;-->
        <!--line-height:30px;-->
        <!--width:100%;-->
        <!--background: #ECECEC;-->
      <!--}-->
    <!--}-->
  <!--}-->
  <!--ul{-->
    <!--padding-left:10px;-->
    <!--list-style:none;-->
    <!--&gt;li{-->
      <!--line-height:40px;-->
    <!--}-->
  <!--}-->
  <!--.el-select-dropdown__item{-->
    <!--line-height: 20px;-->
  <!--}-->
  <!--.position_icon{-->
    <!--float:right;-->
    <!--margin-right:50%;-->
    <!--cursor:pointer;-->
    <!--&gt;i{-->
      <!--display: inline-block;-->
      <!--width:16px;-->
      <!--vertical-align: middle;-->
      <!--height:16px;-->
      <!--background:url(../../../../static/images/position.png) center center no-repeat;-->
      <!--background-size:100% 100%;-->

    <!--}-->
  <!--}-->
  <!--.closeX{-->
    <!--background:url(../../../../static/images/del.png) center center no-repeat;-->
    <!--background-size:100% 100%;-->
    <!--background-origin: content-box;-->
    <!--right:4%;-->
    <!--top:4%;-->
  <!--}-->

<!--</style>-->




