export var _this;
export function getThis(v) {
    _this = v;
}

export function sizeChange(val) {
    _this.currentPageSize = val;
    let params = _this.paramsData();

    params['params'].orderByClause = _this.$store.state.sort_data;
    //console.log(params, '参数-------')
    _this.getTableList(params);
}
export function currentChange(val) {
    _this.showPages = val;
    console.log('切换分页',_this.paramsData())
    let params = _this.paramsData();
        params['params'].orderByClause = _this.$store.state.sort_data;
     //console.log(_this.getTableList(),'0000000')
    _this.getTableList(params);
}

export function firsPages() {
    if (_this.showPages === 1) {
        return alert("已经是第一页")
    }
  let params = _this.paramsData();
  params['params'].orderByClause = _this.$store.state.sort_data;
    _this.showPages = 1; //第一页
    _this.getTableList(params);
}

export function lastPages() {
    if (_this.showPages === _this.pageTotal) {
        return alert("已经是最后一页")
    }
  let params = _this.paramsData();
  params['params'].orderByClause = _this.$store.state.sort_data;
    _this.showPages = _this.pageTotal; //最后一页
    _this.getTableList(params);
}

export var inputData = [
{
    name: "姓名",
    key: "name",
    value: ""
}, {
    name: "手机号",
    key: "tel",
    value: ""
}, {
    name: "身份证号码",
    key: "certificateNumber",
    value: ""
}, {
    name: "紧急联系人",
    key: "urgentName",
    value: ""
}, {
    name: "紧急联系人电话",
    key: "urgentTel",
    value: ""
}];
export function masterOper(item, url) {
    var o = {},
        arr = [];
    item.alertForbiddenList.forEach((v, i) => {
        if (v.selector === true) {
            arr.push(v.name);
        }
    });
    if (arr.length > 0) {
        o.refuseContentText = arr
    }
    if (item.amount) {
        o.amount = item.amount;
    }
    if (item.textareaContent) {
        o.textareaContent = item.textareaContent
    }
    item.params.push(o);
    // //        发送请求完成后清空参数
    let amount, content, selector, orderId
    amount = item.params[0].amount; //罚款金额
    content = item.params[0].textareaContent; //文本内容
    selector = item.params[0].refuseContentText[0]; //选择的选项
    orderId = _this.masterImposeData.id;
    _this.$http.post(url, { "remark": content, "reasonOfComplain": selector, "fee": amount, "orderId": orderId }).then(r => {
        let data = r.data;
        if (data.code === '0000') {
            item.params = [];
            item.masterImpose = false;
        } else {
            alert(data.error)
        }
    });
}



//封装裂变数据 start

export function getTableListData(data,isCheckboxList,th) {
  if(th){
    _this=th;
  }
  _this.tableListData = data.result;
  _this.tableListData.orders.forEach((obj,i)=>{
    if(obj.officialPartnerSubsetName&&obj.officialPartnerName){
      _this.officialPartner=obj.officialPartnerName+'-'+obj.officialPartnerSubsetName;
    }else if(!obj.officialPartnerSubsetName&&obj.officialPartnerName){
      _this.officialPartner=obj.officialPartnerName;
    }else{
      _this.officialPartner='';
    }
    _this.$set(obj,'officialPartner',_this.officialPartner)
  });
  // console.log(_this.tableListData,"22222222222");
  _this.tableList = data.result.orders;
  _this.tableList.forEach((item,index)=>{
    item.iconShow = false;
    item.styleShow = false;
    item.borderShow = false;
  })
  // console.log(_this.tableList,'33333333333333333');
  _this.showPages = data.result.pageNo;
    _this.currentPageSize = data.result.pageSize;
    _this.total = data.result.total;
    _this.pageTotal = data.result.pageTotal;
      if(_this.isCheckboxList===undefined){
        _this.isCheckboxList=isCheckboxList
      }
      _this.tableList.forEach((v, i) => {
        _this.isCheckboxList[i] = false;
        _this.tableList[i].isCheckboxList = false
    })
}

//封装裂变数据 end
export function selectorAll(data, currentState) {
    _this.isCheckboxList.forEach((v, i) => {
        _this.$set(_this.isCheckboxList, i, currentState);
    });
    _this.tableList.forEach((v, i) => {
        _this.$set(_this.tableList[i], 'isCheckboxList', currentState);
    })
}
export function selectorCheck(item,index,_thi) {
  if(_thi){_this=_thi}
  let isCheck = true,i;
  _this.tableList[index].isCheckboxList = _this.isCheckboxList[index]
  for (i = 0; i < _this.isCheckboxList.length; i++) {
      if (!_this.isCheckboxList[i]) {
          isCheck = false;
          break;
      }
  };
  _this.checked = isCheck;
}


export function clearSelector(content){
  content.list.forEach((v,i)=>{
    content.list[i].selector=false;
  });
}



//标记投诉
export function buttonStatus(input){
  if(input==='03'||input==='04'||input==='05'||input==='06'||input==='07'||input==='08'||input==='09'||input==='10'||input==='11'||input==='12'||input==='13'||input==='14'||input==='15'||input==='16'||input==='17'||input==='18'||input==='19'||input==='21'){
    return true;
  }else{
    return false;
  }
}
// 异常挂起
export function ubsualButton(input){
  if(input==='05'||input==='06'||input==='07'||input==='10'||input==='11'||input==='12'||input==='19'||input==='20'||input==='21'){
    return true;
  }else{
    return false;
  }
}
// 发送
export function sendOrderFilter(input){
  if(input==='03'||input==='04'||input==='05'||input==='06'||input==='07'||input==='08'){
    return true;
  }else{
    return false;
  }
}
export function masterFilter(input){
  if(input==='05'||input==='06'||input==='07'||input==='08'||input==='09'||input==='10'||input==='11'||input==='12'||input==='13'||input==='14'||input==='15'||input==='16'||input==='17'||input==='18'||input==='19'||input==='20'||input==='21'){
    return true;
  }else{
    return false;
  }
}
// 更改时间
export function changeTimeFilter(input){
  if(input==='01'||input==='03'||input==='05'||input==='06'||input==='07'||input==='08'||input==='10'||input==='11'||input==='04'||input==='20'||input==='21'){
    return true;
  }else{
    return false;
  }
}
// 取消
export function cancelOrderFilter(input){
  if(input==='01'||input==='03'||input==='05'||input==='06'||input==='07'||input==='08'||input==='10'||input==='11'||input ==='04'||input==='21'){
    return true;
  }else{
    return false;
  }
}
//新增服务产品 start
export function addProductFilter(input){
  if(input==='01'||input==='03'||input==='04'||input==='05'||input==='06'||input==='07'||input==='08'||input==='10'||input==='21'){
    return true;
  }else{
    return false;
  }
}
//新增服务产品 end

//新增客服系统 start
export function addDialingMaster(input){
  if(input==='04'||input==='05'||input==='06'||input==='07'||input==='08'||input==='09'||input==='10'||input==='11'||input==='12'||input==='13'||input==='14'||input==='15'||input==='16'||input==='17'||input==='18'||input==='19'||input==='20'||input==='21'){
    return true;
  }else{
    return false;
  }
}
//新增客服系统 end


