export default{
  handleChange(file, fileList) {
    this.fileList = fileList;
    var ids=handleUpOrDel(fileList);
  },
  handleRemove(file, fileList){
    this.fileList = fileList;
    var ids=handleUpOrDel(fileList);
  },
  handleUpOrDel(fileList){
    let ids="";
    if(fileList){
      for(var i =0; i < fileList.length; i++){
        console.log(fileList[i].response);
        var obj = fileList[i].response;
        if(obj){
          if(obj.code){
            ids +=obj.record.successResponse[0].id;
            if(i < fileList.length - 1){
              ids +=",";
            }
          }
        }
      }
    }
    return ids;
  }
}
