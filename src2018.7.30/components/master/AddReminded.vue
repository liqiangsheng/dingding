
<template>
  <div id="app">
    <!--新增-->
    <div class="container" v-if="!this.edit.item">
      <h3 class="alert_title">{{edit.title}}  <p class="closeX" @click="shutAlert"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
          <p class="title">基本信息</p>
          <ul class="add_reminded">
            <li>
               <span class="list_name">{{parseType.name}}<b style="color: #EA5413">*</b></span>
              <el-select
                v-model.trim="parseType.SourceTypeValue" :placeholder="'请选择'+parseType.name"
                @change="selector(parseType,parseType.SourceType,parseType.SourceTypeValue)">
                <el-option
                  v-for="(items,index) in parseType.SourceType"
                  :key="index"
                  :value="items.value">
                </el-option>
              </el-select>
              <a v-show="parseType.isBool" style="color: red;">{{parseType.isBool}}</a>
            </li>
            <li>
               <span class="list_name">{{parseLeave.name}}<b style="color: #EA5413">*</b></span>
              <el-select
                v-model.trim="parseLeave.SourceTypeValue" :placeholder="'请选择'+parseLeave.name"
                @change="selector(parseLeave,parseLeave.SourceType,parseLeave.SourceTypeValue)">
                <el-option
                  v-for="(items,index) in parseLeave.SourceType"
                  :key="index"
                  :value="items.value">
                </el-option>
              </el-select>
              <a v-show="parseLeave.isBool" style="color: red;">{{parseLeave.isBool}}</a>
            </li>
            <li>
              <span class="list_name">{{cityArray.name}}<b style="color: #EA5413">*</b></span>
              <el-select
                v-model.trim="cityArray.SourceTypeValue" :placeholder="'请选择'+cityArray.name"
                @change="selector(cityArray,cityArray.SourceType,cityArray.SourceTypeValue)">
                <el-option
                  v-for="(items,index) in cityArray.SourceType"
                  :key="index"
                  :value="items.name">
                </el-option>
              </el-select>
              <a v-show="cityArray.isBool" style="color: red;">{{cityArray.isBool}}</a>
            </li>
            <li id="listName">
              <span class="list_name">服务工种<b style="color: #EA5413">*</b></span>
              <el-cascader ref="fuwugongzhong" id="labelId" style="width: 200px;height: 40px"
                           @change="changeSelectorTwo"
                           :disabled="isDisabled"
                           :options="labeloptions2"
                           placeholder="请选择服务工种"
                           change-on-select
                           :props="props1"></el-cascader>
              <a v-show="labeloptionsIsBool" style="color: red;">{{labeloptionsIsBool}}</a>
            </li>
            <li>
              <span class="list_name">{{serverType.name}}</span>
              <el-select
                v-model.trim="serverType.SourceTypeValue" :placeholder="'请选择'+serverType.name"
                @change="selector(serverType,serverType.SourceType,serverType.SourceTypeValue)">
                <el-option
                  v-for="(items,index) in serverType.SourceType"
                  :key="index"
                  :value="items.value">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <div id="xian"></div>
        <div class="right_info">
          <p class="title">业务类别提点</p>
          <ul style="position: relative">
            <li v-for="(item,index) in RemindedList[0].SourceType">
              <span class="list_name">{{item.feeType}}</span>
              <img :src="item.reduceImg" @click="reduceOne(item,index)">
              <el-input type="number" style="width:80px" v-model="item.shareValue" min=0 :max="item.maxNum" @blur="changeCount(item,index)"></el-input>
              <img style="margin-right: 26px" src="/static/images/add.png" @click="addOne(item,index)" @blur="changeCount(item.shareValue)">
              <el-select style=" width:90px"
                         v-model="item.danweiStr"
                         placeholder="请选择"
                         @change="selectorOne1(item,index)">
                <el-option
                  v-for="(items,index) in item.danwei"
                  :key="items.value"
                  :value="items.value">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
      </div>
      <div id="btn">
        <el-button @click="shutAlert">退出</el-button>
        <el-button type="primary" @click="Preservation()">保存</el-button>
      </div>
    </div>
    <!--详情-->
    <div class="container" v-if="this.edit.item">
      <h3 class="alert_title">{{edit.title}}  <p class="closeX"  @click="shutAlert"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
          <p class="title">基本信息</p>
          <ul class="add_reminded">
            <li style="padding-left: 20px;height: 40px">
              <span class="list_name">{{parseType.name}}：</span>
             {{this.edit.item.masterType|mastertype}}
            </li>
            <li style="padding-left: 20px;height: 40px">
              <span class="list_name">{{parseLeave.name}}：</span>
              {{this.edit.item.masterLevel|masterLevel}}
            </li>
            <li style="padding-left: 20px;height: 40px">
              <span class="list_name">{{cityArray.name}}：</span>
              {{this.edit.item.area}}
            </li>
            <li id="listName1" style="padding-left: 20px;height: 40px">
              <span class="list_name">服务工种：</span>
              {{this.edit.item.labelName}}
            </li>
            <li style="padding-left: 20px;height: 40px">
              <span class="list_name">服务类型：</span>
              {{this.edit.item.serverType|serverType}}
            </li>
          </ul>
        </div>
        <div id="xian1"></div>
        <div class="right_info">
          <p class="title">业务类别提点</p>
          <ul style="position: relative">
            <li v-for="(item,index) in RemindedList[0].SourceType">
              <span class="list_name">{{item.feeType}}</span>
              <img :src="item.reduceImg" @click="reduceOne(item,index)">
              <el-input type="number" style="width:80px" v-model="item.shareValue" min=0  :max="item.maxNum" @blur="changeCount(item,index)"></el-input>
              <img style="margin-right: 26px" src="/static/images/add.png" @click="addOne(item,index)" @blur="changeCount(item.shareValue)">
              <el-select style=" width:90px"
                         v-model="item.danweiStr"
                         placeholder="请选择"
                         @change="selectorOne1(item,index)">
                <el-option
                  v-for="(items,index) in item.danwei"
                  :key="items.value"
                  :value="items.value">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
      </div>
      <div id="btn1">
        <el-button @click="shutAlert">退出</el-button>
        <el-button type="primary" @click="Preservation()">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:["edit","quiry"],
    data(){
      return{
        isDisabled:true,
        serverType:{
          name: " 服务类型",
          isBool:"",
          key: "serverType",
          SourceTypeValue: '',
          SourceType:[
            {
              value: '--请选择--',
              id: ""
            },
            {
              value: '小修',
              id: "1"
             },
            {
              value: '中修',
              id: "2"
            },
            {
              value: '大修',
              id: "3"
            },
            {
              value: '检修',
              id: "4"
            },
          ]
        },
        labeloptionsNum:"", //服务工种数字
        labeloptionsIsBool:"",//服务工种错误提示
        labeloptions2: [],//服务工种数据
        isKeXuan:true,
        props1: {
          value: 'a',
          label: "b",
          children: 'beans'
        },
        isAdd:true,
        parseType:{
            name: "师傅类别",
            isBool:"",
            key: "masterType",
            SourceTypeValue: '',
            SourceType: [
              {
                value: '自营师傅',
                id: "1"
              }, {
                value: '兼职师傅',
                id: "2"
              }, {
                value: '网点师傅',
                id: "3"
              }
            ]
          },
        parseLeave:{
            name: "师傅等级",
            isBool:"",
            key: "masterLevel",
            SourceTypeValue: '',
            SourceType: [
              {
                value: '初级师傅',
                id: "Primary"
              }, {
                value: '中级师傅',
                id: "MiddleRank"
              }, {
                value: '高级师傅',
                id: "Advanced"
              }
            ]
          },
      cityArray:{
            name: "服务城市",
            isBool:"",
            key: "areaId",
            SourceTypeValue: '',
            SourceType: []
          },
        number:"",
        RemindedList:[
          {
            name:"费用类别",
            key:"feeTypeKey",
            SourceTypeValue: '', //选中后的
            SourceType:[
              {
                shareTypeKey:"Proportion",
                danweiStr: "%",
                danwei: [{danweiid: "Proportion", value: "%"}, {danweiid: "Quota", value: "元/单"}],
                reduceImg: "/static/images/redcue.png",
                shareValue: 0+"",
                maxNum:100,
                feeType: '上门费',
                feeTypeKey:"prince1"
              }, {
                shareTypeKey:"Proportion",
                danweiStr: "%",
                danwei: [{danweiid: "Proportion", value: "%"}, {danweiid: "Quota", value: "元/单"}],
                reduceImg: "/static/images/redcue.png",
                feeType: '服务费',
                feeTypeKey: "prince2",
                maxNum:100,
                shareValue: 0+"",
              }, {
                shareTypeKey:"Proportion",
                danweiStr: "%",
                danwei: [{danweiid: "Proportion", value: "%"}, {danweiid: "Quota", value: "元/单"}],
                reduceImg: "/static/images/redcue.png",
                feeType: '配件费',
                shareValue: 0+"",
                maxNum:100,
                feeTypeKey:"prince3"
              }, {
                shareTypeKey:"Proportion",
                danweiStr: "%",
                danwei: [{danweiid: "Proportion", value: "%"}, {danweiid: "Quota", value: "元/单"}],
                reduceImg: "/static/images/redcue.png",
                feeType: '高空费',
                shareValue: 0+"",
                maxNum:100,
                feeTypeKey:"prince4"
              }
            ]
          },
        ],
        DataRequest: [], //数据请求
        RemindedDataList:[],
        potionValueId:'',
        isShow:true,
        selectorBehindObj:{},
        props: {
          value: 'label',
          children: 'cities',
        },
      }
    },
    watch: {

    },
    created(){
      console.log(this.edit)
      if(!this.edit.item){     //点新增
        let  url=this.$apidomain+"/common/findcitylistareainfo";  //城市
        this.$http.get(url).then(res=>{
          if(res.data.code === "0000"){
            this.cityArray.SourceType = res.data.result;
          }else{
            this.$message({
              message: res.data.error,
            });
          }

        });

         url=this.$apidomain+"/common/findflabelbusinessname"; //分类
        this.$http.get(url).then(r=>{
          r.data.result.forEach((v, i) => {
            let urlTwo = this.$common.apidomain + '/articleinfo/findlabelbusinessbyflabel?id=' + v.id;
            this.$http.get(urlTwo).then(res => {
              if (res.data.code === "0000") {
                this.labeloptions2.push(res.data.result)
              }else{
                this.$message({
                  message: res.data.error,
                });
              }
            })
          })
        });
      }else{
//        console.log(this.edit.item)
//        this.edit.item.operateTime = this.$moment(this.edit.item.operateTime).format('YYYY-MM-DD HH:mm:ss');
        let param = {params:{
          area:this.edit.item.area,
          areaId:this.edit.item.areaId,
          areaLevel:this.edit.item.areaLevel,
          feeType:this.edit.item.feeType,
          feeTypeKey:this.edit.item.feeTypeKey,
          id:this.edit.item.id,
          labelId:this.edit.item.labelId,
          labelName:this.edit.item.labelName,
          masterLevel:this.edit.item.masterLevel,
          masterType:this.edit.item.masterType,
          shareTypeKey:this.edit.item.shareTypeKey,
          shareValue:this.edit.item.shareValue+"",
        }}
        let url = this.$apidomain + "/mastercommissionconfig/findlistmasterCommissionConfig";
        this.$http.get(url,param).then(res=>{
          console.log(res,'我是')
          if(res.data.code === "0000"){
             res.data.result.forEach((v1,index)=>{
               if(this.RemindedList[0].SourceType[0].feeType === v1.feeType){
                 console.log("上门费",v1.shareTypeKey)
                // this.RemindedList[0].SourceType[0].shareValue = v1.shareValue+"";
                // this.RemindedList[0].SourceType[0].shareTypeKey = v1.shareTypeKey;
                 this.$set(this.RemindedList[0].SourceType[0],"shareValue",v1.shareValue+"");

                 this.$set(this.RemindedList[0].SourceType[0],'shareTypeKey',v1.shareTypeKey)
                 this.RemindedList[0].SourceType[0].danwei.forEach((v,i)=>{
                      if(v.danweiid === this.RemindedList[0].SourceType[0].shareTypeKey){
                        this.RemindedList[0].SourceType[0].danweiStr = v.value;
                      }
                    })
               }
               if(this.RemindedList[0].SourceType[1].feeType === v1.feeType){
                 this.RemindedList[0].SourceType[1].shareValue = v1.shareValue+"";
                 this.RemindedList[0].SourceType[1].shareTypeKey = v1.shareTypeKey;
                 this.RemindedList[0].SourceType[1].danwei.forEach((v,i)=>{
                  if(v.danweiid === this.RemindedList[0].SourceType[1].shareTypeKey){
                    this.RemindedList[0].SourceType[1].danweiStr = v.value;
                  }
                })
               }
               if(this.RemindedList[0].SourceType[2].feeType === v1.feeType){
                 this.RemindedList[0].SourceType[2].shareValue = v1.shareValue+"";
                 this.RemindedList[0].SourceType[2].shareTypeKey = v1.shareTypeKey;
                 this.RemindedList[0].SourceType[2].danwei.forEach((v,i)=>{
                  if(v.danweiid === this.RemindedList[0].SourceType[2].shareTypeKey){
                    this.RemindedList[0].SourceType[2].danweiStr = v.value;
                  }
                })
               }
               if(this.RemindedList[0].SourceType[3].feeType === v1.feeType){
                 this.RemindedList[0].SourceType[3].shareValue = v1.shareValue+"";
                 this.RemindedList[0].SourceType[3].shareTypeKey = v1.shareTypeKey;
                 this.RemindedList[0].SourceType[3].danwei.forEach((v,i)=>{
                  if(v.danweiid === this.RemindedList[0].SourceType[3].shareTypeKey){
                    this.RemindedList[0].SourceType[3].danweiStr = v.value;
                  }
                })
               }
             })
            console.log(this.RemindedList[0],"fdsjfdsakj")
            this.RemindedList[0].SourceType.forEach((v,i)=>{
              if(v.feeType === "上门费"){
                this.createdOne(v);
              }
              if(v.feeType === "服务费"){
                this.createdOne(v);
              }
              if(v.feeType === "配件费"){
                this.createdOne(v);
              }
              if(v.feeType === "高空费"){
                this.createdOne(v);
              }
            })
          }else{
            this.$message({
              message: res.data.error,
            });
          }
        })

      }
    },
    methods: {
      Preservation(){ //保存
            if(!this.edit.item){
              if(this.parseType.SourceTypeValue == ''){
                this.parseType.isBool ="请选择师傅类型"
                return
              }else{
                this.parseType.isBool = "";
              }
              if(this.parseLeave.SourceTypeValue == ''){
                this.parseLeave.isBool ="请选择师傅等级"
                return
              }else{
                this.parseLeave.isBool = "";
              }
              if(this.cityArray.SourceTypeValue == ''){
                this.cityArray.isBool ="请选择服务城市"
                return
              }else{
                this.cityArray.isBool = "";
              }
              if(this.labeloptionsNum == ""){
                this.labeloptionsIsBool ="请选择服务工种"
                return
              }else{
                this.labeloptionsIsBool = "";
              }
              let aArray = [];
              this.RemindedList[0].SourceType.forEach((item,index)=>{
                if(item.shareValue != "0"){
                  aArray.push(item)
                }
              })
              this.selectorBehindObj.configIdsJson = aArray.length>0?JSON.stringify(aArray):"";
              let url = this.$apidomain +  "/mastercommissionconfig/saveCommissionConfig";//新增
              this.$http.post(url,this.selectorBehindObj).then(res => {
                if(res.data.code === "0000"){
                  this.$message({
                    message: "新增成功"
                  });
                  this.shutAlert();
                  this.quiry();
                }else{
                  this.$message({
                    message: res.data.error
                  });
                }
              })

        }else{
              let aArray = [];
              this.RemindedList[0].SourceType.forEach((item,index)=>{
                if(item.shareValue != "0"){
                  aArray.push(item)
                }
              })
             this.selectorBehindObj.id = this.edit.item.id;
              this.selectorBehindObj.area = this.edit.item.area;
              this.selectorBehindObj.areaId = this.edit.item.areaId;
              this.selectorBehindObj.labelId = this.edit.item.labelId;
              this.selectorBehindObj.labelName = this.edit.item.labelName;
              this.selectorBehindObj.masterLevel = this.edit.item.masterLevel;
              this.selectorBehindObj.masterType = this.edit.item.masterType;
              this.selectorBehindObj.configIdsJson  =  aArray.length>0?JSON.stringify(aArray):"";
              this.selectorBehindObj.serverType =  this.edit.serverType; //服务类型
              let url = this.$apidomain + "/mastercommissionconfig/editCommissionConfig "; //编辑
              this.$http.post(url, this.selectorBehindObj).then(res => {
                if(res.data.code === "0000"){
                  this.$message({
                    message: "修改成功"
                  });
                  this.shutAlert();
                  this.quiry();
                }else{
                  this.$message({
                    message: res.data.error
                  });
                }
              })
        }


      },
      selector(item,v,i){//师傅类别 //师傅等级 //服务城市
        if(item.name === "师傅类别"){
          if(v){
            this.parseType.isBool = "";
            v.forEach((vI,index)=>{
              if(vI.value === i){
                this.selectorBehindObj.masterType = vI.id;
              }
            })
          }
        }
        if(item.name === "师傅等级"){
          if(v){
            this.parseLeave.isBool = "";
            v.forEach((vI,index)=>{
              if(vI.value === i){
                this.selectorBehindObj.masterLevel = vI.id;
              }
            })
          }
        }
        if(item.name === "服务城市"){
            if(v){
              this.cityArray.isBool = "";
              this.isDisabled = false;
              v.forEach((vI,index)=>{
                if(vI.name === i){
                  this.selectorBehindObj.areaId = vI.id;
                  this.selectorBehindObj.area = vI.name;
                }
              })
            }else{
              this.isDisabled = true;
            }
          }
        if(item.name === "服务类型"){
          if(v){
            this.serverType.isBool = "";
            v.forEach((vI,index)=>{
              if(vI.value === i){
                this.selectorBehindObj.serverType = vI.id;
              }
            })
          }
        }
      },
      selectorOne1(v, i) { //单位选择
        if(v.feeType === "上门费"){
          this.danwei(v);
        }
        if(v.feeType === "服务费"){
          this.danwei(v);
        }
        if(v.feeType === "配件费"){
          this.danwei(v);
        }
        if(v.feeType === "高空费"){
          this.danwei(v);
        }
      },
      danwei(v){//单位选择
        v.danwei.forEach((item,index)=>{
          if(v.danweiStr === item.value){
            v.shareTypeKey = item.danweiid;

          }
        })
        console.log(v,"dsfdsfds")
        if(v.danweiStr === "%"){
          v.maxNum = 100;
          v.shareValue = 0;
        }else{
          v.maxNum = 1000;
          v.shareValue = 0;
        }
      },
      changeCount1(v){//失去焦点
        if (v.shareValue <= 0) {
          v.shareValue = 0+"";
          v.reduceImg = "./static/images/redcue.png"
        } else  if (v.shareValue >= v.maxNum) {
          v.shareValue = v.maxNum+"";
          v.reduceImg = "./static/images/reduce.png"
        }else{
          v.reduceImg = "./static/images/reduce.png"
        }
      },
      changeCount(v, i) {//失去焦点
        if(v.feeType === "上门费"){
          this.changeCount1(v);
        }
        if(v.feeType === "服务费"){
          this.changeCount1(v);
        }
        if(v.feeType === "配件费"){
          this.changeCount1(v);
        }
        if(v.feeType === "高空费"){
          this.changeCount1(v);
        }

      },
      createdOne(v){ //减
        if (v.shareValue <= 0) {
          v.reduceImg = "./static/images/redcue.png"
        } else {
          v.reduceImg = "./static/images/reduce.png"
        }
      },
      reduceOne1(v){ //减
        v.shareValue--;
        if (v.shareValue <= 0) {
          v.shareValue = 0+"";
          v.reduceImg = "./static/images/redcue.png"
        } else {
          v.reduceImg = "./static/images/reduce.png"
        }
      },
      reduceOne(v, i) { //减
        if(v.feeType === "上门费"){
         this.reduceOne1(v)
        }
        if(v.feeType === "服务费"){
          this.reduceOne1(v)
        }
        if(v.feeType === "配件费"){
          this.reduceOne1(v)
        }
        if(v.feeType === "高空费"){
          this.reduceOne1(v)
        }

      },
      addOne1(v){
        v.shareValue++;
        if (v.shareValue >=v.maxNum) {
          v.shareValue = v.maxNum+"";
          v.reduceImg = "./static/images/reduce.png"
        }else{
          v.shareValue = v.shareValue+"";
          v.reduceImg = "./static/images/reduce.png"
        }
      },
      addOne(v, i) { //加
        if(v.feeType === "上门费"){
          this.addOne1(v)
        }
        if(v.feeType === "服务费"){
          this.addOne1(v)
        }
        if(v.feeType === "配件费"){
          this.addOne1(v)
        }
        if(v.feeType === "高空费"){
          this.addOne1(v)
        }
      },
      changeSelectorTwo(value){//服务工种
        this.labeloptionsNum = 1;
        if(value.length === 1){
          this.selectorBehindObj.labelId=value[0];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0]
        }else if(value.length === 2){
          this.selectorBehindObj.labelId=value[1];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1]
        }else if(value.length === 3){
          this.selectorBehindObj.labelId=value[2];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2]
        }else if(value.length === 4){
          this.selectorBehindObj.labelId=value[3];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3]
        }else if(value.length === 5){
          this.selectorBehindObj.labelId=value[4];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3] + "/" + this.$refs.fuwugongzhong.currentLabels[4]
        }else if(value.length === 6){
          this.selectorBehindObj.labelId=value[5];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3] + "/" + this.$refs.fuwugongzhong.currentLabels[4] + "/" + this.$refs.fuwugongzhong.currentLabels[5]
        }else if(value.length === 7){
          this.selectorBehindObj.labelId=value[6];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[6]
        }
        this.labeloptionsIsBool = "";
      },
      preserve(item,index){        //保存
        let url=this.$apidomain+"/mastercommissionconfig/updateMasterCommissionConfig";
        this.$http.post(url,item).then(res=>{
          let data = res.data;
          this.quiry();
        })
      },


      //关闭弹框
      shutAlert(){
        this.edit.isShow=false;
      },
    },
    mounted() {

    },

  }
</script>


<style scoped lang="scss">
  @import "../../assets/styles/commButton";

  img {
    margin: 0 6px;
    transform: translateY(10px);
  }
  .container {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    overflow-y: auto;
    letter-spacing: 0;
    width: 960px;
    height: 620px;
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding-top: 0;
    > h3 {
      height: 68px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: rgba(57, 57, 57, 1);
      font-family: MicrosoftYaHei;
      text-align: center;
      letter-spacing: 0;
      border-bottom: 2px solid rgba(151, 151, 151, 1);
    }
    .content {
      padding: 19px 30px;
      width: 100%;
      height: 420px;
      .left_info {
        float: left;
        display: inline-block;
        width: 400px;
        height: 420px;
        .title {
          width: 400px;
          height: 30px;
          background: rgba(240, 240, 240, 1);
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
          padding: 0 11px;
        }
        ul {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          li {
            width: 100%;
            margin-top: 18px;
          }
        }
      }
      #xian,#xian1 {
        float: left;
        position: absolute;
        left: 475px;
        top: 112px;
        display: inline-block;
        border: 1px solid rgba(151, 151, 151, 1);
        height: 345px;
      }
      .right_info {
        float: left;
        margin-left: 88px;
        display: inline-block;
        width: 400px;
        height: 420px;
        .title {
          width: 400px;
          height: 30px;
          background: rgba(240, 240, 240, 1);
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
          padding: 0 11px;
        }
        ul {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          li {
            width: 100%;
            margin-top: 18px;

          }
        }
      }
    }

    .closeX {
      background: url(../../../static/images/del.png) center center no-repeat;
      background-size: 100% 100%;
      background-origin: content-box;
      position: absolute;
      right: 32px;
      top:-5px;
    }
  }
</style>
<style lang="scss">
  .bnt {
    .el-botton {
      background: red;
    }
  }

  .el-select-dropdown__item {
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }
  .el-cascader-menus{
    z-index: 9999 !important;
  }

  #btn, #btn1 {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 38px;
    button {
      width: 200px;
      height: 40px;
      text-align: center;
      margin-left: 28%;
      margin-right: 10px;
    }
  }

  #listName,#listName1 {
    width: 100%;
    .el-input {
      width: 200px;
    }
    .el-cascader__label {
      line-height: 40px !important;
    }
  }
</style>
