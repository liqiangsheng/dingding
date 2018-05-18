<template>
  <div>
    <nav v-if="addMaster">
    <header v-if="homeShow">
        <div class="operate_button_left" @click="openCarte ">
           菜单  <i class="i menu_icon" ></i>
        </div>
        <h2>
            {{title}}
        </h2>

          <div class="operate_button_right">
            <i class="i add_icon" v-if="isAddShow" @click="add"></i>
            <i class="i news_icon" :class="{'new_massage':!!sysMseeageOrder}" @click="messageCenterClick"></i>
        </div>
    </header>
   <header class="header1" v-else-if="masterOlderShow">
     <div class="operate_button_left1" @click="goback()">
       <img src="./assets/images/goback.png" style="display: inline-block;width: 0.7rem;height: 0.7rem;transform: translateY(0.05rem)">
     </div>
     <h2>
       {{title}}
     </h2>
     <div @click="masterPositionClick" v-if="orderDetailShow" style="position: absolute;right: 0.2rem;font-size:0.28rem;font-family:PingFangSC-Regular;color:rgba(83,107,210,1)">
            师傅位置
     </div>
   </header>
   <header class="header2" v-else-if="masterDetailShow">
     <div class="operate_button_left1" @click="gobackOne()">
       <img src="./assets/images/gobackTwo.png" style="display: inline-block;width: 0.7rem;height: 0.7rem;transform: translateY(0.05rem)">
     </div>
     <h2>
       {{title}}
     </h2>
     <div @click="disableMaster" style="position: absolute;right: 0.5rem;font-size:0.28rem;font-family:PingFangSC-Regular;color:#fff">
        禁用
     </div>
   </header>

 </nav>
       <router-view style="padding-top:.96rem;"></router-view>
        <mu-popup position="left" popupClass="demo-popup-left" :open="leftPopup" @close="close('left')">
                <section class="bill_list_container">
                        <section class="container_top">
                                <img src="./assets/images/userImg.png" alt="">
                                <h3>{{fullName}}</h3>
                        </section>
                        <section class="container_list">
                            <ul>
                                <li  class="base_icon order_icon"
                                        v-for="(item,index) in $router.options.routes" :key="index"
                                        v-if="item.isShow" :class="item.iconName"
                                        @click="roterLlik(item)">
                                        {{item.name}}
                                </li>
                            </ul>
                        </section>
                </section>
        </mu-popup>
  </div>
</template>
<script>
  import storage from "@/assets/js/storage"
    export default{
        data(){
            return{
                fullName:"",
                bottomPopup: false,
                topPopup: false,
                leftPopup: false,
                title:"",
                rightPopup: false,
                masterOlderShow:false,
                masterDetailShow:false,
                orderDetailShow:false,
                homeShow:true,
                isAddShow: false,
                addMaster: true,
                sysMseeageOrder:"",
            }
        },
        methods:{
          //新建师傅
          add() {
            this.$router.push({path: '/addMaster'});
          },
         open (position) {
      this[position + 'Popup'] = true
    },
    openCarte(){
        this.open('left')
    },
    close (position) {
      this[position + 'Popup'] = false
    },
    roterLlik(e){
        this.$router.push({path:e.path})
        this.close('left');
    },
          goback(){
            this.$router.go(-1);
          },
          gobackOne(){
            this.$router.go(-1);
          },
          messageCenterClick(){
           this.$router.push({path:"/messageCenter"})
          },
          masterPositionClick(){
            this.$router.push({path:"/masterPosition"})
          },
          disableMaster(){
            this.$router.push({path:"/masterDisable"})
          }
        },

        mounted(){

          setInterval(() => getMessage.call(this),30000)

        },
      computed: {

        },
        watch:{
           "$route":function(a,b){
             if(!this.fullName){
                this.fullName = !!storage.getLocalStorage("userInfo")?storage.getLocalStorage("userInfo").fullName:'';
             }
             this.title = document.title;
             this.isAddShow = this.title === "师傅管理" ? true : false;
             this.addMaster = this.title === '新建师傅' ? false : true;
             if(a.fullPath === "/masterOrder"||a.fullPath === "/dotInformation"||a.fullPath ==="/messageCenter"||a.fullPath === "/orderDetail"||a.fullPath ==="/masterPosition"||a.fullPath ==="/masterDisable"){
               this.masterOlderShow = true;
               this.masterDetailShow = false;
               this.homeShow =false
               if(this.title === "工单详情"){
                 this.orderDetailShow = true;
               }else{
                 this.orderDetailShow = false;
               }
             }else if(a.fullPath === "/masterDetail"){
               this.masterDetailShow = true;
               this.masterOlderShow = false;
               this.homeShow =false;
             }else if(a.path.includes("/changeMaster")){
               this.addMaster=false;
             }else{
               this.masterDetailShow = false;
               this.masterOlderShow = false;
               this.homeShow =true;
             }
           }
        },
        created() {

    }
  }
function getMessage(){
  let url =`${this.$common.apidomain}/sysMessage/findredismessage`;
  this.$http.get(url).then(res => this.$httpFilter(res).then(data=>{
        let result= data.result;
        if(!!result){
          this.sysMseeageOrder=result.sysMseeageOrder
        }else{
          this.sysMseeageOrder=""
        }
//
  })
)
}
</script>
<style scoped lang="less">
nav{
    text-align: center;
    position:fixed;
    z-index: 999;
    width:100%;
    header{
        background:#536BD2;
        height:.96rem;
        color:#fff;
         line-height:.96rem;
        overflow: hidden;
        position: relative;

         text-align: center;
        h2{
            font-size:0.36rem;
            // min-width:4rem;
            position: absolute;
            left: 50%;
            transform:translateX(-50%);
            text-align: center;
            line-height:.96rem;
            margin:auto;
            float:left;
        }
        .operate_button_right{
            text-align: right;
            float: right;
            font-size:0.32rem;
              padding-right:2em;
              position: relative;
              .news_icon{
                   background:url(./assets/images/news-icon.png) center center no-repeat;
                    background-size:100% 100%;
                    width:.7rem;
                    height:.7rem;
                    right:0;
                    top:0;
                    transform:translate(-100%,20%);
                    /*position:relative;*/
              }
          .add_icon {
            background: url(./assets/images/menu_addIcons.png) center center no-repeat;
            background-size: 100% 100%;
            width: .7rem;
            height: .7rem;
            top: 0;
            transform: translate(-230%, 20%);
          }
          .new_massage::after{
            width:0.13rem;
            height:0.13rem;
            border-radius: 50%;
            position:absolute;
            top:.05rem;
            right:.07rem;
            content:"";
            background:#E65831;
          }
        }
        .operate_button_left{
            text-align: left;
            padding-left:1em;
            position: relative;
            font-size:0.32rem;
               float: left;
               span{
                   vertical-align: middle;
                   font-size:.5rem;
               }
        }
    }
}
.bill_list_container{
    width:4.5rem;
    height:100vh;
    background:#fff;
    >.container_top{
        width:100%;
        height:3.79rem;
        display: flex;
         align-items: center;
        justify-content: center;
        // flex-wrap: wrap;
        flex-direction:column;
        >img{
            width:.8rem;
            height:.8rem;
            display: block;
        }
        >h3{
            // width:100%;
            color:#536BD2;
            font-size:.32rem;
            line-height:0.9rem;
        }
    }
    .container_list{
        ul{
                padding:0 .46rem;
            >li{
                line-height:1.22rem;
                font-size:0.36rem;
                position: relative;
                border-bottom:1px solid #CECECE;
                text-indent: 2.3em;
            }
            .base_icon::before{
                content:"";
                position: absolute;
                top:50%;
                width:0.36rem;
                height:0.36rem;
                left:.2rem;
                transform:translateY(-50%);
            }
            .order_icon::before{
                 background:url(./assets/images/deit_address.png) center center no-repeat;
                 background-size:100% 100%;
               }
          /*师傅管理图标*/
            .master_icon::before{
              background:url(./assets/images/master_icon.png) center center no-repeat;
              background-size:100% 100%;
            }
          /*设置图标*/
          .setting_icon::before{
            background:url(./assets/images/setting_icon.png) center center no-repeat;
            background-size:100% 100%;
          }
          .orderTotal::before{
            background:url(./assets/images/orderTotal.png) center center no-repeat;
            background-size:100% 100%;
          }
          .finance::before{
            background:url(./assets/images/finance.png) center center no-repeat;
            background-size:100% 100%;
          }

        }
    }
}

    .menu_icon{
        background:url(./assets/images/menu_icon.png) center center no-repeat;
        background-size:100% 100%;
        width:.37rem;
        height:.29rem;
        right:0;
        transform:translate(150%,-220%);
    }
    .header1{
          background: #ffffff;
          height:.96rem;
          color:black;
          line-height:.96rem;
          overflow: hidden;
          position: relative;
          text-align: center;
          border-bottom: 0.01rem solid rgba(241,241,241,1);;

          .operate_button_left1{
            text-align: left;
            padding-left:1em;
            position: relative;
            font-size:0.32rem;
            float: left;
          }
        }
.header2{
  background: #ffffff;
  height:.96rem;
  color:black;
  line-height:.96rem;
  overflow: hidden;
  position: relative;
  text-align: center;
  background:linear-gradient(138.7deg,rgba(135,154,238,1),rgba(83,107,210,1));
  .operate_button_left1{
    text-align: left;
    padding-left:1em;
    position: relative;
    font-size:0.32rem;
    float: left;
  }
}
#header3{
  background: #ffffff;
  height:.96rem;
  color:black;
  line-height:.96rem;
  overflow: hidden;
  position: relative;
  text-align: center;
  background:linear-gradient(138.7deg,rgba(135,154,238,1),rgba(83,107,210,1));
  .operate_button_left1{
    text-align: left;
    padding-left:1em;
    position: relative;
    font-size:0.32rem;
    float: left;
  }
  .operate_button_right{
    text-align: right;
    float: right;
    font-size:0.32rem;
    padding-right:2em;
    position: relative;
    .news_icon{
      background:url(./assets/images/news-icon.png) center center no-repeat;
      background-size:100% 100%;
      width:.7rem;
      height:.7rem;
      right:0;
      top:0;
      transform:translate(-100%,20%);
    }
  }
}

</style>


