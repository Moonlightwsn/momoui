// 防抖动函数
function debounce(func: Function, wait: number) {
  let timer
  const delay = parseInt(`${wait}`, 10) || 0

  return function (...args) {
    clearTimeout(timer)
    const content = this
    timer = setTimeout(function () {
      func.apply(content, args)
    }, delay)
  }
}


const regexp = /(\b[0-9]{1,3}\b)/g
function highBrightnessColor(color: string) {
  const [r, g, b, a = 1] = color.match(regexp)
  return (
    (parseInt(r, 10) * 0.299 +
    parseInt(g, 10) * 0.578 +
    parseInt(b, 10) * 0.114) >= (192 * Number(a))
  )
}

const openTypeMap = {
  contact: 'contact',
  getPhoneNumber: 'getphonenumber',
  getUserInfo: 'getuserinfo',
  openSetting: 'opensetting',
  launchApp: 'launchapp',
}

export {
  debounce,
  highBrightnessColor,
  openTypeMap
}
