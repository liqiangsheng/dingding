<template>
  <!--师傅禁用-->
    <div id="masterDisable" ref="masterDisable">
      <ul class="masterDisableCenter">
        <!--<li>  <mu-radio label="多次恶意违规收费" name="group" nativeValue="多次恶意违规收费" v-model="value" class="demo-radio"/> </li>-->
        <!--<li>  <mu-radio label="多次被投诉" name="group" nativeValue="多次被投诉" v-model="value" class="demo-radio"/> </li>-->
        <!--<li>  <mu-radio label="关键资料不全" name="group" nativeValue="关键资料不全" v-model="value" class="demo-radio"/> </li>-->
        <!--<li>  <mu-radio label="引导用户线下付款" name="group" nativeValue="引导用户线下付款" v-model="value" class="demo-radio"/> </li>-->
        <!--<li>  <mu-radio label="师傅离职" name="group" nativeValue="师傅离职" v-model="value" class="demo-radio"/> </li>-->
        <!--<li>  <mu-radio label="其他" name="group" nativeValue="其他" v-model="value" class="demo-radio"/> </li>-->
        <li class="list" v-for="(item,index) in options" :key="index" @click="imgClick(item,index)"><span >
          <img :src="item.imgPath" v-if="item.bool&&activeIndex==index"></span>{{item.name}}</li>
        <!--<li><span :class="{active:activeIndex==index}"></span></li>-->
         <li v-show="textareaShow">
          <textarea v-model="value1" placeholder="请填写原因" style="width: 100%;height:2.95rem;padding: 0.16rem;outline:none">
          </textarea>
        </li>
      </ul>
      <div class="otherImg img_list" v-for="(item,index) in totalImg" :key="index">
          <div>
            <span class="uploadImg">
              <img :src="item" alt="" ref="img">
              <font class="closeImg" @click="closeImg('其他',index)">×</font>
            </span>
          </div>
        </div>
      <input type="file" ref="file" id="file" @change="traditional_file($event)"
               accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" style="display: none">
        <div class="otherImg upload" @click="uploadImg('其他证件')">
          <div>
            <span class="span"><img src="../../../assets/images/idOther.png" alt=""></span>
          </div>
           <p style="text-align:center;">添加照片</p>   
        </div>
      <button @click="Submission">提交</button>

    </div>
</template>
<script>
  import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
              value: '',

              options:[
                {
                  bool:false,
                  imgPath:"/static/images/xuanzhong.png",
                   name:"已抵达，点不了开始服务"
                },
                {
                  bool:false,
                  imgPath:"/static/images/xuanzhong.png",
                  name:"已抵达，用户家里没人"
                },
                {
                  bool:false,
                  imgPath:"/static/images/xuanzhong.png",
                  name:"客户电话打不通，联系不到客户"
                },
                {
                  bool:false,
                  imgPath:"/static/images/xuanzhong.png",
                  name:"用户要求更改服务时间"
                },
                {
                  bool:false,
                  imgPath:"/static/images/xuanzhong.png",
                  name:"找不到配件，无法完成维修"
                },
                 {
                  bool:false,
                  imgPath:"/static/images/xuanzhong.png",
                  name:"不会修，无法完成维修"
                },
                {
                  bool:false,
                  imgPath:"/static/images/xuanzhong.png",
                  name:"打通电话，用户取消工单"
                },{
                  bool:false,
                  imgPath:"/static/images/xuanzhong.png",
                  name:"无法当场完成维修，待后续服务"
                },
                {
                  bool:false,
                  imgPath:"/static/images/xuanzhong.png",
                  name:"其他"
                }
                ],
              totalImg:[],
              value1:"",
              index: '',
              textareaShow:false,
              activeIndex:-1,
            }
        },
      watch:{

      },
        methods: {
          closeImg(data, index) {
            event.stopPropagation()
              this.totalImg.splice(index, 1);

          },
          imgClick(v,i){
            this.activeIndex = i;
            v.bool = true;
             this.value = v.name;
            if(this.value === "其他"){
              this.textareaShow =true;
             if(this.$refs.masterDisable.scrollTop>0)return;
              setTimeout(()=>{
                let step=0,
                    pic=setInterval(()=>{
                      step+=10;
                      this.$refs.masterDisable.scrollTop=step;
                      if(step>=this.$refs.masterDisable.scrollHeight-window.innerHeight)clearInterval(pic);
                    },15)
                },100)
            }else{
              this.textareaShow =false;
            }
          },

      //上传图片
      uploadImg(data) {
        this.index = data;
        document.getElementById('file').click();
      },
      traditional_file(event) {                //inout的file
        let filesObj = event.target.files[0];
        let param = new FormData();           // 创建form对象
            param.append('file', filesObj);  // 通过append向form对象添加数据
        let url = `${this.$common.apidomain}/upload/kindeditorjson`;
        if (this.totalImg.length >= 3) {
          this.$Toast('最多只能上传3张图片');
          return;
        }
        this.$http.post(url, param).then(res => {
          let data = res.data;
          if(data.error===0){
            this.totalImg.push(data.url);
          }
        })
      },
          Submission(){
            if(!this.value){
             return Toast("请选择禁用原因")
            }else if(this.value == "其他"&&!this.value1){
              return Toast("请描述禁用原因")
            }
            const url = `${this.$common.apidomain}/exceptionrecord/saveexceptionrecord`,
                  params={
                    mainOrderId:this.$route.params.id,
                    idPhotos:this.totalImg.join(","),
                    reasonOfComplaint:this.reasonOfComplaint
                  } 
            this.$http.post(url,params).then(res=>this.$httpFilter(res).then(data=>{
                this.$ToastMessage("提交成功");
                this.$router.back(-1)
            },error=>{}))
          }
        },
        computed:{
          reasonOfComplaint(){
            return this.value==="其他"?`${this.value}:${this.value1}`:this.value;
          }
        },
        created() {
        
        }
    }
</script>
<style scoped lang="less">
  #masterDisable{
    position: absolute;
    left: 0;
    right: 0;
    padding-top:0 !important;
    top:0;
    bottom: 0;
   background: #fff;
    overflow-y: auto;
     min-height: 100vh;
    padding-bottom:2rem;
  }
  .masterDisableCenter{
    width: 100%;

    // height: 9.42rem;

    overflow: hidden;

      li {
        width: 100%;
        height: 1rem;
        border-top: 1px solid rgba(241, 241, 241, 1);
        padding: 0 5%;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular;
        color: rgba(57, 57, 57, 1);
        line-height: 1rem;
        span{
          display: inline-block;
          margin-right: 0.26rem;
          width:0.42rem;
          height: 0.42rem;
          border-radius: 100%;
          border: 0.01rem solid #cccccc;
          transform: translateY(0.1rem);
          img{
            display: inline-block;
            position: absolute;
            left: 0;
            top:-0.01rem;
            width: 0.42rem;
            height: 0.42rem;
          }

        }
        textarea{
          border:1px solid #ccc;
          border-radius:4px;
          line-height: 1.8em;
          font-size:.26rem;
        }
      }
     li:last-child{
       border-bottom: 0;
        height: 3.2rem;
     }
    li:last-of-type{
        border:none;
    }
  }

  button{
    border: 0;
    width: 90%;
    height: 0.9rem;
    margin-left: 5%;
    margin-top: 0.5rem;
    border-radius: 0.1rem;
    background: #536BD2;
    font-size:0.36rem;
    position:fixed;
    bottom:8%;
    left:0;
    font-family:PingFangSC-Regular;
    outline: none;
    color:rgba(255,255,255,1);
  }
    .otherImg {
        float:left;
      margin-bottom:2em;
        > div:nth-of-type(1) {
          .uploadImg {
            width: 100%;
            height: 1.79rem;
            left: 0;
            top: 0;
            border: none;
            >img{
              width:100%;
              height:100%;
            }
            .closeImg {
              display: inline-block;
              width: .4rem;
              height: .4rem;
              line-height: .4rem;
              text-align: center;
              color: #fff;
              position: absolute;
              right: -.15rem;
              top: -.15rem;
              z-index: 3;
              border-radius: 50%;
              font-size: .32rem;
              background-color: green;
            }
          }

        }
      }

      .img_list{
        width:3rem;
        height:1.79rem;
          float:left;
          margin-left: 2em;
        >div{
            width:100%;
            height:100%;
           >.uploadImg{
           display:block;
           position: relative;
            width:100%;
            height:100%;
            img{
              width:100%;
              height:100%;
            }
           }
        }

      }
           .upload{
             margin-left:2em;
             width:3rem;
             height:1.79rem;
          >div{
              width:100%;
              height:100%;
              background: #e6e6e6;
              border:1px solid #c3c3c3;
              >.span{
                  display: flex;
                  width:100%;
                  height:100%;
                  justify-content: center;
                  align-items: center;
                  >img{
                    width:.5rem;
                  }
              }
          }
      }
</style>


