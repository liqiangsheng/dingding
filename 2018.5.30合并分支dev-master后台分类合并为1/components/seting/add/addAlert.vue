
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isAdd.title}}   <p class="closeX" id="closeX" @click="closeMove"></p></h3>
      <div class="content">
        <div class="left_info">
          <p class="title">角色信息</p>
          <ul class="add_master">
            <li>
              <span class="list_name">  {{level.name}} : </span>
              <el-select
                v-model="level.SourceTypeValue" placeholder="请选择" @change="selector(level,level.SourceType,level.SourceTypeValue)">
                <el-option
                  v-for="items in level.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li v-for="(item,index) in inputs" :key="index">
              <span class="list_name"> {{item.name}} : </span>
              <el-input
                placeholder="请输入内容"
                v-model="item.value">
              </el-input>
              <span v-if="item.isText" class="error_info">{{item.errorContent}}</span>
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
    props:["isAdd","quiry"],
    data(){
      return{
        selectorBehindObj:{
          "userRoleId":""
        },
        level:{
          name: "角色",
          key: "userRoleId",
          SourceTypeValue: '',
          SourceType: []
        },

        isSiteShow:false,
        primary:"primary",
        inputs:[
          {
            name:"姓名",
            key:"fullName",
            isText:false,
            errorContent:"info",
            value:""
          }, {
            isText:false,
            name:"手机号",
            key:"phoneNum",
            errorContent:"info",
            value:""
          }, {
            name:"用户名",
            isText:false,
            errorContent:"info",
            key:"name",
            value:""
          }, {
            name:"密码",
            isText:false,
            key:"password",
            errorContent:"info",
            value:""
          }
        ],
      }
    },
    created(){
      let url=this.$apidomain+"/common/findSysUserRole";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.level.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              this.level.SourceType.push({"id":v2.id,"value":v2.name});
            })
      })
    },
    methods: {
      submitAdd(){
        this.inputs.forEach(v=>{
          this.selectorBehindObj[v.key]=v.value;
        });
        if(this.$testReg(this.selectorBehindObj,this)){
        let url=this.$apidomain+"/sysUser/save";
        this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            this.$message({
              message: '新建成功',
              type: 'success'
            });
            this.quiry();
            this.isAdd.isShow=false
          }else{
           this.$message.error(data.error);
          }
        })}
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        let key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
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
  .error_info{
    color:red;
    font-size: 12px;
  }
  .el-input{
   width:200px;
  }
  .list_name{
    width:110px;
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

    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:70%;

    >.content{
      overflow-y: auto;
      width:100%;
      display:flex;
      height: 78%;
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
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
  .el-message{
    z-index: 9999 !important;
  }
  .add_master{
    >li{
        .el-cascader__label{
          line-height: 40px !important;

      }
    }
  }
</style>


