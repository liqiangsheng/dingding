<template>
    <div id="box">
      <div class="derive">
      <el-button  @click="addFirstCategory(props.http)" size="large" >{{props.name}}</el-button>
      </div>
    </div>
</template>
<script>
    export default {
      props:["props"],
        data() {

            return {

            }
        },
        methods: {
          addFirstCategory(http){
            let url =`${this.$apidomain}/${http}`;
            this.$http.get(url).then(r=>{
				let data = r.data;
				if(data&&"0000"===data.code){
		          this.$notify({
		            title: '成功',
		            message: '执行成功',
		            type: 'success'});
				}else if(data){
					this.$notify({
			            title: '失败',
			            message: data.error,
			            type: 'error'});
				}else{
					this.$notify({
			            title: '失败',
			            message: '执行失败',
			            type: 'error'});
				}
            })
          },
        },
        created() {

        }
    }
</script>
<style scoped lang="scss">
  .derive{
    float:right;
  }
</style>


