export default{
  selector(obj){
    let key=obj.item["key"],value=obj.value;
    obj.item.SourceType.forEach(v=>{
      if(value===v.value) {
        obj.params[key]=v.id;
      }
    })

  },

}


