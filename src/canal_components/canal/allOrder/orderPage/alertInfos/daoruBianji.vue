<template>
  <!--订单支付Work order submission-->
  <div>
    <div class="creditIsRunningLow"><!--背阴-->
      </div>
      <div class="creditIsRunningLow_box">
          <div class="el-message-box__title">
            <span>工单详情</span>
            <i class="el-message-box__close el-icon-close" @click="close"></i>
        </div>
        <ul class="center">
          <div class="fuwuxinxi">
            <ul class="list" id="addAlertList">
              <li><span></span>服务信息</li>
              <li>　　　　分类<span>*</span>
                <el-select v-model="fenlei" placeholder="请选择" style="width: 80%;margin-left: 20px;" @change="yijifenlei2">
                  <el-option
                    v-for="(item,index) in fenleiOptions"
                    :key="index"
                    :label="item.yijiName"
                    :value="item.fenlei">
                  </el-option>
                </el-select>
              </li>
              <li id="productNub">　　　　产品<span>*</span>
                <el-cascader
                  style="width: 80%;margin-left: 20px;"
                  @change="changeSelector2"
                  :options="labeloptions"
                  :disabled="isKeXuan"
                  v-model="objOptions"
                  placeholder="请选择到最后一级"
                  :props="propsOne"
                  filterable></el-cascader>
              </li>
              <li>　　　　品牌<el-input v-model="input1" placeholder="选填" style="width: 35%;margin:0 20px 0 30px;" ></el-input>型号<el-input v-model="input2" placeholder="选填" style="width: 35%;margin-left: 20px;"></el-input></li>
              <li id="nunber1">　　　　数量<span>*</span>
                <el-input-number style="margin-left: 20px;" v-model="num" @change="handleChange" :min="1"></el-input-number>
              </li>
            </ul>
            <ul class="yuyuexinxi">
              <li><span></span>预约信息</li>
              <li>　　联系人<span>*</span><el-input v-model="input7" placeholder="请输入内容" style="width: 80%;"></el-input></li>
              <li>联系人手机<span>*</span><el-input v-model="input8" placeholder="请输入内容" style="width: 35%"></el-input> 　　　<b style="font-weight:100; margin: 0 20px">座机</b><el-input v-model="input6" placeholder="请输入内容" style="width: 34%"></el-input></li>
              <li id="citycity">　服务地区<span>*</span>
                <el-cascader
                  expand-trigger="hover"
                  :options="options"
                  :props="props"
                  style="width:35%;"
                  placeholder="选择城市"
                  v-model="selectedOptions2"
                  @change="handleChange1">
                </el-cascader>

                <el-cascader id="city" style="width:34%;"
                             @change="changeSelector($event)"
                             ref="one"
                             :options="serveAreas"
                             placeholder="选择区域"
                             v-model="selectedOptions1"
                             :props="props2"
                ></el-cascader>
              </li>
              <li>　详细地址<span>*</span><el-input v-model="input4" placeholder="请输入内容" style="width: 80%"></el-input></li>
              <li id="shijian">　预约时间<span>*</span>
                <!--<Col span="12" style="display: inline-block">-->
                <!--<DatePicker type="date" placeholder="请选择日期" style="width: 24.6%;height: 36px" v-model="input5"></DatePicker>-->
                <DatePicker type="datetime" v-model="input5" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择日期" style="width: 24.6%;height: 36px"></DatePicker><!--</Col>-->
              </li>

            </ul>
            <ul class="zhibao">
              <li class="zhibaoP"><span></span><b style="float: left;font-weight: 100">质保状态</b>
                <p @click="danxuan2(item,index)" v-for="(item,index) in zhibao"><el-button>{{item}}</el-button><img src="/static/images/danxuan.png"  v-show="jinjiduIndex1 == index"></p>
              </li>

            </ul>
            <ul class= "jinji">
              <li class="jinjiduP"><span></span><b style="float: left;font-weight: 100">紧急程度</b>
                <p @click="danxuan3(item,index)" v-for="(item,index) in jinjidu"><el-button>{{item}}</el-button><img src="/static/images/danxuan.png" v-show="jinjiduIndex == index"></p>
              </li>

            </ul>
            <div class="ziqudao">
              <p class="ziqudaoP">　　子渠道
                <el-select v-model="value" placeholder="请选择" @change="ziqudaoA(value)" style="width: 80%">
                  <el-option
                    v-for="(item,index) in ziqudao"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </p>
              <br>
              <p class="qitaP"><span>　　　其他</span><el-input
                type="textarea"
                style="width: 80%;"
                placeholder="请输入内容"
                v-model="qita">
              </el-input>
              </p>
            </div>

          </div>

        </ul>
        <div class="footer">
               <p><el-button @click="NOClick">不修改退出</el-button><el-button type="primary" @click="OKClick">修改并保存</el-button></p>

        </div>
    </div>
  </div>
</template>
<script>
  export default {
    components:{
    },
    data() {
      return {
        fenlei:"", //分类
        input1:"",//品牌
        input2:"", //型号
        input4:"",//　详细地址*
        input5:"",//　　预约时间*
        input6:"",//　　固定电话*
        input7:"",//　　联系人*
        input8:"",//　　联系人电话*
        qita:"",//其他
        zhibao:["质保外","质保内"],//质保
        zhibaoStr:"0",
        jinjiduStr:"0",
        jinjidu:["正常","加急"],//紧急度
        jinjiduIndex:0,//紧急度下标
        jinjiduIndex1:0,//紧急度下标
        ziqudao:[], //子渠道
        value:"",//子渠道
        //区域start
        cityId:"",
        num:1, // 选择数量
        labeloptions:[],  //产品
        objOptions:[],//产品分类
        isKeXuan:true, //禁用
        fenleiOptions: [], //分类选择
        propsOne: {  //子分类选择
          value: 'a',
          label: "b",
          children: 'beans'
        },
        selectedOptions2: [], //城市选择
        selectedOptions1: [],//区域选择
        options: [],
        props: {
          value: 'id',
          label: 'label',
          children: 'cities'
        },
        serveAreas: [],
        props2: {
          value: 'id',
          label: 'label',
          children: 'cities',
        },
        //区域end
        "linkmanAreaId":this.linkmanAreaId, //街道id
        "linkmanName":this.input1, //联系人名称
       }
    },
    methods: {
      yijifenlei2(){//一级分类

      },
      changeSelector2(){ //产品

      },
      ziqudaoA(){//子渠道

      },
      OKClick(){ //修改并保存
      },
      close(){ //传值给父级
        this.$emit("isClose",false)
      },
      NOClick(){ //不修改退出
        this.$emit("isClose",false)
      },
      handleChange(value) {
        console.log(value);
      },
      handleChange1(value) { //一级城市
        this.cityId = value[value.length - 1];
        this.$store.dispatch("cityIdid",this.cityId)
        //选择区域街道
        let cityIdurl=this.$apidomain+"/common/findareaandstreetoptions?cityId="+ this.cityId;//获取区域
        this.$http.get(cityIdurl).then(res=>{
          this.serveAreas = res.data.result;
        })
      },
      changeSelector($event) {
        this.linkmanAreaId = this.selectedOptions1[this.selectedOptions1.length - 1];
        this.linkmanName =this.$refs.one.currentLabels[1];

      },
      danxuan2(v,i){//保外单选
        this.jinjiduIndex1 = i;
        if(i=0){
          this.zhibaoStr = "0";
        }else if(i=1){
          this.zhibaoStr = "1";
        }

      },
      danxuan3(v,i){//正常单选
        this.jinjiduIndex = i;
        if(i==0){
          this.jinjiduStr = "0";
        }else if(i==1){
          this.jinjiduStr = "1";
        }
      },

    },
    mounted() {

    },
    created(){
      //子渠道
      this.chushiId = JSON.parse(sessionStorage.getItem("userInfo"))
      let url1 = this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId="+this.chushiId[0].id;
      this.$http.get(url1).then(res=>{
        console.log(res,"22222")
        this.ziqudao = res.data.result;
      });
      //获取区和街道
      let cityurl = `${this.$apidomain}/common/findprovinceandcitylist`;
      this.$http.get(cityurl).then(res=>{
        if (res.data.code === '0000') {
          this.options =res.data.result;
        }
      });

    },

  }
</script>
<style>
  #nunber1 .el-input-number__decrease{
    left: 0;
    border-right: 1px solid #bfcbd9;
  }
  #nunber1 .el-input__inner{
    padding: 3px 10px 3px 15px;
    text-align: center;
  }

</style>

<style scoped lang="scss">
  .creditIsRunningLow{
    width: 100%;
    background: black;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:2007;
    opacity: 0.2;
  }
  .creditIsRunningLow_box{
    width: 65%;
    height: 70%;
    background-color: #fff;
    position: absolute;
    left: 16%;
    top:16%;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:7%;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 10px;
      top:10px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:46px;
      text-align: center;
    }
  }
  .center{
    width: 100%;
    height: 87%;
    overflow-y: auto;
    padding: 30px;
    .fuwuxinxi{
       width: 100%;
      .list{
        width: 100%;
        li:nth-child(1){
          width: 100%;
          height:22px;
          font-size:16px;
          font-family:PingFangSC-Regular;
          color:rgba(136,136,136,1);
          line-height:22px;
          margin-bottom: 15px;
          span{
            display:inline-block;
            width:4px;
            height:18px;
            background:rgba(230,88,49,1);
            margin: 0 5px;
            transform: translateY(2px);
          }
        }
        li{
          width: 100%;
          margin-bottom: 20px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          color:rgba(0,0,0,1);
          line-height:36px;
          span{
            color: #E65831;
          }
        }
      }
    }
    .yuyuexinxi{
      width: 100%;
      li:nth-child(1){
        width: 100%;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:22px;
        margin-bottom: 15px;
        span{
          display:inline-block;
          width:4px;
          height:18px;
          background:rgba(230,88,49,1);
          margin: 0 5px;
          transform: translateY(2px);
        }
      }
      li{
        width: 100%;
        margin-bottom: 15px;
        padding-left: 10px;
        span{
          color: #EA5413;
          margin-right: 20px;
        }
      }
    }
    .zhibao{
      width:100%;
      overflow: hidden;
      margin-bottom: 15px;
      .zhibaoP{
        margin-bottom: 15px;
        width: 100%;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:22px;
        margin-bottom: 15px;
        span{
          display:inline-block;
          width:4px;
          height:18px;
          background:rgba(230,88,49,1);
          margin: 0 5px;
          transform: translateY(2px);
          float: left;
        }
        p{
          width: 25%;
          margin-left: 20px;
          float: left;
          position: relative;
          .el-button{
            width: 100%;
          }
          img{
            display: inline-block;
            position: absolute;
            right: 0;
            top:0;
          }
        }

      }
    }
    .jinji{
      width:100%;
      overflow: hidden;
      margin-bottom: 15px;
      .jinjiduP{
        margin-bottom: 15px;
        width: 100%;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:22px;
        margin-bottom: 15px;
        span{
          display:inline-block;
          width:4px;
          height:18px;
          background:rgba(230,88,49,1);
          margin: 0 5px;
          transform: translateY(2px);
          float: left;
        }
        p{
          position: relative;
          width: 25%;
          margin-left: 20px;
          float: left;
          .el-button{
            width: 100%;
          }
          img{
            display: inline-block;
            position: absolute;
            right: 0;
            top:0;
          }
        }

      }
    }
    .ziqudao{
      width: 100%;
      padding: 0  0 0 15px;

      .qitaP{
        span{
          display: inline-block;
          float: left;
        }
        width: 100%;
        overflow: hidden;
        margin-bottom: 15px;
        .el-textarea{
          display: inline-block;
          float: left;
          width: 25%;
          margin-left: 20px;
        }
      }
      .ziqudaoP{
        overflow: hidden;
        margin-bottom: 15px;
        width: 100%;
        .el-select{
          margin-left: 20px;
          width: 25%;
        }

      }
    }
  }
  .footer{
    width: 100%;
    height: 25px;
    p:nth-child(1){
      width:100%;
      height:36px;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:25px;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      .el-button{
        width: 30%;
      }
    }
  }

</style>








