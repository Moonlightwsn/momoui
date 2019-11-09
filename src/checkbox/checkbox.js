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
    }
  },
  data: {
    centerripple: true,
    iconColor: '#dc004e',
    rippleBackgroundColor: '#dc004e',
  },
  lifetimes: {
    attached() {
      if (this.properties.disabled) {
        this.setData({iconColor: '#b6b6b6'})
      } else {
        const rippleBackgroundColor = rippleBackgroundColorMap[this.properties.color]
        this.setData({iconColor: rippleBackgroundColor})
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
      const {disabled} = this.properties
      if (!disabled) {
        this.setData({checked: !checked})
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
