
/*
    测试环境 start
*/
//域名:sz
window.common= {
     domainUrl: "manage.testdist.dingdingkuaixiu.com",//分区域名
     //  domainUrl: ":8080",      //分区域名
      reportdomain:"http://report.test.dingdingkuaixiu.com",//批量导入//批量导出
      // reportdomain:"http://192.168.20.178:8088",//批量导出 /雍挺孝
      siteAppDomain:"http://site-app.testdist.dingdingkuaixiu.com",
      apiGps:"http://admin.test.dingdingkuaixiu.com",
      apiupdate:"http://admin.test.dingdingkuaixiu.com",
      apiModel:"http://image.testdist.dingdingkuaixiu.com", //下载模板 http://image.pre.dingdingkuaixiu.com	预发布环境http://image.dingdingkuaixiu.com	正式环境
     apiCSV:"http://image.testdist.dingdingkuaixiu.com/",
      masterTest:'http://master.test.dingdingkuaixiu.com', //请求全部工程师数据
      //   masterTest:'http://192.168.20.176:8021', //请求全部工程师数据
      pcApi:"http://channel.testdist.dingdingkuaixiu.com",
      amap_url:'http://manage.testdist.dingdingkuaixiu.com',//地图的服务器文件夹地址.html
      apidomain:"http://admin.test.dingdingkuaixiu.com",
  // apidomain:"http://admin.pre.dingdingkuaixiu.com",
      // apidomain:"http://admin.pre.dingdingkuaixiu.com",
      // apidomain:"http://admin.dingdingkuaixiu.com",
      channelLogin:"http://www.testdist.dingdingkuaixiu.com:85/login",   //渠道端登陆页面 ， 跳转到官网 进行登陆；
      wechatProductAssortment:"http://wechat.testdist.dingdingkuaixiu.com/#/",    //跳转微信用户端指定分类
      role_api_host:"http://role.test.dingdingkuaixiu.com",
      // wechatProductAssortment:"http://localhost:8081/#/",
       //apidomain:"http://192.168.20.56:8887",               //刘永政
      // apidomain:"http://192.168.20.75:8887",               //林欢平
         apidomain: "http://192.168.20.178:8887",              //雍挺孝
      //   apidomain:"http://192.168.20.36:8887",              //曾伟建
      // IM_req_url_dial:this.apidomain+'/udesk/callcenterAgentCallout', //拨打联系人 number
      // IM_req_url_order:this.apidomain+'/udesk/tickets',                //工单管理   type,ids
      // IM_req_url_sign:this.apidomain+'/udesk/usersAuthJwtCallback',   //单点登录
  };
/*
*   预发布环境
* */
//
// window.common = {
//   reportdomain:"http://report.pre.dingdingkuaixiu.com",//批量导入
//   siteAppDomain:"http://site-app.pre.dingdingkuaixiu.com",
//   apiGps:"http://admin.pre.dingdingkuaixiu.com",
//   apiupdate:"http://admin.pre.dingdingkuaixiu.com",
//   apiModel:"http://image.pre.dingdingkuaixiu.com",
//   apiCSV:"http://image.pre.dingdingkuaixiu.com/",
//   masterTest:'http://master.pre.dingdingkuaixiu.com', //请求全部师傅数据
//   pcApi:"http://channel.pre.dingdingkuaixiu.com",
//   amap_url:'http://manage.pre.dingdingkuaixiu.com',//地图的服务器文件夹地址.html
//   apidomain:"http://admin.pre.dingdingkuaixiu.com",
//   channelLogin:"http://www.pre.dingdingkuaixiu.com/login",   //渠道端登陆页面 ， 跳转到官网 进行登陆；
//   wechatProductAssortment:"http://wechat.pre.dingdingkuaixiu.com/#/",     //跳转微信用户端指定分类
//   role_api_host:"http://role.pre.dingdingkuaixiu.com",
// }
