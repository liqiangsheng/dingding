
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isAdd.title}}
        <!--<p class="closeX" id="closeX" @click="closeMove"></p>-->
      </h3>
      <div class="scrollbar content">
        <div class="left_info">
       <ul>
          <li class="add_master">
            <li>
              <span class="list_name"> 折扣名称 : </span>
              <el-input
                placeholder="请输入内容"
                v-model="selectorBehindObj.saleName"
              >
              </el-input>
            <span style="color:red;" v-if="!!NameText">{{NameText}} ！</span>
            </li>
            <li>
              <div class="list_name">折扣周期 :</div>
              <DatePicker v-if="isEditInput"  @on-change="initDate" v-model="selectorBehindObj.date"  type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" style="width: 200px"></DatePicker>
              <span v-else>{{selectorBehindObj.date[0]|moment('YYYY-MM-DD HH:mm:ss')}}~{{selectorBehindObj.date[1]|moment('YYYY-MM-DD HH:mm:ss')}}</span>
            </li>
            <li>
              <div class="list_name">
                结算方式 :
              </div>
              <el-radio-group v-model="radio2" @change="radio">
                <el-radio :label="1">平台承担</el-radio>
                <el-radio :label="2">平台网点和师傅共担</el-radio>
              </el-radio-group>
            </li>
            <li v-for="(item,index) in inputs" :key="index">
              <span class="list_name"> {{item.name}} : </span>
              <el-input
                :type="item.type"
                :min="item.min"
                v-if="!item.isText"
                placeholder="请输入内容"
                v-model="item.value">
              </el-input>
              <span v-if="item.isText">{{item.value}}</span>  &nbsp; &nbsp; &nbsp;<span v-if="item.text" v-text="item.text"></span>
            </li>
            <li>
 <!--渠道  start-->
            <li  v-for="(item,index) in optionList" id="irrigation_ditch">
              <span class="list_name">{{item.name}} :</span>
                   <el-cascader v-if="isEditInput"
                                ref="class"
                                :disabled="isAll"
                                :placeholder="channelPlaceholder"
                                :change-on-select="true"
                                :options="options"
                                :props="props"
                                v-model="selectedOptions2"
                                @change="handleChange">
                   </el-cascader>
                   <el-checkbox  v-if="isEditInput" @change="checkAll(checkeAll)" style="transform:translateX(20px);" v-model="checkeAll">全部通用</el-checkbox>
                  <span v-if="!isEditInput">{{selectorBehindObj.channelId==='ALL'?'全部通用':channelPlaceholder}}</span>
            </li>
  <!--渠道  end-->
          </ul>
          <div  v-for="(item,index) in searchOptionList" :key="index" class="list">
            <div class="list_name" style="width:88px;">
              {{item.name}} :
            </div>
            <el-select
              v-model="item.SourceTypeValue" placeholder="请选择" @change="selectorSearch(item,item.SourceType,item.SourceTypeValue)">
              <el-option
                v-for="items in item.SourceType"
                :key="items.name"
                :value="items.name"
              >
              </el-option>
            </el-select>
          </div>
          <div class="list" id="searchType">
            <span class="list_name">分类 :</span>
            <el-cascader
                         :disabled="isEdit"
                         :change-on-select="true"
                         :options="searchTypeList"
                         :props="props"
                         v-model="selectedType"
                         @change="handleChang">
            </el-cascader>
          </div>
          <div  class="list">
            <div class="list_name">
              产品名称 :
            </div>
              <el-input v-model="searchParams.fullName"></el-input>
          </div>
          <div style="width:100%;overflow: hidden;padding-top:20px;" >
          <button  class="button"  @click="search()" style="position:relative;top:0;left:50%;transform: translateX(-50%)">搜索</button>
          </div>

<!--列表 start-->
          <div class="harder">
            <div class="left">
              <el-button @click="batchAdd(isCheckboxList,tableList)">
                批量添加
              </el-button>
            </div>
            <div class="right">
              <el-button @click="batchDel($store.state.rightCheckbox,$store.state.rightTableList)" style="margin-right:10%;">
                批量删除
              </el-button>
              <el-select
                style="width:150px;"
                v-model="rebateType.SourceTypeValue" placeholder="启用百分比设置"  @change="selector(rebateType.SourceTypeValue)">
                <el-option
                  v-for="items in rebateType.SourceType"
                  :key="items.name"
                  :value="items.name"
                >
                </el-option>
              </el-select>
                批量设置折扣 : <el-input style="width:90px;" type="number" :max="isRebateType?520:10" v-model="rebateSum"></el-input> {{isRebateType?typeTexts[1]:typeTexts[0]}}
              <el-button @click="enter($store.state.rightCheckbox,$store.state.rightTableList,rebateSum)"  style="margin-left:10px;">
                确定
              </el-button>
              <el-button @click="createAdvert">
                生成广告位
              </el-button>
            </div>
          </div>
          <table  id="table" cellSpacing="0px" cellpadding="0">
            <thead>
            <tr class="theads">
              <th>
                <el-checkbox :disabled="!tableList.length" v-model="checked" @change="wholeSelector(tableList,checked)"></el-checkbox>
              </th>
              <th v-for="(item,index) in theadsName1" :key="index">{{item}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tableList">
              <td>
                <el-checkbox :disabled="!isAddProduct(item.saleState,index)" v-model="isCheckboxList[index]"  @change="isCheckbox(item,index)"></el-checkbox>
              </td>
              <td>
                {{item.cityName}}
              </td>
               <td style="width:200px;">
                {{item.fullName}}
              </td>
              <td>
               {{item.name}}
              </td>
              <td>
                {{item.servicePrice}}
              </td>
              <td>
                {{item.saleState|agioProductStatus}}
              </td>
              <td class="icon">
                   <span>
                     <el-button @click="lookOver(item.serviceId)"  type="text">
                      查看折扣
                      </el-button>
                   </span>
                <span v-if="isAddProduct(item.saleState)">
                  <el-button @click="add(item,index)" type="text">
                        添加
                  </el-button>
                </span>
              </td>
            </tr>
            </tbody>
          </table>
<!--列表 end-->

<!--列表 start-->
          <tables-right v-if="!loading2" :leftTableList="tableList" :leftIsCheckboxList="isCheckboxList"></tables-right>
<!--列表 end-->
        </div>
        </div>
    </div>
    <div class="btn">
      <button class="button" @click="closeMove()">关闭</button>
      <button   @click="submitAdd()" class='button selector'>确定</button>
    </div>
    <coolk-rebate v-if="coolkRebateAlert.isShow" :quiry="search" :data="coolkRebateAlert" ></coolk-rebate>
  </div>
</template>
<script>
  import {selectorCheck,selectorAll,getThis} from "@/components/order/js/pagingPages"
  import tablesRight from "./tablesRight"
  import coolkRebate from "./coolkRebate"
  export default {
    props:["isAdd","quiry"],
    components:{
      tablesRight,
      coolkRebate
    },
    data(){
      return{
        loading2: true,
        typeTexts:["折","元"],
        isAdv:"1",     //生成广告位；
        isRebateType:false,
        rebateType:{
          SourceTypeValue:"启用百分比设置",
          SourceType:[
            {
              name:"启用固定价设置"
            },
            {
              name:"启用百分比设置"
            },
          ]
        },
        checked:false,
        channelPlaceholder:"请选择",
        paramsId:"",
        isAll:false,
        rebateSum:0,
        checkeAll:false,
        rightCheckbox:[],
        coolkRebateAlert:{
          isShow:false,
          id:""
        },
        isCheckboxList:[],
        searchParams:{},
        rightTableList:[],
        tableList:[],
        theadsName1:[
          "城市",
          "产品名称",
          "服务费类型",
          "服务费（元）",
          "折扣状态",
          "操作",
        ],
        serviceNames:"",
        productName:"",
//        二级分类  下拉列表 start
        searchTypeList:[],

//        二级分类  下拉列表 end
        searchOptionList:[
          {
            name: "城市",
            key: "cityCode",
            SourceTypeValue: '',
            SourceType:this.$store.state.cityData
          }, {
            name: "一级分类",
            key: "skillId",
            SourceTypeValue: '',
            SourceType: []
          }
        ],
        optionList: [
          {
            name: "渠道",
            key: "channelId",
            SourceTypeValue: '',
            SourceType: []
          },
        ],
        selectedOptions2: [],
        selectedType:[],
        options: [],
        subMitId:"",
        saleId:"",
        isEdit:true,
        isDate:true,                      //判断用户选择的时间是不是小于当前时间，如果是，则抛出异常；
        isEditInput:true,                 //如果是编辑进来的   折扣周期和渠道不可编辑
        NameText:"",
        selectorBehindObj:{              //设置折扣params;
          "settleType":2,              //结束方式
          "areaName":"深圳市",
          "areaId":"0101",
          "saleName":"",            //折扣名称
          "date":[],
        },
        isSiteShow:false,
        radio2:2,
        inputs:[
         {
            min:0,
            name:"设置限购",
            isText:false,
            text:"件",
            type:"number",
            key:"limitCollar",
            errorContent:"info",
            value:0
          }
        ],
        props: {
          value: 'a',
          label: "b",
          children: 'beans'
        },
      }
    },
    created(){
      this.$store.commit("initRightTableList");
      this.getArticleinfo();
        if(this.isAdd.data&&this.isAdd.data.id){
              this.subMitId=this.isAdd.data.id;
                let url =`${this.$apidomain}/sale/findoneServiceSale?id=${this.subMitId}`;
                    this.$http.get(url).then(res=>{
                        let datas=res.data;
                        if(datas.code==="0000"){
                          this.isEditInput=false;
                          this.loading2=false;
                          if(datas.result.saleDetail) {
                            let newArray = datas.result.saleDetail.map(v => {
                              return {
                                cityCode: v.areaId,
                                cityName: v.areaName,
                                fullName: v.serviceName,
                                name: v.serviceType,
                                saleState: v.saleState,
                                type:v.saleType,
                                serviceId: v.serviceId,
                                servicePrice: v.servicePrice,
                                agio: v.saleVal * 10,
                                agioSaver: v.serviceSalePrice
                              };
                            });
                            this.$store.commit("editAddRightTableList", {newArray});
                          }
                            let data = datas.result, date = [data.startTime, data.endTime];
                            this.selectorBehindObj.saleName = data.saleName;
                            this.selectorBehindObj.date = date;
                            this.radio2 = data.settleType;        //结算方式
                            this.subMitId = data.id;
//          limitCollar
                            this.inputs.forEach((v, i) => {
                              if (v.key === "limitCollar") {
                                this.inputs[i].value = data.limitCollar
                              }
                            });
                            if (data.channelId === "ALL") {
                              this.checkeAll = true;
                              this.checkAll(true);
                            } else {
                              this.optionList.forEach((v, i) => {
                                if (v.key === "channelId") {
                                  this.channelPlaceholder = data.channelName.replace(/,/g, "/");
                                }
                              })
                            }
                            this.selectorBehindObj["channelId"] = data.channelId;
                            this.selectorBehindObj["channelName"] = data.channelName;
                            this.saleId = data.saleId;
//                          this.search();   //初始化调用
  /*
        cityCode:"0101"
        cityName:"深圳"
        fullName:"苹果-iPhone7-屏幕问题-内屏碎（图像不正常）-金色"
        isDisb:true
        name:"服务费"
        saleState:3
        serviceId:"003001002001002003001"
        servicePrice:1160
    原有数据 start
      areaId:"0101"
      areaName:"深圳"
      createTime:1517908689000
      endTime:1517932800000
      id:47
      saleId:"872973590019"
      saleName:"通用折扣测试"
      saleState:2
      saleVal:0.8
      serviceId:"003001002007001001"
      serviceName:"苹果-iPhone7-感应问题-通话时不黑屏/通话立即黑屏"
      servicePrice:422.5
      serviceSalePrice:338
      serviceType:"服务费"
      startTime:1517846400000
*/
                        }else{
                          this.$queryFun.successAlert.call(this,data.error)
                        }
                    })
        }else{
          this.loading2=false;
        }
      this.isAll=this.checkeAll;
    },
    methods: {
      // 生成广告位 start
      createAdvert(){
        this.$store.commit("createAdv");
        this.$queryFun.successAlert.call(this,"生成广告位成功","1");
      },
      // 生成广告位 end
      initDate(v){
       this.isDate = this.limitDate(v[0]);
      },
      checkAll(e){
       this.isAll=e;
        this.selectorBehindObj["channelName"]="";
       this.optionList.forEach((v,i)=>{
         if(v.key==="skillId")this.optionList[i].SourceTypeValue="";
       })
        this.selectorBehindObj["channelId"]="ALL";
      },
//批量设置折扣 start
      enter(items,tableList,value){
        let flag=false,i;
        for(i=0;i<items.length;i++){
          if(items[i]){
            flag=true;
            break;
          }
        }
        if(flag){
          //    isRebateType  为true 设置折后服务费 else 设置折扣
          if((!this.isRebateType&&value-0>10)||(!this.isRebateType&&value==0)){
              return this.$queryFun.successAlert.call(this,"设置折扣数不得大于10不得小于1")
          }
          this.$confirm("此操作将批量编辑，是否继续？","编辑",{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'warning'
          }).then(()=>{
            let flag=true;
              tableList.forEach((v,i)=>{
                if(items[i]){
                  if(this.isRebateType){
                    if(value-0>v.servicePrice){
                      this.$set(tableList[i],"color","red");
                      flag=false;
                      this.$queryFun.successAlert.call(this,"折后服务费不得大于原服务费");
                    }else{
                      this.$store.commit("setSaverPriceAll",{value,i,type:2});
                      this.$set(tableList[i],"color","black")
                    }
                  }else{
                    this.$store.commit("setServicePriceAll",{value,i,type:1});
                  }
                }
              });
              if(flag)this.$queryFun.successAlert.call(this,"编辑成功","1");
              this.rebateSum=0;
          }).catch(()=>{
              this.$queryFun.successAlert.call(this,"已取消编辑操作")
          });
        }else{
          this.$queryFun.successAlert.call(this,'请勾选需要批量操作的选项','0')
        }
      },
// 设置判断 是否含有时间冲突的选项 如果有 则不能勾选 添加该选项 start
              isAddProduct(saleState,index=false){
                if(saleState===3){
                    if(index||index===0){
                     this.$set(this.tableList[index],"isDisb",true);
                    }
                  return false;
                  }
                  return true;
              },
 // 设置判断 是否含有时间冲突的选项 如果有 则不能勾选 添加该选项 start
//批量设置折扣 end

//批量添加  start ;
      batchAdd(items,tableList){
        let flag=false,i;
        for(i=0;i<items.length;i++){
          if(items[i]){
            flag=true;
            break;
          }
        }
        if(flag){
          this.$confirm("此操作将批量添加,是否继续？","添加",{
              confirmButtonText:"确定",
              cancelButtonText:"取消",
              type:"warning"
          }).then(()=>{
                let data=[],newArrayList=[],i;
                for(i=0;i<items.length;i++){
                  items[i]?data.push(tableList[i]):newArrayList.push(tableList[i]);
                }
                this.$store.commit("addRightTableList",{newArray:data});
                this.tableList=newArrayList;
                this.isCheckboxList=[];
                this.tableList.forEach(v=>{
                  this.isCheckboxList.push(false)
                });
                this.checked=false;
                this.$queryFun.successAlert.call(this,"批量添加成功","1")
          }).catch(()=>{
            this.$queryFun.successAlert.call(this,"已取消批量添加")
          });
        }else{
          this.$queryFun.successAlert.call(this,'请勾选需要添加的选项')
        }
      },

//批量添加  end ;

      batchDel(items,tableList){
        //批量删除
        let flag=false,i;
        for(i=0;i<items.length;i++){
          if(items[i]){
            flag=true;
            break;
          }
        }
        if(flag){
          this.$confirm('此操作将批量删除，是否继续？',"删除",{
              confirmButtonText:"确定",
              cancelButtonText:"取消",
              type:"warning"
          }).then(()=>{
                let data=[],newArray=[];
                tableList.forEach((v,i)=>{
                  items[i]?data.push(v): newArray.push(v);
                });
                this.$store.commit("delAllRightTable",newArray);
                this.tableList = this.tableList.concat(data);
                /*
                循环从右侧被删除的数据添加到左侧，然后循环新的数据，push isCheckboxList数据
                */
                data.forEach(v=>{
                  this.isCheckboxList.push(false);
                });
                this.$queryFun.successAlert.call(this,"删除成功!","1")
          }).catch(()=>{
                this.$queryFun.successAlert.call(this,"已取消删除操作");
          });
        }else{
          this.$queryFun.successAlert.call(this,'请勾选需要删除的选项','0')
        }
      },
      lookOver(id){
        this.coolkRebateAlert.isShow=true;
        this.coolkRebateAlert.id=id;
      },
      isCheckbox(data,index){                 //列表单选    左侧
        this.$queryFun.isCheckbox.call(this,data,index);
      },
      wholeSelector(data,currentState){       //全选反选    左侧
        this.$queryFun.wholeSelector.call(this,data,currentState)
      },
      search(){
//        查询到左边 table 数据  start；
        if(this.selectorBehindObj.date.length===2&&this.selectorBehindObj.date[0]&&this.selectorBehindObj.date[1]) {
          if(this.isDate){                                // 判断折扣周期是不是  小于当前时间 如果大于 继续往下执行 ；
            this.selectorBehindObj["startTimeStr"] = this.$moment(this.selectorBehindObj.date[0]).format("YYYY-MM-DD HH:mm:ss") === "Invalid date" ? "" : this.$moment(this.selectorBehindObj.date[0]).format("YYYY-MM-DD HH:mm:ss");
            this.selectorBehindObj["endTimeStr"] = this.$moment(this.selectorBehindObj.date[1]).format("YYYY-MM-DD HH:mm:ss") === "Invalid date" ? "" : this.$moment(this.selectorBehindObj.date[1]).format("YYYY-MM-DD HH:mm:ss");
            if(!this.selectorBehindObj["channelId"]){
                return this.$queryFun.successAlert.call(this,"请选择渠道")
            }
//            this.loading2=true;
            let url=`${this.$apidomain}/sale/findServiceInSale`, params={
              "startTimeStr":  this.selectorBehindObj["startTimeStr"],   //开始时间
              "endTimeStr": this.selectorBehindObj["endTimeStr"],       //结束时间
              "fullName":this.searchParams.fullName,
              "labelCode": this.searchParams.labelCode || this.searchParams["skillId"],                //分类id;
              "cityCode":this.searchParams.cityCode,
              "channelId":this.selectorBehindObj["channelId"],                                                         //渠道 Id;
              "saleId":this.saleId,                                       //活动ID  编辑修改才有
            };
            this.$http.post(url,params).then(res=>{
              let data=res.data;
              if(data.code==="0000"){
                this.tableList=data.result;
                this.initChexkboxListFun();
              }else{
                this.$queryFun.successAlert.call(this,data.error)
              }
            });
          }else{
            this.limitDate(this.selectorBehindObj.date[0])
          }
        }else{
           this.$queryFun.successAlert.call(this,"请选择折扣周期");
        }
//        查询到左边 table 数据  end；
      },

//      添加折扣到右边 start
         add(item,index){
          this.$confirm("此操作将添加折扣，是否继续","添加",{
              confirmButtonText:"确定",
              cancelButtonText:"取消",
              type:"warning"
          }).then(()=>{
            let newArray =  this.tableList.splice( index,1);
            this.$store.commit("addRightTableList",{index,newArray});
            this.initChexkboxListFun(index);
            this.$queryFun.successAlert.call(this,"添加成功","1")
          }).catch(()=>{
             this.$queryFun.successAlert.call(this,"已取消添加操作");
          });
      },
//   添加折扣到右边 start
//   添加\删除 全选反选 start
          initChexkboxListFun(index=false){
            if(index||index===0){
              this.isCheckboxList.splice(index,1)
            }else{
              this.isCheckboxList=[];             //每次初始化以及搜索数据的时候，初始化 左侧的isCheckboxList数据，重新循环赋值；
              this.tableList.forEach(v=>{
                this.isCheckboxList.push(false);
              });
            }
          },
//   添加\删除 全选反选 end

      radio(v){
        this.selectorBehindObj["settleType"] =v;
      },
      handleChange(value,v) {
        this.selectorBehindObj["channelId"]=value[value.length-1];
        if(this.$refs.class.currentLabels){
            this.selectorBehindObj["channelName"]=this.$refs.class.currentLabels.join(",");
        }else{
          this.selectorBehindObj["channelName"]=this.$refs.class[0].currentLabels.join(",");
        }
      },
//      /搜索查询勾选任意级 start
      handleChang(value,v) {
        this.searchParams["labelCode"]=value[value.length-1];
//        this.searchParams["serviceIds"]=value[value.length-1];
      },
//      /搜索查询勾选任意级 end

//       判断批量设置折扣的类型 start
      selector(name){
          name==="启用百分比设置"?this.isRebateType=false:this.isRebateType=true;
      },
//       判断批量设置折扣的类型 start

      submitAdd(){
        this.inputs.forEach(v=>{
          if(!v.isText){
            this.selectorBehindObj[v.key]= v.value-0;
          }
        });
//        设置折扣
        this.addData();
      },
      getSecondType(id){
        let url=`${this.$apidomain}/articleinfo/findlabelbusinessbyflabel?id=${id}`;
        this.searchTypeList=[];
        this.$http.get(url).then(r=>{
          let data=r.data;
          if(data.code==="0000"){
            this.searchTypeList.push(data.result);
          }else{
            this.$queryFun.successAlert.call(this,data.error,"0")
          }
        });
      },
      getArticleinfo(){
        let url=this.$apidomain+"/common/findchannels";
        this.options=[];
        this.isDisableds=false;
        this.$http.get(url).then(r=>{
          let data=r.data;
          if(data.code==="0000"){
            this.options=data.result;
          }else{
            this.$queryFun.successAlert.call(this,data.error,"0")
          }
        });
      },

 //搜索查询列表数据   start
      selectorSearch(item,values,SourceTypeValue){
        let key=item.key;
        values.forEach((v,i)=>{
          if(v.name===SourceTypeValue){
            this.searchParams[key]=v.id;
          }
        });
        if(key==="skillId"&&this.searchParams["skillId"]){
            this.isEdit=false;
            this.searchParams["labelCode"]="";
            this.getSecondType(this.searchParams["skillId"])
        }else if(key==="skillId"&&!this.searchParams["skillId"]){
          this.isEdit=true;
          this.searchTypeList=[];
          this.searchParams["labelCode"]="";
        }
      },

//搜索查询列表数据   end                 ["ox1D0s0dySZ_vT3_t0gzsOsSiWsI"]
      addData(){
        this.selectorBehindObj["endTime"]="";
       //结算方式；
        this.selectorBehindObj["settleType"]=this.radio2;
        if(this.selectorBehindObj.date.length===2) {
          this.selectorBehindObj["startTimeStr"] = this.$moment(this.selectorBehindObj.date[0]).format("YYYY-MM-DD HH:mm") === "Invalid date" ? "" : this.$moment(this.selectorBehindObj.date[0]).format("YYYY-MM-DD HH:mm");
          this.selectorBehindObj["endTimeStr"] = this.$moment(this.selectorBehindObj.date[1]).format("YYYY-MM-DD HH:mm") === "Invalid date" ? "" : this.$moment(this.selectorBehindObj.date[1]).format("YYYY-MM-DD HH:mm");
        }
        let exp=/[`‘；“：,，~!@#$%^&*_+<>{}\/'[\]]/g;
        if(exp.test(this.selectorBehindObj["saleName"])){
          return this.$queryFun.successAlert.call(this," 请输入正确的折扣名称，不得出现特殊字符");
        }
        if(!this.selectorBehindObj["saleName"]){                                                        //折扣名称
          return this.$queryFun.successAlert.call(this,"请输入正确的折扣名称，不得超过26个字符","0")
        }else if(!this.selectorBehindObj["startTimeStr"]||!this.selectorBehindObj["endTimeStr"] ){      //折扣周期
          return this.$queryFun.successAlert.call(this,"请选择日期时间","0")
        }else if(!this.selectorBehindObj["channelId"]){
          return this.$queryFun.successAlert.call(this,"请选择渠道","0")
        }else if(this.selectorBehindObj["limitCollar"]<0){
          return this.$queryFun.successAlert.call(this,"限购数不得小于零")
        }else if(!this.isDate){
          return this.limitDate(this.$moment(this.selectorBehindObj.date[0]));
        }
        let domain=`/sale/saveServiceSale`,textMsg="新建";
        if(this.isAdd.data){
          domain=`/sale/updateServiceSale`;
          textMsg=`编辑`
        }
        let url=`${this.$apidomain}${domain}`,params={"id":this.subMitId,"saleId":this.saleId};
            for(let k in this.selectorBehindObj){
                  if(k!=="date"&&k!=="endTime"){
                    params[k]=this.selectorBehindObj[k]
                  }
            }
        params.saleDetailList= JSON.stringify(this.$store.state.rightTableList.map((v, i) => {
          return {
            "areaId": v.cityCode,
            "areaName": v.cityName,
            "saleType":v.type,
            "isAdv":!!v.isAdv?v.isAdv:"1",
            "saleVal": ((v.agio-0).toFixed(3))/ 10,
            "serviceId": v.serviceId,
            "servicePrice": v.servicePrice,
            "serviceSalePrice": v.agioSaver === 0 ? v.servicePrice : v.agioSaver.toFixed(3),
            "serviceType": v.name,
            "serviceName":v.fullName
          }
        }));
        this.$http.post(url,params).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            this.$notify({
              title: '成功',
              message: `${textMsg}成功`,
              type: 'success'});
            this.quiry();
            this.isAdd.isShow=false
          }else{
            this.$queryFun.successAlert.call(this,data.error,"0");
          }
        })
      },
      closeMove(){
        this.isAdd.isShow=false;
      },
      limitDate(selectorDate){
        let date=this.$moment(new Date()).format("YYYY-MM-DD");
        let selector=this.$moment(selectorDate).format("YYYY-MM-DD");
        if(selector<date){
             this.$queryFun.successAlert.call(this,"折扣周期不得小于当前时间");
             return false;
        }
        return true;
      }
    },
    mounted() {
      let url=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("skillId"===v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
        this.searchOptionList.forEach(v=>{
          if("skillId"===v.key){
            v.SourceType.push({"id":"","name":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"name":v2.name});
            })
          }
        })
      });
    },
    watch:{
        "checkeAll":function(v,g){
          if(v){
            this.optionList[0].SourceTypeValue="";
            this.selectedOptions2=[];
            this.selectorBehindObj["serviceIds"]="ALL"
          }else{
            this.selectorBehindObj["serviceIds"]=""
          }
        },
        "selectorBehindObj.saleName":function (current){
          let exp=/[`‘；“：,，~!@#$%^&*_+<>{}\/'[\]]/g;
          if(exp.test(current)){
            this.NameText="请输入正确的折扣名称，不得出现特殊字符"
          }else{
            this.NameText=null;
          }
        }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/styles/commButton";
  .el-loading-text{
    color:red !important;
  }
  .harder{
    margin-top:20px;
    background: #d3d3d3;
    padding:10px;
    display: flex;
    > div{
      flex:1;
    }
    >.right{
      padding-left: 10px;
    }

  }
  .error_info{
    color:red;
    font-size: 12px;
  }
  .el-input{
   width:200px;
  }
  .list_name{
    width:110px;
  }
  .button{
    width:200px;
    cursor:pointer;
    line-height:44px;
    border:none;
    padding:0;
    margin:0;
    color:#fff;
    transform: rotate(-360deg);
    border: 1px solid #979797;
    border-radius: 4px;
    float:left;
    background:green;
    outline:none;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    letter-spacing: 0;
    width:92%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:90%;
    >.content{
      height: 78%;
      width:100%;
      display:flex;
      overflow-y: auto;
      /*&::-webkit-scrollbar {!*滚动条整体样式*!*/
        /*width: 5px;     !*高宽分别对应横竖滚动条的尺寸*!*/
      /*}*/
      /*&::-webkit-scrollbar-thumb {!*滚动条里面小方块*!*/
        /*border-radius: 5px;*/
        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,1);*/
        /*background: #ededed;*/
      /*}*/
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
          >li{
            /*text-align: right;*/
            margin-top:20px;
            .files{
              display: flex;
              flex-wrap:wrap;
              padding:0;
              >li{
                width:50%;
                height:auto;
                margin-bottom:30px;
                >input{

                }
                >img{
                  display: block;
                  width:270px;
                  height: 130px;
                }
              }
            }
          }
        }
      }
      >.left_info{
        width:100%;
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
    width: 100%;
    list-style:none;
    >li{
      line-height:40px;
    }
    >.edit_open{
      background: #E8D7F6;
      border-radius: 4px;
      padding-left:10px;
      >span{
        height:100%;
        padding:0 10px;
        color:blue;
        cursor: pointer;
        display: inline-block;
      }
      >input{
        width:50px;
        border:none;
        outline:none;
      }
    }
  }
  .file {
    position: relative;
    display: block;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    width:280px;
    height: 140px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    width:100%;
    height: 100%;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
  .closeX{
    background:url(../../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
  table{
    .theads{
      >th{
        padding:10px 10px;
        text-align:center;
        background: #E5E9F2;
        box-shadow: inset 0 1px 0 0 #E0E6ED,
        inset 0 -1px 0 0 #E0E6ED;

      }
      >.multiple{
        width:30px;
        cursor:pointer;
        box-size:border-box;
      }
    }
    >tbody{
      >tr{
        border-top:1px solid #ccc;
        >td{
          border-bottom:1px solid #ccc;
          padding:11px 10px;
          text-align:center;
        }
        .icon{
          padding:0;
          i{
            cursor:pointer;
            padding:10px 0;
            font-size:18px;
            display: inline-block;
            padding-right:5px;
          }
          >i:last-of-type{
            padding-right:0;
          }
        }
        >td:first-of-type{
          border-right:1px solid #ccc;
        }
        >td:last-of-type{
          //display: flex;
          padding-top:0;
          padding-bottom:0;
          >span{
            flex:1;
            height:100%;
            /*float:left;*/
            padding-top:4px;
            /*padding-left:30px;*/
            i{
              width:16px;
              height:16px;
              background:url(../../../../../static/images/ban.png) center center no-repeat;
              background-size:100% 100%;
              float:left;
              margin-right:3px;
              vertical-align: middle;
            }
          }
          >.details_icon{
            flex:1;
            /*float:right;*/
            padding-left:0px;
            /*padding-top:8px;*/
            text-align: center;
            /*padding-right:20px;*/
            cursor:pointer;
            i{
              width:16px;
              height:16px;
              margin-right:0;
              /*margin-top:3px;*/
              background:url(../../../../../static/images/detailed.png) center center no-repeat;
              background-size:100% 100%;
            }
          }
        }
      }
      >tr:nth-of-type(even){
        background: #F9FAFC;
      }
    }
  }
  #tables{
    border-right:1px solid #ccc;
  }
  #table, #tables{
    width:50% !important;
    float:left;
  }
  .btn{
     bottom:9%;
  }
</style>
<style lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }
  .el-message{
    z-index: 9999 !important;
  }
  ul{
    >.fenle{
        .el-cascader__label{
          line-height: 40px !important;

      }
    }
  }
  .el-cascader-menus, .el-select-dropdown{
    z-index: 999999 !important;
  }
  .list{
    margin-top:30px;
    float:left;
  }
  #irrigation_ditch,#searchType{
    >.el-cascader{
      >.el-cascader__label{
        line-height: 36px !important;
      }
    }
  }
  .el-loading-spinner{
    .el-loading-text{
      float:none;
    }
  }
</style>


