<template>
   <scroll id="tab-menu">
     <div class="category-list">
       <div class="category-list-item"
            :class="{active: index === isAction}"
            v-for="(item,index) in category"
            :key="index"
            @click="itemClick(index)"
       >
         {{item.title}}
       </div>
     </div>
   </scroll>
</template>

<script>
    import Scroll from "components/common/scroll/Scroll";
    export default {
        name: "CategoryList",
        components: {Scroll},
        data(){
            return {
                isAction:0
            }
        },
        props:{
            category:Array
        },
        methods:{
            itemClick(index){
                this.isAction = index
                this.$emit('selectUtem',index)
            }
        }
    }
</script>

<style scoped>
  #tab-menu{
    background-color: #ffffff;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }
  .category-list-item{
    height: 35px;
    width: 100%;
    text-align: center;
    line-height: 35px;
  }
  .category-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #f1f1f1;
    border-left: 3px solid var(--color-high-text);
  }
</style>
