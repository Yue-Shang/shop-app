import {debounce} from "./utils"
import {POP, NEW, SELL} from "./const";
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

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
      this.$refs.tabControl1.isActive = index;//获取对应标签的索引
      this.$refs.tabControl2.isActive = index;
    }
  }
}
