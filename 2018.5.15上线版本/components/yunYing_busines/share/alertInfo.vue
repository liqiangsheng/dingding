<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{title}}  <p class="closeX" id="closeX" @click="data.isShow=false"></p></h3>
      <div class="content">
          <div class="left_info">
            <p class="title">积分奖励</p>
            <ul>
                <li v-for="(item,index) in details" v-if="index===0">
                  <span class="list_name"> 推荐数：</span>
                    <el-input style="width:100px"
                              type="number"
                              min="1"
                              placeholder="输入内容"
                              v-model="item.enrollment">
                    </el-input> 人
                    <span class="list_name"> 获取：</span>
                    <el-input style="width:100px"
                              type="number"
                              min="1"
                              placeholder="输入内容"
                              v-model="item.earnPoint">
                    </el-input> 分
                  </li>

              <li >
                <span class="list_name"> 推荐人数上限 ：</span>
                <el-input style="width:100px"
                          type="number"
                          min="1"
                          placeholder="输入内容"
                          v-model="inpus.ceilingOfPersonnel ">
                </el-input> 人
                <span class="list_name"> 积分上限 ：</span>
                <el-input style="width:100px"
                          type="number"
                          min="1"
                          placeholder="输入内容"
                          v-model="inpus.upperLimitOfIntegral">
                </el-input> 分
              </li>

            </ul>
          </div>

      </div>

       <div class="consume_info">
            <p class="title">提成佣金奖励</p>
            <ul>

            </ul>
        </div>
    </div>

    <div class="btn">
      <button @click="suspend">禁用</button>
      <button @click="execution" class="selector">启用</button>
    </div>
  </div>
</template>

<script>

export default {
    props:["title","data","getOpenData","originalData"],
      data(){
        return{
          details:this.originalData.details,
          inpus:{
            ceilingOfPersonnel:this.originalData.ceilingOfPersonnel,
            upperLimitOfIntegral:this.originalData.upperLimitOfIntegral,
          }
        }
      },
      methods: {
        addList(){
          let o= {
            enrollment:1,
            earnPoint:1
          };
          this.details.push(o);
        },
        suspend(){
          this.postData("0")
        },
        execution(){
          //立即执行
           this.postData("1")
        },
        postData(state){
          let details=[];
          details.push(this.details[0]);
          let url =`${this.$apidomain}/userFriendsShareRecord/saveSetting`,
            params={"ceilingOfPersonnel":this.inpus.ceilingOfPersonnel,"upperLimitOfIntegral":this.inpus.upperLimitOfIntegral,
              "details":details,"available":state};
          this.$http.post(url,params).then(r=>{
            let data=r.data;
            if(data.code==="0000"){
              this.$message({
                type: 'success',
                message: '提交成功'
              });
              this.getOpenData();this.data.isShow=false
            }else{
              this.$message.error(data.error);
            }
          })
        }
      },
        mounted() {

        },
      created(){

      }
}
</script>

<style scoped lang="scss">
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
      >h3{
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #333333;
         padding-left:10px;
        letter-spacing: 0;
      }
      >.content{
        overflow-y: auto;
        width:100%;
        display:flex;
        >div{

          flex:1;

          >ul{
            >li{
              line-height: 70px;
              >.list_name{
                width:110px;
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
</style>
