import rippleBehaviors from '../ripple/behaviors'
import {rippleBackgroundColorMap} from '../utils/utils'

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
      if (action && typeof action === 'function') {
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
      if (this.data._group) {
        this.data._group.checkedChange()
      }
    },
  },
  relations: {
    '../checkbox-group/checkbox-group': {
      type: 'ancestor',
      linked(target) {
        this.data._group = target
      },
      unlinked() {
        this.data._group = null
      },
    },
  },
  options: {
    pureDataPattern: /^_/,
    styleIsolation: 'shared',
  },
})
