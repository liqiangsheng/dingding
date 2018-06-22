<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title" style="position:relative;">{{isAdd.title}}  <span class="closeX" @click="closeMove"></span></h3>
      <div class="scrollbar content">
        <div class="input_title">
          详细信息
        </div>
        <section class="container_content">
            <aside class="container_content_left">
              <div v-for="(item,index) in inputs" :key="index" v-if="index<5">
                <inputs-list :item="item" v-if="isInput(isEdit,item.isEdit)"></inputs-list>
                <div class="list_name" style="width:93px;" v-if="!isInput(isEdit,item.isEdit)"> {{item.name}}</div>
                <span style="text-indent: 1em;display: inline-block" v-if="!isInput(isEdit,item.isEdit)">
                     {{item.value}}
                </span>
              </div>
            </aside>
          <aside class="container_content_right">
            <div v-for="(item,index) in inputs" :key="index" v-if="index>4">
              <inputs-list :item="item" v-if="isEdit"></inputs-list>
              <div class="list_name" style="width:93px;" v-if="!isEdit&&!!isAdd.id"> {{item.name}}</div>
              <span style="text-indent: 1em;display: inline-block" v-if="!isEdit&&!!isAdd.id">
                     {{item.value}}
                </span>
            </div>
            <div v-if="isPassword">
              <div class="list_name">
                密码 :
              </div>
              <!--->

              <el-input style="width:199px" placeholder="请填写密码" type="password" v-model="selectorBehindObj.password" v-if="isPassword&&!this.isAdd.id"></el-input>
              <el-button type="primary"  @click="open3" v-else >修改密码</el-button>
            </div>

            <div>
              <span class="list_name" > 开户行:</span>
              <span  style="text-indent: 1em;display: inline-block" v-if="editData.siteInfo&&!isEdit"> {{editData.siteInfo.bankOfDeposit|bankingType}}</span>
              <select-option :value="bankOfDeposit" class="section_option" v-if="isEdit" @selectorData="getBank"  :messageList="$store.state.bankOfDeposit" :placeholder="'请选择开户行'" > </select-option>
            </div>
          </aside>

        </section>
        <!--区域-->
        <section>
          <div class="input_title">
            服务区域
          </div>
          <div class="container_area">
            <div>
              <span class="list_name"> 城市:</span>

              <span  v-if="(!!editData.areas&&!!isAdd.id)">{{editData.siteInfo.city}}</span>
              <select-option v-if="!(!!editData.areas&&!!isAdd.id)"  class="section_option" @selectorData="getCity"  :messageList="$store.state.cityData" :placeholder="'请选择城市'" > </select-option>
              <br>
              <div class="list_name" v-if="(!!editData.areas&&!!isAdd.id)&&!isEdit" style="margin-top:1em;"> 区域:</div>
              <span v-for="(item,index) in editData.areas" v-if="(!!editData.areas&&!!isAdd.id)&&!isEdit">
                         {{item.label}} {{index===editData.areas.length-1?'':','}}
              </span>
            </div>

            <div class="content_area" v-if="isEdit">
              <aside class="left_item" v-for="(item,index) in area">
                <div class="cursor area" :class="{'select_area':areaSelects[index]===1,'topo_select':areaSelects[index]===2}" @click="selectArea(area,index)">
                  {{item.label}}
                </div>
                <div class="street_list">
                    <div class="cursor street_list_item" v-for="(items,indexs) in item.cities" @click="selectItem(items,index,indexs)" :key="indexs" :class="{'selected_cities':streetSelects[index][indexs]}">
                       {{items.label}}
                    </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
        <!--工种-->
        <section>
          <div class="input_title">
            服务工种
          </div>
          <div  class="list_name" style="margin-top:2em;" v-if="isShowSkills()&&!!editData.skills"> 服务工种:</div>
          <span v-for="(item,index) in editData.skills"  v-if="isShowSkills()&&!!editData.skills">
            {{item.label}} {{index===editData.skills.length-1?'':','}}
          </span>
          <selector-teer v-if="!isShowSkills()&&!!skillList"
          :list="skillList"
          :selectFirst="productionFirsts"
          :selectChild="productionChilds"
          :props="saverTypes"
          >
          </selector-teer>
        </section>
        <section class="upload_papers">
          <div class="input_title">
            认证资料
          </div>
          <div class="upload_papers_content" v-if="!isAdd.id">
            <a href="javascript:;" class="file"  v-for="(item,index) in files" :key="index">
              <input type="file" @change="onchangeFile($event,item.key)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
            </a>
          </div>
          <div class="upload_papers_content" v-if="isAdd.id" >

              <div v-for="(item,index) in images" class="file">
                <img style="display: block;width:100%;height:100%;" :src="item" alt="">
              </div>
          </div>
        </section>
      </div>
      <div class="btn_container">
        <el-button  @click="closeMove()">取消</el-button>
        <el-button type="primary" @click="submitAdd(false)" class='selector' v-if="!isAdd.id">添加</el-button>
        <el-button type="primary" @click="changeEdit" class='selector' v-if="isAdd.id&&!isEdit">编辑</el-button>
        <el-button type="primary" @click="submitAdd(true)" class='selector' v-if="!(isAdd.id&&!isEdit)&&isAdd.id">完成</el-button>
      </div>
    </div>
  </div>
</template>
<script>

  import inputs from "@/components/commInfo/inputs"
  import selectOption from "@/components/commInfo/selectOption"
  import selectorTeer from "./components/selectorTeer"

  export default {
    props:["isAdd","quiry"],
    components:{
      inputsList:inputs,
      selectOption,
      selectorTeer
    },
    data(){
      return{
        saverTypes:{
          label:"b",
          childs:"beans",
        },
        editData:{},
        isEdit:false,
        productionFirsts:[],
        productionChilds:[],
        selectedArea:-1,
        selectedCitiesItem:-1,
        propsArea: {
          value: 'id',
          label:"label",
          children: 'cities',
        },
        selectorBehindObj:{},
        area:[],
        areaSelects:[],
        streetSelects:[],
        skillList: [],
        files:[
         {
            point:"点击图片上传",
            name:"身份证正照",
            key:"shengfenzhengzhengmian"

          },  {
            name:"身份证反面",
            point:"点击图片上传",
            key:"shengfenzhengfanmian"
          },  {
            name:"资格证照",
            key:"zige",
            point:"点击图片上传",
          }
        ],
        isSiteShow:false,
        potionValueId:'',
        inputs:[
          {
            name:"网点名称",
            key:"name",
            value:"",
            type:"text",
            isEdit:true,
          }, {
            name:"用户名",
            key:"username",
            type:"text",
            value:"",
            isEdit:true,
          }, {
            name:"公司电话",
            key:"companyTel",
            type:"text",
            value:"",
          },
// {
//            name:"密码",
//            key:"password",
//            type:"password",
//            value:"",
//          },
          {
            name:"联系人",
            key:"linkmanName",
            value:"",

            type:"text",
          },{
            name:"手机号",
            key:"linkmanPhoneNum",
            value:"",
            type:"text",
          },{
             name:'银行卡号',
             key:'cardNumber',
             value:'',
             type:'text'
          },
          {
            name:'开户行地址',
            key:'headquarterAddress',
            value:'',
            idEdit:false,
            type:'text'
          }
        ],
        images:[]
      }
    },
    created(){
     const getFindLabel = (url,index) => this.$http.get(url).then(res => {
        const data= res.data;
        if (data.code === "0000") {
          this.productionChilds[index]=[];
          this.skillList.push(data.result);
          this.skillList.forEach(v=>{
            this.productionChilds[index]=[];
            v.beans.forEach(e=>{
              this.productionChilds[index].push(false)
            })
          });
        }else{
          this.$queryFun.successAlert.call(this,data.error);
        }
      });

      const urls=`${this.$apidomain}/common/findflabelbusinessname`;
      this.$http.get(urls).then(r=>{
        let data=r.data;
            if(data.code==="0000"){
             async function getData(){
                     let item = data.result
//               /*
//                循环一级分类，获取对应二级分类ID
//               this.productionFirsts   添加判断选择一级分类的标识；1全选 ，0全不选 2单个选
//               this.productionChilds.push(JSON.parse(JSON.stringify([])));    添加二级分的标识；
// */
                     for(let i=0;i<item.length;i++){
                       this.productionFirsts.push(0);
                       this.productionChilds.push(JSON.parse(JSON.stringify([])));
                       let url = `${this.$apidomain}/articleinfo/findlabelbusinessbyflabel?id=${item[i].id}`;
                       await getFindLabel(url,i);     //
                     }
                    }
              getData.call(this);
            }else{
              this.$queryFun.successAlert.call(this,data.error);
            }
      });


/*
*网点编辑 start
*
* */

    let editData = this.isAdd;

      if(!!editData.id){
        this.saverTypes.isEdit=true;
        const url=`${this.$apidomain}/siteInfo/findDetail?id=${editData.id}`;
        this.$http.get(url).then(r=>{
          const data = r.data;
          if(data.code==="0000"){
            this.editData=data.result;
            this.inputs.forEach(v => {
              v.idEdit=true;
              v.value = this.editData.siteInfo[v.key]
            });
            this.saverTypes.skills = this.editData.skills.map(v=>v.id)
            this.images = this.editData.siteInfo.idPhotos.split(",").filter(v=>{
              if(v!=undefined&&!!v){
                return v;
              }
            });
            const areaIds = this.editData.areas.map(v=>v.id);
            this.getArea(this.editData.siteInfo.cityId).then(()=>{
              areaIds.forEach((v,y)=>{
                  this.area.forEach((e,i)=>{
                    if(v.length>=6&&e.id===v) {
                      this.selectArea(e,i)
                    }else{
                      e.cities.forEach((va,index)=>{
                        if(va.id===v){
                          this.selectItem(va,i,index)
                        }
                      })
                    }
                  })
              })
            })
          }
        });
      }else{
        this.isEdit=true;
      }
    },
    methods: {
      complete(prams){
        prams.idPhotos = prams.idPhotos.join(",");
        prams.id=this.isAdd.id;
        prams.city=this.editData.siteInfo.city
        let url=`${this.$apidomain}/siteInfo/changeInfo`;
        this.$http.post(url,prams).then(res=>{
          let data = res.data;
          if(data.code==="0000"){
            this.quiry();
            this.$notify({title: '成功', message: '编辑成功', type: 'success'});
            this.isAdd.isShow=false;
          }else{
            this.$queryFun.successAlert.call(this,data.error,)
          }
        })
      },
      isShowSkills(){
        if(!!this.isAdd.id){
          if(!this.isEdit){
            return true;
          }
        }else{
          return false;
        }
      },
      isInput(e,item){
       if(!!this.isAdd.id){
          if(!!e&&!item)return true;
          return false;
       }else{
         return true;
       }
      },
      /*
      * 网点名称 :
        网点编码 :
        用户名 :
        不可编辑
      *
      *
      * */
      changeEdit(){
          this.isEdit=true;
//        this.inputs.forEach((v,i)=>{
//            if(v.key!=="name"&&v.key!=="username"){
//              this.inputs[i].idEdit=true;
//             this.$set(this.inputs,"idEdit",this.inputs[i])
//            }
//        })
      },
      selectItem(e,y,i) {
        this.streetSelects[y][i]=!this.streetSelects[y][i];
         this.$set(this.streetSelects,y, this.streetSelects[y]);
        let isSelector=1;
        const $forEach = (arr,isActive=false) =>{
          for(let k=0; k<arr.length; k++){
            if(!arr[k]) return !!isActive?2:0;
          }
         return 1;
        };
        let isActive= false;
        for(let k=0; k<this.streetSelects[y].length; k++){
          if(this.streetSelects[y][k]){
            isActive=true;
          }
        }
        isSelector=$forEach(this.streetSelects[y]);
        if(!isSelector)isSelector=$forEach(this.streetSelects[y],true);
        if(!isActive)isSelector=0;
        this.$set(this.areaSelects,y,isSelector)
      },

      selectArea(e,i) {
        let isSelector=!!this.areaSelects[i]?0:1;
        this.$set(this.areaSelects,i,isSelector);
        this.$set(this.streetSelects,i,this.streetSelects[i].map(v => !!this.areaSelects[i]))
      },

      closeMove(){ this.isAdd.isShow = false},

      getBank (v) { this.selectorBehindObj["bankOfDeposit"] = v.id },

      getCity (v) {
        this.selectorBehindObj["cityId"] = v.id;
        this.selectorBehindObj["city"] = v.name
        this.getArea(v.id) },

      getArea(id){
        let url=`${this.$apidomain}/common/findareaandstreetoptions?cityId=${id}`;
        return this.$http.get(url).then(res=>{
          const data=res.data;
          if(data.code==="0000"){
                  this.areaSelects=[];
                  this.streetSelects=[];
                  this.area=data.result;
                  this.area.forEach((v,i)=>{
                    this.areaSelects.push(0);
                    this.streetSelects.push([]);
                    v.cities.forEach(e=> this.streetSelects[i].push(false))
                  });
                }else{
                  this.$queryFun.successAlert.call(this,data.error);
                }
        })
      },
      submitAdd(isEdit=false){
        let params=[];
        const getIds=obj=>{
          let params=[];
          obj.parents.forEach((v,i)=>{
            if(v===1){
              params.push(obj.list[i][obj.key])
            }else if(v===2){
              obj.childrens[i].forEach((e,y)=>{
                if(e){
                  params.push(obj.list[i][obj.beans][y][obj.key]);
                }
              })
            }
          });
          return params
        };
        let areaIds = getIds({
                  parents:this.areaSelects,
                  list:this.area,
                  childrens:this.streetSelects,
                  beans:"cities",
                  key:"id"
                }).join(",");
        const getSillName = key => {
          return {
              parents:this.productionFirsts,
              list:this.skillList,
              childrens:this.productionChilds,
              beans:"beans",
              key,
          }
        };

        let skillId = getIds(getSillName("a")).join(",");
        this.selectorBehindObj.skillIdNames=getIds(getSillName("b")).join(",");
        this.selectorBehindObj.areaIds=areaIds;
        this.selectorBehindObj.skillIds=skillId;

        this.inputs.forEach(v=>{
          this.selectorBehindObj[v.key]=v.value;
        });
        this.selectorBehindObj.idPhotos=[];
        this.files.forEach((v,i)=>{
          if(this.selectorBehindObj[v.key])this.selectorBehindObj.idPhotos.push(this.selectorBehindObj[v.key])
        });
        if(isEdit)return this.complete(this.selectorBehindObj);
        this.selectorBehindObj.idPhotos = this.selectorBehindObj.idPhotos.join(",");

        if(this.$testReg(this.selectorBehindObj,this,"network")&&this.$selectorExpSite(this.selectorBehindObj,this)){
          this.selectorBehindObj.password=md5(this.selectorBehindObj.password);
        //正则验证
        let url=`${this.$apidomain}/siteInfo/submit`;

        this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            this.$notify({title: '成功', message: '新建成功', type: 'success'});
            this.quiry();
            this.isAdd.isShow=false
          }else{
            this.$queryFun.successAlert.call(this,data.error);
          }
        })
        }
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
            this.$queryFun.successAlert.call(this,"上传失败");
          }
        });
      },
      open3() {
        this.$prompt('请输入密码', '提示', {
        }).then(({ value }) => {
          if(value.length<6){
            alert("密码不能少于6位");
            return;
          }
          let o = {"id": this.editData.siteInfo.id,"password":md5(value)};
          let urlR=`${this.$apidomain}/siteInfo/updatePassword`;
          this.$http.post(urlR,o).then(r=>{
            let data=r.data;
            if(data.code==='0000'){
              this.$message({type: 'success', message: '操作成功'});
            }else{
              alert(data.error);
            }
          });
          let pas;
          this.selectorBehindObj.password = pas;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
    },
    mounted() {

    },
    watch:{

    },
    computed:{
      bankOfDeposit(){
        if(!!this.editData.siteInfo&&!!this.editData.siteInfo.bankOfDeposit){
          return this.editData.siteInfo.bankOfDeposit
        }

      },
      isPassword(){
        if(!this.isAdd.id){
            return true;
        }else if(this.isAdd.id&&this.isEdit){
           return true;
        }
        return false;
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";

  #app{
    overflow: hidden;
    .section_option{
      display: inline-block;
    }
  }
  .el-input{
   width:217px;
  }

  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    letter-spacing: 0;
    width:60%;
    border-radius: 7px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:80%;
    >h3{
      font-size: 16px;
      color: #333333;
      border-bottom:2px solid #979797;
      text-align: center;
      font-family:PingFangSC-Regular;
      line-height:3em;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{
      overflow-y:auto;
      width:100%;
      height:75%;
      padding:0 2em;
      >.container_content{
        display: flex;
        >aside{
          width:50%;
          >div{
            margin-top:1em;
            .section_option{
              display: inline-block;
            }
          }
        }
        >.container_content_right, >.container_content_left{
          >div{
            >.list_name{
              width:93px;
            }
          }
        }
        >.container_content_right{
          >div{
            >.saver_container{
              display: inline-block;
              width:77%;
              /*height:500px;*/
              vertical-align: text-top;
              border:1px solid #ccc;
              box-shadow: 0 0 5px #ccc;
              >aside{
                height:100%;
              }
              >.left_list{
                width:40%;
                border-right:1px solid #ccc;
              }
              >.right_list{
                width:70%;
              }
            }
          }
        }
      }
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
      >.input_title{
        background:#F0F0F0;
        line-height: 2em;
        margin-top:20px;
        text-indent: 1em;
      }
      >.upload_papers{
        margin-top:5em;
        >.input_title{
          background:#F0F0F0;
          line-height: 2em;
          margin-top:20px;
          text-indent: 1em;
        }
        >.upload_papers_content{
          display: flex;
          padding:1em 3em;
          >.file{
            flex:1;
          }
        }
      }
    }
  }
.container_area{
  padding:2em 1em;
  >div{
    .list_name{
      text-align: left;
      width:4em;
    }
  }
  >.content_area{
    width:100%;
    margin-top:1em;
    display: flex;
    flex-wrap: wrap;
    >aside{
      width:50%;
      margin-bottom:2em;
      >.area{
        &::before{
          content:"";
          display: inline-block;
          vertical-align: middle;
          left:0;
          margin-right:5px;
          top:0;
          width:20px;
          border-radius: 2px;
          height: 20px;
          border:1px solid #A470CD;
        }
      }
      >.select_area::before{
        border:none;
        background:url(../../../assets/images/selectArea3.png) center center no-repeat;
        background-size:100% 100%;
      }
      >.topo_select::before{
        border:none;
        background:url(../../../assets/images/topo-selected.png) center center no-repeat;
        background-size:100% 100%;
      }
      >.street_list{
        display: flex;
        flex-wrap: wrap;
        >.street_list_item{
          width:23%;
          display: flex;
          justify-content: center;
          align-items: center;
          color:#979797;
          margin-top:.5em;
          border-radius: 2px;
          margin-right:.6em;
          border:1px solid #999999;
          min-height:30px;

          text-align: center;
        }
        >.selected_cities{
          border:1px solid rgba(164,112,205,1);
          position:relative;
          &::after{
            position:absolute;
            top:-1px;
            right:-1px;
            content:"";
            background:url(../../../assets/images/childer-selected.png) center center no-repeat;
            width: 24px;
            height: 24px;
            background-size:100% 100%;

          }
        }
      }
    }
    >.left_item{

    }
    >.right_item{

    }
  }


}
  .file {
    position: relative;
    display: inline-block;
    /*float:left;*/
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    width:140px;
    margin-right:2em;
    height: 143px;
    overflow: hidden;
    vertical-align: text-top;
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
    right:20px;
    top:-30%;
    background-origin: content-box;
  }
  .btn_container{
    position:absolute;
    left:50%;
    bottom:3em;
    transform:translateX(-50%);
    button{
      padding-left:5em;
      padding-right:5em;
    }
  }
  .input_title{
    background:#F0F0F0;
    line-height: 2em;
    margin-top:20px;
    text-indent: 1em;
  }
</style>
<style lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }
</style>


