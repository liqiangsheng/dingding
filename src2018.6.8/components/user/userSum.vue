<template>
    <div id="app">
      <p>{{suerSum.name}} <b :style="{color:suerSum.color}"> {{suerSum.sum}} </b>
        <span v-if="suerSum.order==0">
          单
        </span>
        <span v-else>
            {{suerSum.sName==undefined?name:suerSum.sName}}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp; </p>
    </div>
</template>
<script>
    export default {
      props:["suerSum"],
        data() {
            return {
              name:"人"
            }
        },
        methods: {},
        created() {
        }
    }
</script>
<style lang="scss">
    p{
      float:left;
      margin-right:45px;
    }
</style>


