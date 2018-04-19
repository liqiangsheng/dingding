export var _this;
export function getThis(v) {
    _this = v;
}

export function sizeChange(val) {
    _this.currentPageSize = val;
    _this.getTableList(_this.paramsData());
}
export function currentChange(val) {
    _this.showPages = val;
    _this.getTableList(_this.paramsData());
}

export function firsPages() {
    if (_this.showPages === 1) {
        return alert("已经是第一页")
    }
    _this.showPages = 1; //第一页
    _this.getTableList(_this.paramsData());
}

export function lastPages() {
    if (_this.showPages === _this.pageTotal) {
        return alert("已经是最后一页")
    }
    _this.showPages = _this.pageTotal; //最后一页
    _this.getTableList(_this.paramsData());
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
  // console.log(_this.tableListData,"22222222222");
  _this.tableList = data.result.orders;
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




export function buttonStatus(input){
  if(input==='03'||input==='04'||input==='05'||input==='06'||input==='07'||input==='08'||input==='09'||input==='10'||input==='11'||input==='12'||input==='13'||input==='14'||input==='15'||input==='16'||input==='17'||input==='18'){
    return true;
  }else{
    return false;
  }
}
export function ubsualButton(input){
  if(input==='05'||input==='06'||input==='07'||input==='10'||input==='11'||input==='12'){
    return true;
  }else{
    return false;
  }
}
export function sendOrderFilter(input){
  if(input==='03'||input==='04'||input==='05'||input==='06'||input==='07'||input==='08'){
    return true;
  }else{
    return false;
  }
}
export function masterFilter(input){
  if(input==='05'||input==='06'||input==='07'||input==='08'||input==='09'||input==='10'||input==='11'||input==='12'||input==='13'||input==='14'||input==='15'||input==='16'||input==='17'||input==='18'){
    return true;
  }else{
    return false;
  }
}
export function changeTimeFilter(input){
  if(input==='01'||input==='03'||input==='05'||input==='06'||input==='07'||input==='08'||input==='10'||input==='11'){
    return true;
  }else{
    return false;
  }
}
export function cancelOrderFilter(input){
  if(input==='01'||input==='03'||input==='05'||input==='06'||input==='07'||input==='08'||input==='10'||input==='11'){
    return true;
  }else{
    return false;
  }
}
//新增服务产品 start
export function addProductFilter(input){
  if(input==='01'||input==='03'||input==='04'||input==='05'||input==='06'||input==='07'||input==='08'||input==='10'){
    return true;
  }else{
    return false;
  }
}
//新增服务产品 end

//新增客服系统 start
export function addDialingMaster(input){
  if(input==='04'||input==='05'||input==='06'||input==='07'||input==='08'||input==='09'||input==='10'||input==='11'||input==='12'||input==='13'||input==='14'||input==='15'||input==='16'||input==='17'||input==='18'){
    return true;
  }else{
    return false;
  }
}
//新增客服系统 end


