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
    },
    onChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
  },
  data: {
    _pure_one_way: false,
    _pure_be_controlled: false,
    _pure_checked: false,
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
        // checked,
        _checked,
        value,
        _pure_one_way: isOneWay,
        _pure_be_controlled: thisBeControlled,
        onChange,
      } = this.data
      const realChecked = isOneWay || !_checked
      if (realChecked !== !!_checked) {
        if (onChange && typeof onChange === 'function') {
          onChange(realChecked)
        }
        if (thisBeControlled && realChecked !== !!_checked) {
          this.setData({checked: realChecked})
        }
        if (this._group) {
          const {
            _pure_targets: targets,
            _pure_be_controlled: beControlled,
            _pure_multiple: multiple
          } = this._group.data
          if (value) {
            // this._group直接调用innerchange，保整innerchange内部的this指向this._group
            this._group.innerchange({checked: realChecked, value})
          }
          if (!beControlled) {
            if (realChecked && targets && !multiple) {
              Object.keys(targets).forEach(targetName => {
                if (targetName !== value) {
                  targets[targetName]._groupControll(false)
                }
              })
            }
            this.setData(this.genIcon({checked: realChecked}))
          }
        } else if (!thisBeControlled) {
          console.log(realChecked)
          this.setData(this.genIcon({checked: realChecked}))
        }
      }
    },
    _groupControll(checked) {
      this.setData(this.genIcon({checked}))
    }
  },
  lifetimes: {
    attached() {
      const {checked, defaultChecked} = this.data
      let _checked = defaultChecked
      let pureChecked = defaultChecked
      let pureBeControlled = false
      if (typeof checked === 'boolean') {
        _checked = checked
        pureChecked = checked
        pureBeControlled = true
      }
      this.setData({
        ...this.genIcon({checked: _checked}),
        _pure_be_controlled: pureBeControlled,
        _pure_checked: pureChecked,
      })
    }
  },
  observers: {
    checked(checked) {
      console.log('observers', checked)
      // this.setData({_pure_checked: checked})
      /*
      if (!this._group) {
        const {_checked} = this.data
        const realChecked = typeof checked === 'boolean' ? checked : _checked
        if (realChecked !== !!_checked) {
          this.setData(this.genIcon({checked: realChecked}))
        }
      }
      */
    },
    _pure_checked(checked) {
      console.log('_pure_checked', checked)
      if (!this._group) {
        const {_checked} = this.data
        if (checked !== !!_checked) {
          this.setData(this.genIcon({checked}))
        }
      }
    },
    size(size) {
      this.setData(this.genIcon({size}))
    },
  },
})
