<template>
  <el-card class="box-card">
    <el-form ref="chargeForm" :model="chargeForm" label-width="80px">
      <el-form-item label="城市">
        <el-select
          v-model="city.SourceTypeValue" :placeholder="selectorBehindObj.area" @change="selectorArea(city,city.SourceType,city.SourceTypeValue)">
          <el-option
            v-for="items in city.SourceType"
            :key="items.name"
            :value="items.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="高空层">
        <el-input v-model="selectorBehindObj.floorStart" type="number" style="width:30%"></el-input> &nbsp;-&nbsp;
        <el-input v-model="selectorBehindObj.floorEnd" type="number" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="费用">
        <el-input v-model="selectorBehindObj.price" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="resetForm('chargeForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>
<script>
  export default {
    props: ["chargeData","quiry"],
    data() {
      return {
        city: {
          name: "所属城市",
          key: "areaId",
          SourceTypeValue: '', //选中后的
          SourceType: this.$store.state.cityData,
        },
        selectorBehindObj:{"floorStart":"","floorEnd":"","price":"","area":"请选择"},
        chargeForm:{
          city:'',
          lowFloor:'',
          highFloor:'',
          price:''
        },
        props: {
          value: 'label',
          children: 'cities',
        },
      }
    },
    created(){
      if(this.chargeData.id){
        let url=this.$apidomain+"/highAltitudeSetting/findoneHighAltitudeSetting?id="+this.chargeData.id;
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.selectorBehindObj = data.result;
        })
      }

    },
    methods: {
      //      <!--分页查询数据对象功能组合end-->
      selectorArea(item,values,SourceTypeValue){
          var key=item.key;
          values.forEach((v,i)=>{
            if(v.name===SourceTypeValue){
              this.selectorBehindObj[key]=v.id;
              this.selectorBehindObj.area=v.name;
            }
          });
      },
      onSubmit() {
        if(this.chargeData.id){
          let url=this.$apidomain+"/highAltitudeSetting/updateHighAltitudeSetting";
          this.selectorBehindObj.id=this.chargeData.id;
          this.$http.post(url,this.selectorBehindObj).then(res=>{
            let data = res.data;
            this.quiry();
            this.resetForm('chargeForm');
          })
        }else{
          let url=this.$apidomain+"/highAltitudeSetting/saveHighAltitudeSetting";
          this.$http.post(url,this.selectorBehindObj).then(res=>{
            let data = res.data;
            this.quiry();
            this.resetForm('chargeForm');
          })
        }
      },
      deleteFloorItem(index){
        this.chargeData.floor.splice(index,1)
      },
      changeSelector(value){
        this.options2.forEach((v,i)=>{
          if(value[0]===v.label){
            this.cityId=v.id;    //选择城市
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.chargeForm.city=e.label    //选择区
              }
            })
          }
        });
      },
      addFloor(){
        let chargeFloor = {};
        for(var k in  this.chargeForm){
          if(this.chargeForm[k]===''){
            return;
          }
        }
        Object.assign(chargeFloor,this.chargeForm)
        this.chargeData.floor.push(chargeFloor);
          this.chargeForm.city='';
          this.chargeForm.lowFloor='';
          this.chargeForm.highFloor='';
          this.chargeForm.price=''
      },
      resetForm(name) {                          //取消
        this.chargeData.isShow=false;
      }
    }
  }
</script>
<style scoped lang="scss">
  .box-card{
    width: 480px;
    height:600px;
    overflow: scroll;
  }
</style>
<style>
  .el-cascader-menus{
    z-index:999 !important;
  }
</style>
