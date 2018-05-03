export let mutations={//同步处理vueX
  weachat(state,data){
    state.weachat = data;
  },
  zhifuDataObj(state,data){
      state.zhifuDataObj = data;
  },
  cityIdid(state,data){
  state.cityIdid = data;
},
  addDataCarter(state,data){
    state.addDataCarter = data;
  },
  detailAlterId(state,data){
     state.detailAlterId = data;
  },
  trackAlterId(state,data){
     state.trackAlterId = data;
  },
  edit(state,data){
    state.isEdit=data;
  },
  product(state,data){
    state.Product = data;
  },
  fenyeObj(state,data){
    state.FenyeObj = data;
  },
  editTable(state,data){
    state.isEditTable=data;
  },
  sendTableData(state,data){
    state.tableData=data
  },
  sendRefuseData(state,data){
    state.refuse=data;
  },
  displayAlert(state,bloone){
    state.isAlert=bloone
  },
  getCity(state,data){
    state.cityData=data;
  },
  getFund(state,data){
    state.findchannel=data;
  },
  getClassify(state,data){
    state.classifyData=data;
  },
  orderDetailsState(state,data){ //工单状态
    state.orderDetailsState=data;
  },
  isChannelMsg(state){
    state.isChannelAlert=!state.isChannelAlert;
  },
  isChannelPass(state){
    state.isChannelPassword=!state.isChannelPassword;
  },
  kk(state){
  },
  addRightTableList(state,dataObj){
    state.rightTableList=state.rightTableList.concat(dataObj.newArray);
    state.rightTableList.forEach((v,i)=>{
      /*
      * 判断数据里面有没有折扣或有没有折扣后价格，如果有，直接跳过，如果没有，重新初始化赋值
      * */
      if(!(!v.agio||v.agio!==0||v.agio<0)||v.agio===undefined){
        state.rightTableList[i].agio=10;
        state.rightTableList[i].agioSaver=0;
        state.rightTableList[i].type=1;
      }
    })
   if( state.rightTableList.length!==state.rightCheckbox.length){
      let lng= state.rightTableList.length - state.rightCheckbox.length,i;
      for(i=0;i<lng;i++){
        state.rightCheckbox.push(false);
      }
   }
  },
  editAddRightTableList(state,dataObj){   //编辑的时候从后台获取折扣数据 添加到 右边数据table
    state.rightTableList=state.rightTableList.concat(dataObj.newArray);
    if( state.rightTableList.length!==state.rightCheckbox.length){
      let lng= state.rightTableList.length - state.rightCheckbox.length,i;
      for(i=0;i<lng;i++){
        state.rightCheckbox.push(false);
      }
    }
  },
  chaneWholeSelector(state,current){
    state.rightCheckbox= state.rightCheckbox.map((v,i)=>{
     return current;
    })
  },
  isCheckbox(state) {
    let i,isChex=true;
    for (i = 0; i < state.rightCheckbox.length; i++) {
      if (!state.rightCheckbox[i]) {
        isChex = false;
        break;
      }
    }
    state.checked=isChex;
  },
  initRightTableList(state){
      state.rightTableList=[];
      state.rightCheckbox=[];
      state.checked=false;
      state.delNewArray=[];
  },
  delRightTable(state,index){

     state.delNewArray =  state.rightTableList.splice(index,1);
    // state.delNewArray
  },

  delRightTableCheckbox(state,index){    // 单个右侧删除
     state.rightCheckbox.splice(index,1);
  },

  //批量删除右侧数据；

  delAllRightTable(state,newArray){
      state.rightTableList=newArray;
      state.rightCheckbox=[];
      newArray.forEach(v=>{
        state.rightCheckbox.push(false);
      });
      state.checked=false;
  },
  setServicePrice(state,obj){     //设置折扣，对应折后服务费改变
    state.rightTableList[obj.i].agio=obj.currentSum;
    state.rightTableList[obj.i].type=obj.type;
    state.rightTableList[obj.i].agioSaver=obj.servicePrice*(obj.currentSum/10)
    state.rightTableList.splice(obj.i,1,state.rightTableList[obj.i]);
  },
  setSaverPrice(state,obj){ //设置折后服务费
    state.rightTableList[obj.i].type=obj.type;
    state.rightTableList[obj.i].agioSaver=obj.currentSum-0;
    state.rightTableList[obj.i].agio=(obj.currentSum/obj.servicePrice)*10;
    state.rightTableList.splice(obj.i,1,state.rightTableList[obj.i]);
    },
    setServicePriceAll(state,obj){
    state.rightTableList[obj.i].agio=obj.value;
    state.rightTableList[obj.i].type=obj.type;
    state.rightTableList[obj.i].agioSaver=state.rightTableList[obj.i].servicePrice*(obj.value/10)
    state.rightTableList.splice(obj.i,1,state.rightTableList[obj.i]);
  },
  setSaverPriceAll(state,obj){ //批量设置折后服务费
    state.rightTableList[obj.i].agioSaver=obj.value-0;
    state.rightTableList[obj.i].type=obj.type;
    state.rightTableList[obj.i].agio=(obj.value/state.rightTableList[obj.i].servicePrice)*10;
    state.rightTableList.splice(obj.i,1,state.rightTableList[obj.i]);
  },
  //添加折扣 生成广告位
  createAdv(state){
    state.rightCheckbox.forEach((v,i)=>{
          v?state.rightTableList[i].isAdv="2":state.rightTableList[i].isAdv="1";
       })
  },

//  渠道 弹框数据状态
  closeIsOpen(state){
    state.accountOverviewAlertData.isShow=!state.accountOverviewAlertData.isShow

  },
  changeAccountAlertData(state,params){
    for(let k in params){
        state.accountOverviewAlertData[k]=params[k]
    }
  },
  pushTabPathList(state,param){
      state.tabPathList.push(param)
  },
  spliceTabPathList(state,index){
    state.tabPathList.splice(index,1);
  },
  resettingTabPathList(state,lis){
    state.tabPathList=lis
  },
  pushCreditCardMessage(state,obj){
    Object.assign(state.creditCardMessage,obj)
  }
};
