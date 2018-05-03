<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isAdd.title}}   <p class="closeX" id="closeX" @click="closeMove"></p></h3>
      <div class="content">
        <div class="left_info">
          <ul>
            <li>
              <span class="list_name">城市 :</span>
              <el-select
                style="width:200px;"
                v-model="city.SourceTypeValue" placeholder="请选择" @change="selector(city,city.SourceType,city.SourceTypeValue)">
                <el-option
                  v-for="items in city.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li id="ch_option_line">
              <span class="list_name"> 详细地址 :</span>
              <el-cascader id="cascader"
                           @change="changeSelector"
                           :options="areaoptions1"
                           change-on-select
                           @active-item-change="handleItemChange"
                           :props="props"
              ></el-cascader>
              <el-input
                placeholder="请输入详细地址"
                v-model="selectorBehindObj.address">
              </el-input>
            </li>
            <li v-for="(item,index) in inputs" :key="index">

              <span class="list_name">{{item.name}} :</span>
              <el-input
                style="width:200px;"
                :type="item.type"
                placeholder="请输入内容"
                v-model="item.value">
              </el-input>
            </li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
      </div>
    </div>

    <div class="btn">
      <button @click="closeMove()">关闭</button>
      <button @click="submitAdd()" class='selector'>确定</button>
    </div>
  </div>
</template>

<script>
  export default {
    props:["isAdd","findOne"],
    data(){
      return{
        selectorBehindObj:{},
        areaoptions1: [],
        props: {
          value: 'label',
          children: 'cities',
        },
        city:{
          name: "城市",
          key: "cityId",
          SourceTypeValue: '',
          SourceType: []
        },
        inputs:[
          {
            name:"子渠道名称",
            key:"name",
            value:"",
            type:"text"
          }, {
            name:"规模",
            key:"scale",
            value:"",
            type:"number"
          }
        ],
      }
    },
    created(){
      let url=this.$apidomain+"/common/findcitylistareainfo";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.city.SourceType.push({"id":"","value":"---请选择---"});
        data.result.forEach((v)=>{
          this.city.SourceType.push({"id":v.id,"value":v.name});
        })
      });
    },
    methods: {
      submitAdd(){
        let  nameTest=new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$");
        this.inputs.forEach(v=>{
          this.selectorBehindObj[v.key]=v.value;
        });
        this.selectorBehindObj.officialPartnerId = this.isAdd.officialPartnerId;
        if(!this.selectorBehindObj["cityId"]){
          return this.$message({
            message: '请选择城市',
          });

        }else if(!this.selectorBehindObj["name"]){
          return this.$message({
            message: `请填写渠道名称，长度不超过20字符，不可输入标点符号`,
          });
        }else if(!this.selectorBehindObj["areaId"]){
          return this.$message({
            message: `请填写区域`,
          });
        }else if(!this.selectorBehindObj["scale"]||this.selectorBehindObj["scale"]<=0){
          return this.$message({
            message: `请输入规模,不得小于零`,
          });
        }
        let url=this.$apidomain+"/officialPartnerSubsetInfo/saveOfficialPartnerSubsetInfo";
        this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          this.findOne();
          this.closeMove();
        })
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
            this.selectorBehindObj.city=v.value;
          }
        })
        this.selectorBehindObj.areaId = "";
        this.selectorBehindObj.area = "";
        let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.selectorBehindObj.cityId;
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.areaoptions1 = data.result;
        })
      },
      onchangeFile(event,keyImg){
        let filesObj=event.target.files[0];
        let filesName=event.target.files[0].name;
        let img=event.target.parentElement;
//        let url=this.$apidomain+"/upload/kindeditorjson";
        let url=this.$apiupdate+"/upload/kindeditorjson";
        let param = new FormData(); // 创建form对象
        param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
        this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
          let data=res.data;
          if(data.error==0){
            img.style.background= "url("+data.url+") center center no-repeat";
            img.style.backgroundSize= "100% 100%";
            this.selectorBehindObj[keyImg]=data.url;   //参数是ajax返回的图片地址
          }else{
            alert("上传失败");
          }

        });
      },
      changeSelector(value){
        this.areaoptions1.forEach((v,i)=>{
          if(value[0]===v.label){
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.selectorBehindObj.area = e.label;
                this.selectorBehindObj.areaId = e.id;
              }
            })
          }
        });
      },
      handleItemChange(val) {
      },
      checkIdIn(obj,id){
        let isin = true;
        obj.forEach((e)=>{
          if(e.id==id){
            isin = false;
          }
        })
        return isin;
      },
      getIds(obj){
        let k = "";
        obj.forEach((e,i)=>{
          k += e.id+",";
        });
        k = k.substring(0,k.length-1);
        return k;
      },
      getLabel(obj,id){
        let value = "";
        obj.forEach((e,i)=>{
          if(e.id==id){
            value = e.value;
          }
        });
        return value;
      },
      closeMove(){
        this.isAdd.isShow=false;
      },
    },
    mounted() {

    },
    watch:{

    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  .el-input{
    width:217px;
  }
  button{
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
    overflow-y: auto;
    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:70%;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{

      width:100%;
      display:flex;

      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
          .list_name{
            width:80px;
          }
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
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
</style>
<style lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }
  .el-cascader-menus{
    z-index:9999 !important;
  }

</style>


