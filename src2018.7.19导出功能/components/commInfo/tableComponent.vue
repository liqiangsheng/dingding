<template>
    <div >
      <table class="table_container" cellSpacing="0px" cellpadding="0" >
        <thead>
        <tr>
          <th v-for="(item,index) in title" :key="index">{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in list">
          <td>
            {{item.operateTime|moment('YYYY-MM-DD HH:mm:ss')}}
          </td>
          <td>
            {{item.operator|placeholder}}
          </td>
          <td>
            {{item.reasonOfComplaint|placeholder}}
          </td>
          <td>
            {{item.remark|placeholder}}
          </td>
          <!--<td @click="openImage(item)">-->
            <!--<span style="color:blue;cursor:pointer;" v-if="!!item.idPhotos"> 查看图片</span>-->
          <!--</td>-->
        </tr>
        </tbody>
      </table>
    </div>
</template>
<script>
    export default {
      props:["title","list"],
        data() {
            return {}
        },
        methods: {},
        created() {

        }
    }
</script>
<style scoped lang="scss">
.table_container{
  width:100%;
  text-align: center;
  th{
    background:#E5E9F2;
  }
  tbody{
    tr{
      td{
        border-bottom:1px solid #ccc;
      }

    }
  }
}
</style>


