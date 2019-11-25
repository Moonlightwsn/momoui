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
  },
  data: {
    iconColor: '#ffffff',
  },
  lifetimes: {
    attached() {
      const {disabled, checked, color} = this.properties
      if (disabled) {
        this.setData({iconColor: '#bdbdbd'})
      } else {
        const rippleBackgroundColor = rippleBackgroundColorMap[color]
        this.setData({iconColor: checked ? rippleBackgroundColor : '#ffffff'})
      }
    }
  },
  methods: {
    _tap(e) {
      const {disabled} = this.properties
      if (!disabled) {
        const {checked} = this.data
        this.setData({checked: !checked})
        const el = this.selectComponent('.mui-switch-icon')
        if (el && el.rippleClick && typeof el.rippleClick === 'function') {
          el.rippleClick(e, el)
        }
      }
    },
  },
})
