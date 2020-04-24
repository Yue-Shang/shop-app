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
