const openTypeMap = {
  contact: 'contact',
  getPhoneNumber: 'getphonenumber',
  getUserInfo: 'getuserinfo',
  openSetting: 'opensetting',
  launchApp: 'launchapp',
}

const ObserversForControlledPropsByAncestor = (props: string[]) => {
  const obs = {}
  props.forEach(item => {
    obs[item] = function () {
      if (!this._hasAttached) {
        if (!this._propIsSet) {
          this._propIsSet = {}
        }
        this._propIsSet[item] = true
      }
    }
  })
  return obs
}

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
  debounce,
  openTypeMap,
  ObserversForControlledPropsByAncestor,
}
