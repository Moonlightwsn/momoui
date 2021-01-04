import muiBase from '../../behaviors/muiBase.ts'
import {debounce} from '../../common/utils.ts'

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
  data: {
    _pureActions: [],
  },
  lifetimes: {
    created() {
      this._currentTheme = currentTheme
      if (!this._ArrangeActions) {
        this._ArrangeActions = debounce(() => {
          const newActions = this.data._pureActions
          if (newActions.length > 0) {
            this._hideInactiveAction = newActions.length > 3
            newActions.forEach((item, index) => {
              item._defaultValue = index
              item._ReRenderControlledProps()
            })
            if (!this._hasBindThemeChanged) {
              wx.onThemeChange((obj) => {
                this._hasBindThemeChanged = true
                if (obj && obj.theme) {
                  newActions.forEach(item => {
                    this._currentTheme = currentTheme = obj.theme
                    item._ReRenderControlledProps()
                  })
                }
              })
            }
          }
        })
      }
    },
  },
  relations: {
    '../bottom-navigation-action/bottom-navigation-action': {
      type: 'descendant',
      linked(target) {
        if (target) {
          this.data._pureActions.push(target)
          this.setData({_pureActions: this.data._pureActions})
        }
      },
      unlinked(target) {
        const _targetIndex = this.data._pureActions.findIndex(item => item === target)
        this.data._pureActions.splice(_targetIndex, 1)
        this.setData({_pureActions: this.data._pureActions})
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
    'showLabels, value, _pureActions': function () {
      if (this._ArrangeActions) {
        this._ArrangeActions()
      }
    },
  },
  options: {
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
