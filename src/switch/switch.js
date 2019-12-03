import {rippleBackgroundColorMap} from '../utils/utils'

Component({
  behaviors: ['wx://form-field'],
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    ripple: {
      type: Boolean,
      value: true,
    },
    mStyle: String,
    mClass: String,
    value: Boolean,
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
      const {disabled, checked} = this.properties
      if (disabled) {
        this.setData({iconColor: '#bdbdbd'})
      } else {
        this._switchControol(checked)
      }
    }
  },
  methods: {
    _switchControol(force) {
      const {checked, color} = this.properties
      const newState = {}
      if (typeof force === 'boolean') {
        newState.valuse = force
        newState.checked = force
      } else {
        this.triggerEvent('change', {checked: !checked})
        newState.value = !checked
        newState.checked = !checked
      }
      const rippleBackgroundColor = rippleBackgroundColorMap[color]
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
        this._switchControol()
        const el = this.selectComponent('.mui-switch-icon')
        if (el && el.rippleClick && typeof el.rippleClick === 'function') {
          el.rippleClick(e, el)
        }
      }
    },
    reset() {
      this._switchControol(false)
    },
  },
  relations: {
    '../form/form': {
      type: 'ancestor',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
