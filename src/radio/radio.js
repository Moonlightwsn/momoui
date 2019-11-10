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
    _tap(e) {
      this._rippleControll(e, this.rippleClick)
    },
    _longPress(e) {
      this._rippleControll(e, this.rippleHold)
    },
    _touchEnd(e) {
      this._rippleControll(e, this.rippleHoldEnd)
    },
  },
  relations: {
    '../radio-group/radio-group': {
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
