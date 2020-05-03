<!--商品详情头部导航：'商品','参数','评论','推荐'-->
<template>
    <div class="detail-navbar">
      <nav-bar>
        <div slot="left" @click="backClick">&lt</div>
        <div slot="center" class="title">
          <div v-for="(item,index) in title"
               class="title-item"
              :class="{active: index === isActive}"
               @click="titleClick(index)"
          >
            {{item}}
          </div>
        </div>
      </nav-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
        components: {NavBar},
        data(){
            return{
                title:['商品','参数','评论','推荐'],
                isActive:0
            }
        },
        methods:{
            titleClick(index){
                this.isActive = index;
                this.$emit('titleClick',index)
            },
            backClick(){
                // this.$router.go(-1)
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-tint)
}
</style>
