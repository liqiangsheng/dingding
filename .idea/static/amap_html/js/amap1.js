
var lnglats = [[116.368904, 39.923423]];

var dd_lat_lon_storage1,dd_lat_lon_order1,dd_geographical1;
if(sessionStorage.getItem("dd_lat_lon_storage")){
  dd_lat_lon_storage1=JSON.parse(sessionStorage.getItem("dd_lat_lon_storage"));
}
console.log("经纬度",dd_lat_lon_storage1);
if(sessionStorage.getItem("dd_lat_lon_order")){
  dd_lat_lon_order1=JSON.parse(sessionStorage.getItem("dd_lat_lon_order"));
}
console.log("订单",dd_lat_lon_order1);
if(sessionStorage.getItem("dd_geographical")){
  dd_geographical1=JSON.parse(sessionStorage.getItem("dd_geographical"));
}
console.log("逆向地理位置",dd_geographical1);

//往lnglats里面添加storage取到的经纬度
lnglats=[];
dd_lat_lon_storage1.map(function (arr,index) {
  lnglats.push(arr);
});



//初始化地图对象，加载地图
var map = new AMap.Map("container", {
  resizeEnable: true,
  viewMode:'3D',
  zoom: 13,
  expandZoomRange:true,
  zooms:[3,20],
  // center: [116.397428, 39.90923]
});
//  var lnglats = [[116.368904, 39.923423],];

AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
  function(){
    map.addControl(new AMap.ToolBar());
    map.addControl(new AMap.Scale());
    map.addControl(new AMap.OverView({isOpen:true}));
  });

var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
for (var i = 0, marker; i < lnglats.length; i++) {
  var marker = new AMap.Marker({
    position: lnglats[i],
    map: map
  });

  var content_text=`
        <p>
          <span>师傅工号:</span><span>${dd_lat_lon_order1[i].masterId ? dd_lat_lon_order1[i].masterId : '无'}</span>&nbsp;&nbsp;&nbsp;
          <span>师傅姓名:</span><span>${dd_lat_lon_order1[i].name ? dd_lat_lon_order1[i].name : '无'}</span>
        </p>
        <p>
          <span>状态:</span>
          <span>
              ${dd_lat_lon_order1[i].workState=='Leisure' ? '空闲中' : dd_lat_lon_order1[i].workState=='Working' ? '工作中' : 
              dd_lat_lon_order1[i].workState=='BeOnLeave' ? '请假中' : '无'}
          </span>&nbsp;&nbsp;&nbsp;
          <span>今日单量:</span><span>${dd_lat_lon_order1[i].todaysinglequantity}</span>
        </p>
        <p>
           <span>当前地址:</span><span id="">${dd_geographical1[i] ? dd_geographical1[i] : '无'}</span>
        </p>
    `;

//marker.content = '我是第' + (i + 1) + '个Marker';
  marker.content = content_text;
  marker.on('click', markerClick);
  marker.emit('click', {target: marker});
}
function markerClick(e) {
  infoWindow.setContent(e.target.content);
  infoWindow.open(map, e.target.getPosition());
}
map.setFitView();

//start 所在市
//获取用户所在城市信息
function showCityInfo() {
  //实例化城市查询类
  var citysearch = new AMap.CitySearch();
  //自动获取用户IP，返回当前城市
  citysearch.getLocalCity(function(status, result) {
    if (status === 'complete' && result.info === 'OK') {
      if (result && result.city && result.bounds) {
        var cityinfo = result.city;
        var citybounds = result.bounds;
        console.log('您当前所在城市：' + cityinfo);
        //地图显示当前城市
        map.setBounds(citybounds);
      }
    } else {
      console.log(result.info);
    }
  });
};
//end 所在市

var select_search=document.querySelector('#select_search');//下拉框
var option_search=document.querySelector('option');//下拉框的值
var button_search=document.querySelector('#button_search');//搜索按钮
button_search.addEventListener('click',function(e){
  var select_value=select_search.value;
  if(select_search.value){
    if(select_value=='深圳'){
      showCityInfo();
    }
  }else{
    alert("请选择")
  }
});

window.onload=function(){ //逆向地理给dom上

}


