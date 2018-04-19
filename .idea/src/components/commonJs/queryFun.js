export default {
  selectorArea(item,values,SourceTypeValue,KEY,getTableList){
    let key=item.key;
    values.forEach((v,i)=>{
      if(v[KEY]===SourceTypeValue){
        this.selectorBehindObj[key]=v.id;
        if(getTableList) getTableList();
      }
    });
  },
  handleChange(value,url){
    this.$http.get(url).then(r=>{
      let data=r.data;
      if(data.code==='0000'){
        if(!data.result){
          value = [];
          alert("当前分类并非末级分类...");
        }else{
          this.selectorBehindObj.labelId = value[value.length-1];
          this.queryData();
        }
      }else{
        alert("当前分类并非末级分类...");
      }
    })
  },
  successAlert(text,state){
    if(state==="1"){
      this.$message({
        type: 'success',
        message: text
      });
    }else{
      this.$message({
        type: 'info',
        message: text
      });
    }
  },
  sortFun(index,sortData){
    for(let i=0;i<sortData.length;i++){
      if(sortData[i].index===index){
        return sortData[i];
      }
    }
    return false;
  },
  //分页事件
  handleSizeChange(val) {      //每页显示多少条
    this.currentPageSize=val;
    this.getTableList(this.paramsData());
  },
  handleCurrentChange(val) {
    this.showPages=val;
    this.getTableList(this.paramsData());
  },
  firstPage(){
    if(this.showPages===1 ){
      return this.$queryFun.successAlert.call(this,"已经是第一页")
    }
    this.showPages=1;     //第一页
    this.getTableList(this.paramsData());
  },
  lasePage(){
    if(this.showPages===this.pageTotal){
      return this.$queryFun.successAlert.call(this,"已经是最后一页")
    }
    this.showPages=this.pageTotal; //最后一页
    this.getTableList(this.paramsData());
  },
  //工单详情 产品分类操作列按钮
  isRepairButton(orderStatus){
    if(orderStatus==="09"||orderStatus==="12"||orderStatus==="15"||orderStatus==="17"||orderStatus==="18"){
        return true;
    }else{
      return false;
    }
  },
  isReturnCurrentButton(orderStatus,isSecondPayment) {
    if ((orderStatus === "03" || orderStatus === "04" || orderStatus === "05" || orderStatus === "06" || orderStatus === "07" || orderStatus === "08" || orderStatus === "09" || orderStatus === "10" || orderStatus === "11" || orderStatus === "12" || orderStatus === "15") && isSecondPayment === "0") {
      return true;
    } else if ((orderStatus === "12" || orderStatus === "15") && isSecondPayment === "1") {
      return true;
    }
    return false;
  },
  isChangeSaverButton(orderStatus){
    if(orderStatus==="01"||orderStatus==="03"||orderStatus==="04"||orderStatus==="05"||orderStatus==="06"||orderStatus==="07"||orderStatus==="08"||orderStatus==="11"||orderStatus==="10"){
      return true;
    }
    return false;
  },
  isPreferentialButton(orderStatus,isSecondPayment){
    if((orderStatus==="01"||orderStatus==="11")&&isSecondPayment==="0"){
        return true;
    }else if((orderStatus==="11")&&isSecondPayment==="1"){
        return true;
    }
    return false
  },
  isCheckbox(data,index,state=false){    //列表单选
      let isCheck = true,i,table=this.tableList.length?this.tableList:this.tableList.evaluates;
      table[index].isCheckboxList = this.isCheckboxList[index];
      for (i = 0; i < this.isCheckboxList.length; i++) {
        if (!this.isCheckboxList[i]) {
          isCheck = false;
          break;
        }
      }
      this.checked = isCheck;
  },
  wholeSelector(data,currentState,state=false){
    if(state){
      data.forEach((v, i) => {
        this.$set(data[i],"isCheckboxList" , currentState);
      });
      this.$store.commit("chaneWholeSelector",currentState)
    }else{
      let table= this.tableList.length?this.tableList:data;
      this.isCheckboxList.forEach((v, i) => {
        if(!table[i].isDisb){
              this.$set(this.isCheckboxList, i, currentState);
            }
      });
      table.forEach((v, i) => {
        if(!v.isDisb){
          this.$set(table[i], 'isCheckboxList', currentState);
        }
      })
    }
  },
  confirm(obj){
    this.$confirm(obj.text, obj.title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      obj.success.call(this);
    }).catch(() => {
      if(obj.error)obj.error.call(this);
      this.$queryFun.successAlert.call(this,`已取消${obj.title}操作`);
    });
  }
}
