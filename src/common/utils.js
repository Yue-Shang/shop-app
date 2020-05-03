export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    }, delay)
  }
}
//timer一直没有销毁，他在函数中是一个局部变量
//因为函数是一个闭包，这个闭包对外层的东西进行了一个引用，有引用指向的时候，他就不销毁了

//1.第一次进来走else,延迟500ms,直接进到走第二张图片了
//2.第二次进来，timer不为空，走if,把之前的timer清空，复制一个新timer，接着走else
//3.第三次进来，timer不为空，走if,把之前的timer清空，复制一个新timer，接着走else
//...
//30.第三十次进来，第29次已经赋值timer了，我们走else把这个timer清空，走else，因为是最后一次，我们等到延迟时间，拿到func


//设置时间戳
export function formatDate(date, fmt) {
  //获取年份
  //y+ ->1个或者多个y
  //y* ->0个或者多个y
  //y? ->0个或者1个y
  if (/(y+)/.test(fmt)) {
    //replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
    // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
    // substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
