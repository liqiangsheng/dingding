<template>
    <div>
      <section class="roll_back" @click="rollBack" v-if="isTop">
        <i class="iconfont">&#xe720;</i>
        <i class="iconfont">&#xe949;</i>
      </section>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              isTop:false
            }
        },
        methods: {
          rollBack(){
            let isTop,
              timer = setInterval(function(){
                //获取滚动条的滚动高度
                let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                //用于设置速度差，产生缓动的效果
                let speed = Math.floor(-osTop / 6);
                document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
                isTop =true;  //用于阻止滚动事件清除定时器
                if(osTop == 0){
                  clearInterval(timer);
                }
              },20);

          },
        },
        created() {

        },

      mounted(){
        document.addEventListener("scroll",e => {
          let top = document.documentElement.scrollTop || document.body.scrollTop;
          this.isTop=true;
          this.isTop=top>window.innerHeight?true:false;
        });
        //      上拉加载更多；

      },
    }
</script>
<style scoped lang="less">
  .roll_back{
    position:fixed;
    bottom:1rem;
    right:0;

    width:1.1rem;
    height: 1rem;
    background:rgba(0,0,0,.7);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    >i{
      color:#fff;
      /*height:.1rem;*/
      width:100%;
      font-size: .4rem;
      transform:translateY(10%);
    }
    > i:last-of-type{
      transform:translateY(-50%);
    }
  }

</style>


