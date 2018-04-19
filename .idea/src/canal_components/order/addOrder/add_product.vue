<template>
  <div id="app" class="channel-app-box">
    <el-dialog style="z-index:999999"  :visible.sync="isAddProduct.isShow" size="tiny">
      <h3>{{addProductInfo.title}}</h3>
      <ul class="alert_forbidden_text">
        <li>
          数量：
          <el-input style="width:auto"
            size="small"
            placeholder="输入内容"
            v-model="addProductInfo.sum">
          </el-input>
        </li>
        <li>
          产品：
          <el-select size="mini"
                     @change="selector(addProductInfo.productMsg,addProductInfo.productMsg.productList,addProductInfo.productMsg.SourceTypeValue)"
                     v-model="addProductInfo.productMsg.SourceTypeValue" placeholder="请选择"
                  >
            <el-option
              v-for="items in addProductInfo.productMsg.productList"
              :key="items.value"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          分类：
          <el-cascader
            expand-trigger="hover"
            :options="options"
            :props="props"
            v-model="selectedOptions2"
            @change="handleChange">
          </el-cascader>
        </li>

      </ul>
      <el-button style="float:right;"  @click="masterImposeOperate(addProductInfo,isAddProduct)" type="primary">确定</el-button> &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button style="float:right;"  @click="cancel(isAddProduct)">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props:["isAddProduct"],
    data() {
      return {
//        新增产品产品 start
        addProductInfo:{
          sum:"",
          masterImpose:false,            //退款ALERT
          selectorBehindObj:{},       //参数
          productMsg: {
            name: "渠道",
            key: "qudao",
            SourceTypeValue: '', //选中后的
            productList: [
              {     //来源类型
                value: '恶意下单1',
                id: "001"
              }, {
                value: '恶意下单2',
                id: "002"
              }, {
                value: '恶意下单3',
                id: "003"
              }, {
                value: '恶意下单4',
                id: "004"
              }, {
                id: "005",
                value: '恶意下单5'
              }
            ]
          },

        },
//        新增产品data  End
        options: [
          {
            "a": "003001",
            "b": "苹果",
            "beans": [
              {
                "a": "003001004",
                "b": "iPhone 7 Pulus",
                "beans": [
                  {
                    "a": "003001004001",
                    "b": "磨砂黑色",
                    "beans": [
                      {
                        "a": "003001004001002",
                        "b": "屏幕问题",
                        "beans": [
                          {
                            "a": "003001004001002002",
                            "b": "外屏破碎(显示和接触正常)",
                            "d": "0",
                            "e": "维修手机"
                          },
                          {
                            "a": "003001004001002003",
                            "b": "外屏破碎(内屏有灰角)",
                            "d": "0",
                            "e": "维修手机"
                          },
                          {
                            "a": "003001004001002004",
                            "b": "屏幕完整(显示和接触不正常)",
                            "d": "0",
                            "e": "维修手机"
                          },
                          {
                            "a": "003001004001002001",
                            "b": "屏幕其他问题",
                            "d": "0",
                            "e": "维修手机"
                          }
                        ],
                        "c": "故障选择"
                      },
                      {
                        "a": "003001004001003",
                        "b": "后壳问题",
                        "beans": [],
                        "c": "故障选择"
                      },
                      {
                        "a": "003001004001004",
                        "b": "电池问题",
                        "beans": [],
                        "c": "故障选择"
                      },
                      {
                        "a": "003001004001001",
                        "b": "声音问题",
                        "beans": [],
                        "c": "故障选择"
                      }
                    ],
                    "c": "选择问题类型"
                  },
                  {
                    "a": "003001004002",
                    "b": "金色",
                    "beans": [],
                    "c": "选择问题类型"
                  },
                  {
                    "a": "003001004003",
                    "b": "亮黑色",
                    "beans": [],
                    "c": "选择问题类型"
                  },
                  {
                    "a": "003001004004",
                    "b": "玫瑰金色",
                    "beans": [],
                    "c": "选择问题类型"
                  }
                ],
                "c": "手机颜色"
              },
              {
                "a": "003001001",
                "b": "iPhone 7",
                "beans": [],
                "c": "手机颜色"
              },
              {
                "a": "003001002",
                "b": "iPhone 6s Pulus",
                "beans": [],
                "c": "手机颜色"
              },
              {
                "a": "003001003",
                "b": "iPhone 6s",
                "beans": [],
                "c": "手机颜色"
              }
            ],
            "c": "手机型号"
          }
         ],
        props: {
          value: 'a',
          label: 'b',
          children: 'beans'
        },
        selectedOptions2: []
      }
    },
    methods: {
      cancel(item){          //取消
        item.isShow=false;
      },
      masterImposeOperate(item,isAShow){       //确定
        item.selectorBehindObj.sum=item.sum;
        console.log(item.selectorBehindObj);
        isAShow.isShow=false;

      },
      masterImposeSelector(item,index,textareaContent){
        item.selector=!item.selector;
      },

    selector(item,values,SourceTypeValue){       //选中后的下拉列表
      var key=item.key;
      values.forEach((v,i)=>{
        if(v.value===SourceTypeValue){
          this.addProductInfo.selectorBehindObj[key]=v.id;
          console.log( this.addProductInfo.selectorBehindObj);
        }
//
      })
      },
      handleChange(value) {
      let id=value[value.length-1];
      }
    },
    created() {

    }
  }
</script>
<style>
  .el-dialog__body{
    padding-top:0 ;
  }
  .el-cascader-menus{
    z-index: 9999 !important;
  }
</style>
<style scoped lang="scss">

  #app{
    position:relative;

  }
  h3{
    font-weight: normal;
    position:absolute;
    font-size: 14px;
    left:50%;
    top:15px;
    transform: translateX(-50%);
    text-align: center;
  }
  .alert_forbidden_text{
    list-style: none;
    >li{
      line-height: 3em;
      border-top:1px solid rgba(0,0,0,.1);
      >.order_number{
        float:right;
        padding-right:30px;
      }
    }
    >li:first-of-type{
      border:none;
    }

  }
</style>


