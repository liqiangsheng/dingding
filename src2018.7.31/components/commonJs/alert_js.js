
export var _this;
export function getThis(v){
  _this=v;
}
//禁用；
export function forbiddenMsg(item,textContent,url){
  var o={};
  item.forEach((v)=>{
    if(v.selector===true){
      o.forbiddenCause=v.name
    }
  });
  if(textContent){
    o.forbiddenRemark=textContent; //内容
  }else{
    o.forbiddenRemark="";
  }
  o.id=_this.objItem.id;
  o.state = "2";
  if(!(o.forbiddenCause||o.forbiddenRemark)){
    _this.$message({
            type: 'error',
            message: "禁用原因不能为空"
          });
    return
  }
  _this.$http.post(url,o).then(res=>{
    let data = res.data;
    if("0000"===data.code){
      _this.dialogTableVisible=false;
      _this.$message({
        type: 'success',
        message: '禁用成功!'
      });
      _this.getTableList(_this.paramsData())
    }else{
      _this.$message({
        type: 'error',
        message: data.error
      });
    }
  })
}

//恢复
export function recover(item,url){

  if("1"==item.state){
    _this.dialogTableVisible = true;
    _this.objItem = item;
  }else{
    _this.$confirm('此操作将恢复该数据，是否继续？', '恢复', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      let o={};
      o.id=item.id;
      o.state = "1";
        _this.$http.post(url,o).then(res=>{
        _this.data = res.data;
        _this.$message({
          type: 'success',
          message: '恢复成功!'
        });
        _this.getTableList(_this.paramsData())
      })
    }).catch(() => {
      _this.$message({
        type: 'info',
        message: '已取消恢复'
      });
    });
  }
}
export function getTableData(params,url){
  _this.$http.get(url,params).then(r=>{
    let data=r.data;
    _this.tableListData = data.result;
    _this.showPages = data.result.pageNo;
    _this.currentPageSize = data.result.pageSize;
    _this.total = data.result.total;
    _this.pageTotal = data.result.pageTotal
    _this.isCheckboxList=[];
    data.result.userInfos.forEach(v=>{
      _this.isCheckboxList.push(false);
    })

  })
}
