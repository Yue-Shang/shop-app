module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth: 375,//视图宽度，对应的是我们设计稿的宽度
      // retina高清屏，一个点有两个像素
      //750->30px在375上是15px,一般都是根据iPhone 6的屏幕宽度提供的设计稿（750x1334）
      viewportHeight: 667,//视窗的高度，对应的是我们设计稿的高度，（也可以不配置）
      unitPrecision:5,//指定‘px’转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw',//指定需要转换成的视窗单位，建议使用vw
      selectorBlackList:['ignore','content','nav-bar'],//指定不需要的类
      minPixelValue:1,//小于或者等于‘1px’不转换为视窗单位
      mediaQuery: false,//允许在媒体查询中转换‘px’
      exclude:[/TabBar/,/Cart/,/Bar/,/TabControl/]//包含就算
    },
  }
}

// 1.在js中使用正则：/正则相关规则/
// 2.exclude中存放的元素必须是正则表达式
// 3.按照排除的文件写对应的正则：
//   正则规则：
//   1）^abc：表示匹配的内容，必须以什么开头（abc）
//   2) abc$: 表示匹配的内容，必须以什么结尾（abc）
