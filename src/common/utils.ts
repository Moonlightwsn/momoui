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

export {
  openTypeMap,
  ObserversForControlledPropsByAncestor,
}
