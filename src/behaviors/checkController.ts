export default Behavior({
  behaviors: ['wx://form-field'],
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
    controlled: {
      type: Boolean,
      value: false,
    },
    defaultChecked: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    disableRipple: {
      type: Boolean,
      value: false,
    },
    icon: {
      type: String,
      value: '',
    },
    onChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    size: {
      type: String,
      value: 'medium',
    },
    value: {
      type: String,
      value: null,
    },
  },
  data: {
    _pureOneWay: false,
    _pureIsControlled: false,
    _checked: false,
    _currentIcon: '',
    _checkedClass: 'mui-unchecked',
  },
  methods: {
    _CheckControll() {
      const {
        _checked,
        controlled,
        value,
        _pureOneWay: isOneWay,
        _pureIsControlled: thisIsControlled,
        onChange,
      } = this.data
      const realChecked = isOneWay || !_checked
      if (realChecked !== !!_checked) {
        if (onChange && typeof onChange === 'function') {
          onChange(realChecked)
        }
        if (thisIsControlled && realChecked !== !!_checked && !controlled) {
          this.setData({checked: realChecked})
        }
        if (this._group) {
          const {
            _pureTargets: targets,
            _pureIsControlled: isControlled,
            _pureMultiple: multiple
          } = this._group.data
          if (value) {
            // this._group直接调用_InnerChange，保证_InnerChange内部的this指向this._group
            this._group._InnerChange({checked: realChecked, value})
          }
          if (!isControlled) {
            if (realChecked && targets && !multiple) {
              Object.keys(targets).forEach(targetName => {
                if (targetName !== value) {
                  targets[targetName]._GroupControll(false)
                }
              })
            }
            this.setData(this._GenIcon({checked: realChecked}))
          }
        } else if (!thisIsControlled) {
          this.setData(this._GenIcon({checked: realChecked}))
        }
      }
    },
    _GenIcon({checked: checkedArg} = {}) {
      const {
        checkedIcon,
        icon,
        _checked,
        _pureIsSwitch: isSwitch,
      } = this.data
      let checked = _checked
      if (typeof checkedArg !== 'undefined') {
        checked = checkedArg
      }
      let _currentIcon = icon
      let _checkedClass = 'mui-unchecked'
      if (checked) {
        _currentIcon = checkedIcon
        _checkedClass = 'mui-checked'
      }
      const newData:any = {
        _checked: checked,
        _currentIcon,
        _checkedClass,
      }
      if (isSwitch) {
        newData.value = checked
      }
      return newData
    },
    _GroupControll(checked) {
      this.setData(this._GenIcon({checked}))
    },
  },
  lifetimes: {
    attached() {
      const {checked, defaultChecked} = this.data
      let _checked = defaultChecked
      let pureIsControlled = false
      if (typeof checked === 'boolean') {
        _checked = checked
        pureIsControlled = true
      }
      this.setData({
        ...this._GenIcon({checked: _checked}),
        _pureIsControlled: pureIsControlled
      })
    }
  },
  observers: {
    checked(checked) {
      const {_checked} = this.data
      if (checked !== !!_checked && !this._group) {
        if (checked !== !!_checked) {
          this.setData(this._GenIcon({checked}))
        }
      }
    },
    value(value) {
      if (value && this._group) {
        this._group._BindValue(value, this)
      }
    },
    'size, disabled': function () {
      this.setData(this._GenIcon())
    },
  },
})
