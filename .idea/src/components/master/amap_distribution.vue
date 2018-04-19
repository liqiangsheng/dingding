<template>
  <div class="amap_box">
    <iframe :src="iframe_src" frameborder="0" style="width:100%;height:100%; min-height:600px;" ></iframe>
  </div>
</template>
<script>
  import dd_amap_all_ual from '../../api/baseHttp'
  const dd_apidomain1=dd_amap_all_ual.apidomain;//请求路径  http://admin.test.dingdingkuaixiu.com
  const dd_master_test1=dd_amap_all_ual.masterTest;//请求全部师傅  http://master.test.dingdingkuaixiu.com
  const dd_amap_url1=dd_amap_all_ual.amap_url;//地图  http://manage.testdist.dingdingkuaixiu.com
  export default{
      data(){
          return{
              amap_data:'c58652b94481fcb3781ac910bbced365',//高德web服务的key
              iframe_src:'',//师傅分布图
//              iframe_src_link:'http://manage.testdist.dingdingkuaixiu.com/amap/amap_profile.html',//给iframe_src做师傅分布图的链接
              iframe_src_link:`${dd_amap_url1}/amap/amap_profile.html`,//给iframe_src做师傅分布图的链接
          }
      },
      created(){
          let _this=this;
        var dd_querymastergpslist=[]; //请求到的全部师傅的信息，json字符串
        var dd_querymastergpslist_parse=[];//把json字符串转成json对象
        var dd_lat_lon_storage=[];//lon,lat存到sessionStorage里面
        var dd_lat_lon_order=[];//订单信息存到sessionStorage里面
        var dd_geographical=[];//通过经纬度去拿的逆向地理位置

        var dd_todaysinglequantity=function (data,index) {//今日订单
            var arr_id=data;
            $.ajax({
              type: "POST",
              url:`${dd_apidomain1}/masterinfo/findHomeData?masterId=`+arr_id,
              async: false, //dataType: 'json', //contentType: "application/json",
              data:'',
              success: function(res){
                res
                try {
                  dd_lat_lon_order[index]['todaysinglequantity']=res.result.todaysinglequantity; //今日单量
                }catch(err){
                  dd_lat_lon_order[index]['todaysinglequantity']=0;
                }
              }
            });
        };
        var dd_todaysinglequantity_one=function (data,index) {//拿第一个map遍历失败的今日订单，在此在取一遍
          var arr_id=data;
          $.ajax({
            type: "POST",
            url:`${dd_apidomain1}/masterinfo/findHomeData?masterId=`+arr_id,
            async: false,
            data:'',
            success: function(res){
              dd_lat_lon_order[index]['todaysinglequantity']=res.result.todaysinglequantity;
            }
          });
        };

        var dd_teacher_information=function (data,index) {//师傅信息
          console.log('师傅信息',data, index);
          var arr_id=data;
            $.ajax({
              type: "POST",
              url:`${dd_apidomain1}/masterinfo/findonemasterinfo?id=`+arr_id,
              async: false,
              data:'',
              success: function(res){
//                console.log(999,res);
              }
            });
        };

        //ajax请求全部师傅数据
        var dd_amap_url=`${dd_master_test1}/mastergps/querymastergpslist`;
        $.ajax({
          type: "get",
          url: dd_amap_url,
          data: "",
          success: function(data){
            dd_querymastergpslist=data.result;//请求到的json字符串

              dd_querymastergpslist.map(function (arr,index) {//json字符串转对象存起来
                dd_querymastergpslist_parse.push(JSON.parse(arr));
              });

            console.log('全部师傅', dd_querymastergpslist_parse);
              dd_querymastergpslist_parse.map((arr,index)=>{ //把lon,lat存到sessionStorage里面,把order订单信息存到sessionStorage里面
              dd_lat_lon_storage.push([arr.lon * 1,arr.lat * 1]);//经纬度
                if(arr.masterInfo){
                  dd_lat_lon_order.push(arr.masterInfo);//有订单信息就存订单信息
                }else{
                  dd_lat_lon_order.push({masterId:''});//没有就存个空的师傅工号
                }
                dd_lat_lon_order[index]['masterId']=arr.masterInfo.id;//把每个师傅的masterId拿出来存着

                dd_todaysinglequantity(arr.masterInfo.id,index);//ajax请求

                dd_teacher_information(arr.masterInfo.id,index);
            });//循环结束

            dd_todaysinglequantity_one(dd_querymastergpslist_parse[0].masterInfo.id,0);//单独请求第一个

            dd_lat_lon_order.map(function (arr,index) { //如果今日单量有的为undefined就动态添加为0
              if(arr.todaysinglequantity == undefined){
                  dd_lat_lon_order[index]['todaysinglequantity']=0;
                }
            });

            sessionStorage.setItem("dd_lat_lon_storage",JSON.stringify(dd_lat_lon_storage)); //经纬度
            sessionStorage.setItem("dd_lat_lon_order",JSON.stringify(dd_lat_lon_order));//订单信息

            //把拿到的全部经纬度去逆向地理请求文字信息
            dd_lat_lon_storage.map(function (arr,index) {
              let dd_formatted_address=arr.join(',');//逆向地理拿地址
              //逆向地理
              var formatted_address='http://restapi.amap.com/v3/geocode/regeo?key=6f7abd3e0d62ca6affa0e32b55138d1a&location='+dd_formatted_address;
               $.ajax({
                 type: "GET",
                 url: formatted_address,
                 data: '',
                 success: function(data){
                   dd_geographical.push(data.regeocode.formatted_address); //逆向地理给全部变量
                     sessionStorage.setItem("dd_geographical",JSON.stringify(dd_geographical));//当前地理位置
                 },
                 beforeSend:function(xhr){},
                 error:function(xhr,textStatus){}
               });
            });

          }
        });

          setTimeout(function (){
            _this.iframe_src=_this.iframe_src_link;
          },800);
      },
      methods:{

      }
  }
</script>
<style scoped lang="scss">
.amap_box{
  width: 100%;
  height: 100%;
}
.grid-content.bg-purple-light{
  /*height: 100%;*/
}
</style>
