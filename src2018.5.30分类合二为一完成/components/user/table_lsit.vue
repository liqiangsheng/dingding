
<template>
  <div id="app">
        <table cellSpacing="0px" cellpadding="0">
        <thead >
          <tr class="theads">
            <th class="multiple">全选</th>
            <th>序号</th>
            <th>绑定手机</th>
            <th>城市</th>
            <th>近期登陆</th>
            <th>渠道</th>
            <th>来源类型</th>
            <th>关注状态</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in dataList">
            <td>
               <el-checkbox v-model="item.checked"></el-checkbox>
            </td>
            <td>
            {{item.sequenceNumber|placeholder}}
            </td>
            <td>
             {{item.tel|placeholderTel}}
            </td>
            <td>
             {{item.city|placeholder}}
            </td>
            <td>
            {{item.time|placeholder}}
            </td>
            <td>
             {{item.irrigationDitch|placeholder}}
            </td>
            <td>
             {{item.sourceClass|placeholder}}
            </td>
            <td>
              {{item.followStatus|placeholder}}
            </td>
            <td>
              {{item.status|placeholder}}
            </td>
            <td>
              <span>禁用</span>
              <span>详情</span>
            </td>
          </tr>

        </tbody>
      </table>
  </div>
</template>

<script>
export default {
      data(){
        return{
             checked: true,
             dataList:"",
        }
      },
      methods: {

      },
      created(){
        this.dataList=this.$store.state.tableData  //从vuex获取父组件数据
      }
}
</script>

<style scoped lang="scss">
    table{
      width:100%;
      .theads{

        >th{
          padding:10px 10px;
          text-align:center;
         background: #E5E9F2;
          box-shadow: inset 0 1px 0 0 #E0E6ED,
           inset 0 -1px 0 0 #E0E6ED;
          // float:left;
        }
        >.multiple{
          width:30px;
          box-size:border-box;
        }
      }
      >tbody{
        >tr{
          >td{
             padding:10px 10px;
              text-align:center;

          }

          >td:last-of-type{
            >span{
             float:left;
            }
            >span:last-of-type{
              float:right;
            }
          }
        }
         >tr:nth-of-type(even){
              background: #F9FAFC;
          }
      }
    }
</style>

