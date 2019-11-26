import rippleBehaviors from '../ripple/behaviors'

const rippleBackgroundColorMap = {
  default: '#707070',
  primary: '#1976d2',
  secondary: '#dc004e',
}

Component({
  behaviors: [rippleBehaviors],
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    mStyle: String,
    mClass: String,
    value: {
      type: String,
      value: '',
    },
    size: {
      type: Number,
      value: 24,
    },
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
    centerRipple: true,
    iconColor: '#dc004e',
    rippleBackgroundColor: '#dc004e',
  },
  lifetimes: {
    attached() {
      const {disabled, color} = this.properties
      const {checked} = this.data
      if (disabled) {
        this.setData({iconColor: '#b6b6b6'})
      } else {
        const rippleBackgroundColor = rippleBackgroundColorMap[color]
        this.setData({iconColor: checked ? rippleBackgroundColor : '#707070'})
        this.data.rippleBackgroundColor = rippleBackgroundColor
      }
    },
  },
  methods: {
    _rippleControll(e, action) {
      const {ripple} = this.data
      const {disabled} = this.properties
      if (!disabled && ripple && typeof action === 'function') {
        action(e, this)
      }
    },
    _checkControol() {
      const {checked} = this.data
      const {disabled, color} = this.properties
      if (!disabled) {
        const rippleBackgroundColor = rippleBackgroundColorMap[color]
        this.setData({checked: !checked, iconColor: !checked ? rippleBackgroundColor : '#707070'})
      }
    },
    _tap(e) {
      this._checkControol()
      this._rippleControll(e, this.rippleClick)
    },
    _longPress(e) {
      this._checkControol()
      this._rippleControll(e, this.rippleHold)
    },
    _touchEnd(e) {
      this._rippleControll(e, this.rippleHoldEnd)
    },
  },
  observers: {
    checked() {
      if (this.data.group) {
        this.data.group.checkedChange()
      }
    },
  },
  relations: {
    '../checkbox-group/checkbox-group': {
      type: 'ancestor',
      linked(target) {
        this.data.group = target
      },
      unlinked() {
        this.data.group = null
      },
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
