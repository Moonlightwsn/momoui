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
    _pure_one_way: false,
    _pure_is_controlled: false,
    _checked: false,
    _currentIcon: '',
    _checkedClass: 'mui-unchecked',
  },
  methods: {
    _GenIcon({checked: checkedArg} = {}) {
      const {
        checkedIcon,
        icon,
        _checked,
        _pure_is_switch: isSwitch,
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
    _CheckControll() {
      const {
        _checked,
        controlled,
        value,
        _pure_one_way: isOneWay,
        _pure_is_controlled: thisIsControlled,
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
            _pure_targets: targets,
            _pure_is_controlled: isControlled,
            _pure_multiple: multiple
          } = this._group.data
          if (value) {
            // this._group直接调用innerchange，保证innerchange内部的this指向this._group
            this._group.innerchange({checked: realChecked, value})
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
        _pure_is_controlled: pureIsControlled
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
    'size, disabled': function () {
      this.setData(this._GenIcon())
    },
  },
})
