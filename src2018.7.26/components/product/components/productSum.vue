<template>
  <div id="app">
    <p>{{suerSum.name}} <b :style="{color:suerSum.color}"> {{suerSum.sum}} </b>件 &nbsp;&nbsp;&nbsp;&nbsp; </p>
  </div>
</template>
<script>
  export default {
    props:["suerSum"],
    data() {
      return {}
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


