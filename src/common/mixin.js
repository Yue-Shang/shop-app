import {debounce} from "./utils"
import BackTop from "components/common/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener: null,
    }
  },
  mounted(){
    const newRefresh = debounce(this.$refs.scroll.refresh,200);
    this.itemImgListener = () =>{
      newRefresh()//闭包引用外面的变量
    };
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    // console.log('我是混入中的内容');
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,300)
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > 1000;
    }
  }
}
