<template>

        <div class="container_area">
          <!--<div>-->
            <!--<span class="list_name"> 城市:</span>-->
            <!--<select-option class="section_option" @selectorData="getCity"  :messageList="$store.state.cityData" :placeholder="'请选择城市'" > </select-option>-->
          <!--</div>-->
          <div class="content_area">
            <aside class="left_item" v-for="(item,index) in list">
              <div class="cursor area" :class="{'select_area':selectFirst[index]===1,'topo_select':selectFirst[index]===2}" @click="selectArea(index)">
                {{item[props.label]}}
              </div>
              <div class="street_list">
                <div class="cursor street_list_item" v-for="(items,indexs) in item[props.childs]" @click="selectItem(items,index,indexs)" :key="indexs" :class="{'selected_cities':selectChild[index][indexs]}">
                  {{items[props.label]}}
                </div>
              </div>
            </aside>
          </div>
        </div>
</template>
<script>
    export default {
      props:["list","selectFirst","selectChild","props"],
        data() {
            return {
              skillIdsOne1:"",
            }
        },
        methods: {
          selectItem(e,y,i) {
         this.skillIdsOne1  = 1;
            this.$emit("skillIdsOne1",this.skillIdsOne1 )
            this.selectChild[y][i]=!this.selectChild[y][i]
            this.$set(this.selectChild,y, this.selectChild[y]);
            let isSelector=1;
            const $forEach = (arr,isActive=false) =>{
              for(let k=0; k<arr.length; k++){
                if(!arr[k]) return !!isActive?2:0;
              }

              return 1;


            };
            let isActive= false;
            for(let k=0; k<this.selectChild[y].length; k++){
              if(this.selectChild[y][k]){
                isActive=true;
              }
            }
            isSelector=$forEach(this.selectChild[y]);
            if(!isSelector)isSelector=$forEach(this.selectChild[y],true);
            if(!isActive)isSelector=0;
            this.$set(this.selectFirst,y,isSelector)
          },
          selectArea(i) {
            this.skillIdsOne1 = 1;
            this.$emit("skillIdsOne1",this.skillIdsOne1 )
            let isSelector=!!this.selectFirst[i]?0:1;
            this.$set(this.selectFirst,i,isSelector);
            this.$set(this.selectChild,i,this.selectChild[i].map(v => !!this.selectFirst[i]))
          },
        },
        created() {
         if(this.props.isEdit && this.props.skills){

           this.props.skills.forEach(v=>{
              this.list.forEach((e,i)=>{
                if(v.length>=3&&v===e.a){
                   this.selectArea(i)
                }else{
                  e[this.props.childs].forEach((el,y)=>{
                    if(v===el.a){
                      this.selectItem(el,i,y)
                    }
                  })
                }
              })

           })
         }
        }
    }
</script>
<style scoped lang="scss">
  .input_title{
    background:#F0F0F0;
    line-height: 2em;
    margin-top:20px;
    text-indent: 1em;
  }



  .container_area{
    padding:2em 1em;
    >div{
      .list_name{
        text-align: left;
        width:4em;
      }
    }
  }


  .content_area{
    width:100%;
    margin-top:1em;
    display: flex;
    flex-wrap: wrap;
    >aside{
      width:50%;
      margin-bottom:2em;
      >.area{
        &::before{
          content:"";
          display: inline-block;
          vertical-align: middle;
          left:0;
          margin-right:5px;
          top:0;
          width:20px;
          border-radius: 2px;
          height: 20px;
          border:1px solid #A470CD;
        }
      }
      >.select_area::before{
        border:none;
        background:url(../../../../assets/images/selectArea3.png) center center no-repeat;
        background-size:100% 100%;
      }
      >.topo_select::before{
        border:none;
        background:url(../../../../assets/images/topo-selected.png) center center no-repeat;
        background-size:100% 100%;
      }
      >.street_list{
        display: flex;
        flex-wrap: wrap;
        >.street_list_item{
          width:23%;
          display: flex;
          justify-content: center;
          align-items: center;
          color:#979797;
          margin-top:.5em;
          border-radius: 2px;
          margin-right:.6em;
          border:1px solid #999999;
          min-height:30px;

          text-align: center;
        }
        >.selected_cities{
          border:1px solid rgba(164,112,205,1);
          position:relative;
          &::after{
            position:absolute;
            top:-1px;
            right:-1px;
            content:"";
            background:url(../../../../assets/images/childer-selected.png) center center no-repeat;
            width: 24px;
            height: 24px;
            background-size:100% 100%;

          }
        }
      }
    }
    >.left_item{

    }
    >.right_item{

    }
  }
</style>


