import muiBase from '../../behaviors/muiBase.ts'

/* eslint-disable */
const app = getApp()
/* eslint-disable */
let currentTheme = app.momouiTheme
if (!currentTheme) {
  try {
    const sysInfo = wx.getSystemInfoSync()
    currentTheme = (sysInfo && sysInfo.theme) || 'light'
  } catch(e) {
    console.log(e)
    currentTheme = 'light'
  }
}

Component({
  behaviors: [muiBase],
  properties: {
    onChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    showLabels: {
      type: Boolean,
      value: false,
    },
    value: {
      type: String,
      optionalTypes: [Number, Array, Object],
      value: null,
    },
  },
  lifetimes: {
    created() {
      this._currentTheme = currentTheme
    },
    ready() {
      if (this._actions) {
        if (this._actions.length > 3) {
          this._hideInactiveAction = true
        }
        this._actions.forEach((item, index) => {
          item._defaultValue = index
          item._ReRenderControlledProps()
        })
        wx.onThemeChange((obj) => {
          if (obj && obj.theme) {
            this._actions.forEach(item => {
              this._currentTheme = currentTheme = obj.theme
              item._ReRenderControlledProps()
            })
          }
        })
      }
    }
  },
  relations: {
    '../bottom-navigation-action/bottom-navigation-action': {
      type: 'descendant',
      linked(target) {
        if (target) {
          if (!this._actions) {
            this._actions = []
          }
          this._actions.push(target)
        }
      },
    },
  },
  methods: {
    _onChange(e, value) {
      const {onChange} = this.data
      if (onChange && typeof onChange === 'function') {
        onChange(e, value)
      }
    },
  },
  observers: {
    'showLabels, value': function () {
      if (this._actions) {
        this._actions.forEach(item => {
          item._ReRenderControlledProps()
        })
      }
    }
  },
  options: {
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
