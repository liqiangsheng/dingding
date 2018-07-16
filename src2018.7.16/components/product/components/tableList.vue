<template>
    <div>
        <table>
          <tbody>
            <tr v-for="(items,index) in item">
              <td>{{items[name]|putawayShow}}</td>
            </tr>
          </tbody>
        </table>
    </div>
</template>
<script>
    export default {
      props:["item","name"],
        data() {
            return {

            }
        },
        methods: {},
        created() {
        }
    }
</script>
<style scoped lang="scss">
  table{
    width:100%;
    td{
      border:none;
    }
  }
</style>


