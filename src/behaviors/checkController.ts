export default Behavior({
  properties: {
    checked: {
      type: Boolean,
      value: null,
    },
    checkedIcon: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: 'secondary',
    },
    defaultChecked: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    ripple: {
      type: Boolean,
      value: true,
    },
    icon: {
      type: String,
      value: '',
    },
    size: {
      type: String,
      value: 'medium',
    },
    value: {
      type: String,
      value: null,
    }
  },
  data: {
    _checked: false,
    _currentIcon: '',
    _currentIconStyle: '',
  },
  methods: {
    genIcon({checked: checkedArg, size: sizeArg}) {
      const {
        checkedIcon,
        icon,
        size: _size,
        _checked
      } = this.data
      let checked = _checked
      let size = _size
      if (typeof checkedArg !== 'undefined') {
        checked = checkedArg
      }
      if (typeof sizeArg !== 'undefined') {
        size = sizeArg
      }
      let _currentIcon = icon
      let _currentIconStyle = `font-size: ${size === 'small' ? '20px' : '24px'}`
      if (checked) {
        _currentIcon = checkedIcon
      } else {
        _currentIconStyle = `${_currentIconStyle};color: #757575`
      }
      return {
        _checked: checked,
        _currentIcon,
        _currentIconStyle,
      }
    },
    _checkControll() {
      const {checked, _checked, value} = this.data
      this.triggerEvent('change', {checked: !_checked})
      if (value) {
        this.triggerEvent('innerchange', {value, checked: !_checked}, {bubbles: true, composed: true})
      }
      if (this._group) {
        if (!this._group.data._pure_be_controlled) {
          this.setData(this.genIcon({checked: !_checked}))
        }
      } else if (typeof checked !== 'boolean') {
        this.setData(this.genIcon({checked: !_checked}))
      }
    },
    _groupControll(checked) {
      this.setData(this.genIcon({checked}))
    }
  },
  lifetimes: {
    attached() {
      const {checked, defaultChecked} = this.data
      const _checked = typeof checked === 'boolean' ? checked : defaultChecked
      this.setData(this.genIcon({checked: _checked}))
    }
  },
  observers: {
    checked(checked) {
      if (!this._group) {
        const {_checked} = this.data
        const realChecked = typeof checked === 'boolean' ? checked : _checked
        this.setData(this.genIcon({checked: realChecked}))
      }
    },
    size(size) {
      this.setData(this.genIcon({size}))
    },
  },
})
