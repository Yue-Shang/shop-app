<!--这是一个子组件中会用到的标签，点击标签切换不同页面-->
<template>
    <div class="tab-control">
<!--      只是文字不一样的时候没有必要搞插槽了-->
      <div v-for="(item,index) in titles"
           class="tab-control-item"
           :class="{active: isActive === index}"
            @click="liClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props:{
            titles:{
                type:Array,
                default(){
                    return[]
                }
            }
        },
        data() {
            return {
                isActive: true
            }
        },
        methods:{
            liClick(index) {
                this.isActive = index
            }
        }
    }
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  background-color: white;
}
.tab-control-item{
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.tab-control-item span{
  padding: 5px;
}
.active{
  color: var(--color-high-text);
}
.active span{
  border-bottom: 5px solid var(--color-high-text);
}
</style>
