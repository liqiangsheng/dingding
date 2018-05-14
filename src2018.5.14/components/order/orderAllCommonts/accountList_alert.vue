
<template>
  <div id="app">
    <div class="container">
      <h3>{{dataObj.title}}</h3>
      <div class="content">
        <div class="left_info">
          <p class="title">师傅信息</p>
          <ul>
            <li>姓名：{{dataObj.userName}}</li>
            <li>手机号:
              <span v-if="!this.isEdit()">
                  {{dataObj.userTel}}
              </span>
              <span v-else>
                  <el-input
                    placeholder="请输入内容"
                    v-model="dataObj.userTel">
                 </el-input>
              </span>
            </li>
            <li>师傅类别:{{dataObj.masterType}}</li>
            <li>师傅编号:{{dataObj.masterNumber}}</li>
            <li>所属网点:{{dataObj.netDrop}}</li>
            <!--可编辑-->
            <li>
              服务城市:
              <span  v-if="!this.isEdit()">
               {{dataObj.city}}
              </span>
              <span v-else>
                <el-select
                  v-model="dataObj.cityPositionData.SourceTypeValue" placeholder="请选择"
                  @change="selector(dataObj.cityPositionData,dataObj.cityPositionData.SourceType,dataObj.cityPositionData.SourceTypeValue)">
              <el-option
                v-for="items in dataObj.cityPositionData.SourceType"
                :key="items.value"
                :value="items.value"
              >
              </el-option>
            </el-select>
              </span>

            </li> <!--可编辑-->
            <li>身份证:{{dataObj.certificate}}</li>

            <li>服务区域:<!--可编辑-->
              <span v-if="!this.isEdit()">
                  {{dataObj.serveArea}}
              </span>
              <span v-else>
                  <el-cascader id="city"
                               @change="changeSelector"
                               :options="dataObj.serveAreas"
                               change-on-select
                               @active-item-change="handleItemChange"
                               :props="dataObj.props"
                  ></el-cascader>
              </span>
            </li>
            <li>服务工种:
              <span v-if="!this.isEdit()">
                   {{dataObj.workerType}}
              </span>
              <span v-else>
                <el-select
                  v-model="dataObj.serveTypePositionData.SourceTypeValue" placeholder="请选择"
                  @change="selector(dataObj.serveTypePositionData,dataObj.serveTypePositionData.SourceType,dataObj.serveTypePositionData.SourceTypeValue)">
              <el-option
                v-for="items in dataObj.serveTypePositionData.SourceType"
                :key="items.value"
                :value="items.value"
              >
              </el-option>
            </el-select>
              </span>

            </li>          <!--可编辑-->
            <li>紧急联系人:{{dataObj.irrigationDitch}}</li>
            <li>联系人号码:{{dataObj.contactsTel}}</li>
            <li>
              工作状态:
              <span  v-if="!this.isEdit()">
              {{dataObj.workStatus}}
              </span>·
              <span v-else>
                <el-select
                  v-model="dataObj.workStatu.SourceTypeValue" placeholder="请选择"
                  @change="selector(dataObj.workStatu,dataObj.workStatu.SourceType,dataObj.workStatu.SourceTypeValue)">
              <el-option
                v-for="items in dataObj.workStatu.SourceType"
                :key="items.value"
                :value="items.value"
              >
              </el-option>
            </el-select>
              </span>
            </li>
            <li>
              提点设置:
              <span  v-if="!this.isEdit()">
                {{dataObj.contactsTel}}
              </span>
              <span v-else>
                <el-select
                  v-model="dataObj.remindedDrops.SourceTypeValue" placeholder="请选择"
                  @change="selector(dataObj.remindedDrops,dataObj.remindedDrops.SourceType,dataObj.remindedDrops.SourceTypeValue)">
              <el-option
                v-for="items in dataObj.remindedDrops.SourceType"
                :key="items.value"
                :value="items.value"
              >
              </el-option>
            </el-select>
              </span>

            </li>

            <li>
              <ul>
                <li>
                  本人执证照：
                  <img :src="dataObj.licenseImg" alt="">
                </li>
                <li>
                  身份证正照:
                  <img :src="dataObj.identityCardImgFront" alt="">
                </li>
                <li>
                  身份证反面:
                  <img :src="dataObj.identityCardImgReverse" alt="">
                </li>
                <li>
                  资格证照:
                  <img :src="dataObj.qualificationImg" alt="">
                </li>
              </ul>
            </li>
            <li class="option_list" v-show="refuse()">
              拒绝原因：  {{refuse().refuseContent}} <br>
              其他： {{refuse().refuseContentText}}
            </li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:["dataObj"],
    data(){
      return{
        dataObj: {       //alertinfo
          title: "用户详情",
          selectorBehindObj: {
            serveCityId: "",
          },
          props: {
            value: 'label',
            children: 'cities',
          },
          cityPositionData: {
            name: "城市",
            key: "chengshiId",
            SourceTypeValue: '', //选中后的
            SourceType: [
              {     //来源类型
                value: '---请选择---',
                id: ""
              }, {
                value: '正常',
                id: "01"
              }, {
                value: '未激活',
                id: "00"
              }, {
                value: '禁用4444444',
                id: "02"
              }
            ]
          },
          serveAreas: [
            {
              label: '武汉',
              id: "0101",
              cities: [
                {label: "洪山区", id: "010101"},
                {label: "武昌区", id: "010102"},
                {label: "汉口区", id: "010103"},
                {label: "江夏区", id: "010104"},
                {label: "汉阳区", id: "010105"},
              ]
            }, {
              label: '深圳',
              id: "0102",
              cities: [
                {label: "南山区", id: "010201"},
                {label: "罗湖区", id: "010202"},
                {label: "宝安区", id: "010203"},
                {label: "龙华区", id: "010204"}
              ]
            }
          ],  //区域
          serveTypePositionData: {
            name: "服务工种",
            key: "fuwugongzhong",
            SourceTypeValue: '', //选中后的
            SourceType: [
              {     //来源类型
                value: '---请选择---',
                id: ""
              }, {
                value: '服务工种',
                id: "01"
              }, {
                value: '未激活',
                id: "00"
              }, {
                value: '禁用4444444',
                id: "02"
              }
            ]
          },
          remindedDrops: {
            name: "服务工种",
            key: "tidian",
            SourceTypeValue: '', //选中后的
            SourceType: [
              {     //来源类型
                value: '---请选择---',
                id: ""
              }, {
                value: '提点',
                id: "01"
              }, {
                value: '未激活',
                id: "00"
              }, {
                value: '禁用4444444',
                id: "02"
              }
            ]
          },
          workStatu: {
            name: "工作状态",
            key: "gongzuoztai",
            SourceTypeValue: '', //选中后的
            SourceType: [
              {     //来源类型
                value: '---请选择---',
                id: ""
              }, {
                value: '工作状态1',
                id: "01"
              }, {
                value: '工作状态2',
                id: "00"
              }, {
                value: '工作状态3',
                id: "02"
              }
            ]
          },
        },

      }
    },
    methods: {
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.dataObj.selectorBehindObj[key]=v.id;
          }
        })
      },
      handleItemChange(val) {
      },
      changeSelector(value){           //服务区域
        this.dataObj.serveAreas.forEach((v,i)=>{
          if(value[0]===v.label){
            this.dataObj.selectorBehindObj.serveCityId=v.id;    //选择城市
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.dataObj.selectorBehindObj.serveCityId=e.id  //选择区
              }
            })
          }
        });
      },
      isEdit(){
        return this.$store.state.isEdit;
      },
      refuse(){
        return this.$store.state.refuse
      }
    },
    mounted() {
      console.log(this.refuse());
    },
    watch:{

    },
    created(){
    }
  }
</script>
<style lang="scss">

  .el-select-dropdown, .el-cascader-menus, .el-dialog__wrapper{
    z-index: 99999 !important;
  }
</style>
<style scoped lang="scss">
  .el-input, .el-input__inner{
    width:auto;
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
          >li{
            >ul{
              display: flex;
              flex-wrap:wrap;
              padding:0;
              >li{
                width:50%;
                margin-bottom:30px;
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
  }
  .el-select-dropdown__item{
    line-height: 20px;
  }
</style>

