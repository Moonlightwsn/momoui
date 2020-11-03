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
    }
  },
  data: {
    _checked: false,
    _currentIcon: '',
    _currentIconStyle: '',
  },
  methods: {
    genIcon(checked) {
      const {checkedIcon, icon, size} = this.data
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
    _checkControol() {
      const {checked, _checked} = this.data
      this.triggerEvent('change', {checked: !_checked})
      if (typeof checked !== 'boolean') {
        this.setData(this.genIcon(!_checked))
      }
    }
  },
  lifetimes: {
    attached() {
      const {checked, defaultChecked} = this.data
      const _checked = typeof checked === 'boolean' ? checked : defaultChecked
      this.setData(this.genIcon(_checked))
    }
  },
  observers: {
    'checked, defaultChecked, size': function (checked, defaultChecked) {
      const _checked = typeof checked === 'boolean' ? checked : defaultChecked
      this.setData(this.genIcon(_checked))
    }
  }
})
