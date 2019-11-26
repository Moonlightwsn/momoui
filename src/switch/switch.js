import {rippleBackgroundColorMap} from '../utils/utils'

Component({
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    mStyle: String,
    mClass: String,
    color: {
      type: String,
      value: 'secondary',
    },
    checked: {
      type: Boolean,
      value: false,
    },
    placement: {
      type: String,
      value: 'right',
    }
  },
  data: {
    iconColor: '#ffffff',
  },
  lifetimes: {
    attached() {
      const {disabled} = this.properties
      if (disabled) {
        this.setData({iconColor: '#bdbdbd'})
      } else {
        this._switchControol(false)
      }
    }
  },
  methods: {
    _switchControol(trigger) {
      const {checked, color} = this.properties
      if (trigger) {
        this.triggerEvent('change', {checked: !checked})
      }
      const rippleBackgroundColor = rippleBackgroundColorMap[color]
      const newState = {}
      newState.checked = trigger ? !checked : checked
      if (color === 'default') {
        newState.iconColor = '#ffffff'
      } else {
        newState.iconColor = newState.checked ? rippleBackgroundColor : '#ffffff'
      }
      this.setData(newState)
    },
    _tap(e) {
      const {disabled} = this.properties
      if (!disabled) {
        this._switchControol(true)
        const el = this.selectComponent('.mui-switch-icon')
        if (el && el.rippleClick && typeof el.rippleClick === 'function') {
          el.rippleClick(e, el)
        }
      }
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
