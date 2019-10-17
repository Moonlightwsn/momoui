// 防抖动函数
function debounce(func, wait) {
  let timer
  const delay = parseInt(wait, 10) || 0

  return function (...args) {
    clearTimeout(timer)
    const content = this
    timer = setTimeout(function () {
      func.apply(content, args)
    }, delay)
  }
}

export {
  debounce
}
