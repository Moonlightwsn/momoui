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
    _pure_one_way: false,
    _checked: false,
    _currentIcon: '',
    _currentIconStyle: '',
    _switchRootClass: '',
    _pureSizeToPx: {
      medium: 24,
      small: 20,
    },
    _pureUncheckedColor: '#757575',
  },
  methods: {
    genIcon({checked: checkedArg, size: sizeArg}) {
      const {
        checkedIcon,
        icon,
        size: _size,
        _checked,
        disabled,
        _pureSizeToPx,
        _pureUncheckedColor,
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
      let _switchRootClass = ''
      let _currentIconStyle = `font-size: ${_pureSizeToPx[size] || 24}px;`
      if (checked) {
        _currentIcon = checkedIcon
        _switchRootClass = 'switch-checked'
      } else {
        _currentIconStyle = `${_currentIconStyle}${disabled ? '' : `color: ${_pureUncheckedColor};`}`
      }
      return {
        _checked: checked,
        _currentIcon,
        _currentIconStyle,
        _switchRootClass,
      }
    },
    _checkControll() {
      const {
        checked,
        _checked,
        value,
        _pure_one_way: isOneWay
      } = this.data
      const realChecked = isOneWay || !_checked
      this.triggerEvent('change', {checked: realChecked})
      if (value) {
        this.triggerEvent('innerchange', {value, checked: !_checked}, {bubbles: true, composed: true})
      }
      if (this._group) {
        if (!this._group.data._pure_be_controlled) {
          if (realChecked && this._group.data._pure_targets) {
            const {_pure_targets: targets} = this._group.data
            Object.keys(targets).forEach(targetName => {
              if (targetName !== value) {
                targets[targetName]._groupControll(false)
              }
            })
          }
          this.setData(this.genIcon({checked: realChecked}))
        }
      } else if (typeof checked !== 'boolean') {
        this.setData(this.genIcon({checked: realChecked}))
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
