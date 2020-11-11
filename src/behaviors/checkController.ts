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
    _checked: false,
    _currentIcon: '',
    _checkedClass: 'mui-unchecked',
  },
  methods: {
    genIcon({checked: checkedArg} = {}) {
      const {
        checkedIcon,
        icon,
        _checked,
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
      return {
        _checked: checked,
        _currentIcon,
        _checkedClass,
      }
    },
    _checkControll() {
      const {
        _checked,
        controlled,
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
        if (thisBeControlled && realChecked !== !!_checked && !controlled) {
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
      let pureBeControlled = false
      if (typeof checked === 'boolean') {
        _checked = checked
        pureBeControlled = true
      }
      this.setData({
        ...this.genIcon({checked: _checked}),
        _pure_be_controlled: pureBeControlled
      })
    }
  },
  observers: {
    checked(checked) {
      const {_checked} = this.data
      if (checked !== !!_checked && !this._group) {
        if (checked !== !!_checked) {
          this.setData(this.genIcon({checked}))
        }
      }
    },
    'size, disabled': function () {
      this.setData(this.genIcon())
    },
  },
})
