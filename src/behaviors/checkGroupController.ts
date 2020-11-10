export default Behavior({
  properties: {
    value: {
      type: Array,
      optionalTypes: [String],
      value: null,
    },
    defaultValue: {
      type: Array,
      optionalTypes: [String],
      value: null,
    },
    onChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
  },
  data: {
    _pure_targets: {},
    _pure_checked_value: {},
    _pure_be_controlled: false,
    _pure_multiple: true,
  },
  lifetimes: {
    attached() {
      const {
        value,
        defaultValue,
        _pure_multiple: isMultiple,
      } = this.data
      let checkedValue
      let beControlled = false
      if (Array.isArray(value)) {
        beControlled = true
        checkedValue = value
      } else if (typeof value === 'string') {
        beControlled = true
        checkedValue = value.split(',')
      } else if (Array.isArray(defaultValue)) {
        checkedValue = defaultValue
      } else if (typeof defaultValue === 'string') {
        checkedValue = defaultValue.split(',')
      }
      if (checkedValue) {
        const {_pure_checked_value: checkedValueMap} = this.data
        if (!isMultiple && checkedValue[0]) {
          checkedValueMap[checkedValue[0]] = true
        } else {
          checkedValue.forEach(value => {
            if (value) {
              checkedValueMap[value] = true
            }
          })
        }
        this.setData({
          _pure_checked_value: checkedValueMap,
          _pure_be_controlled: beControlled,
        })
      }
    }
  },
  methods: {
    innerchange(detail) {
      const {value, checked} = detail
      let checkedValue: Array<String> = []
      let tmpCheckedValueMap = false
      const {
        _pure_multiple: isMultiple,
        _pure_checked_value: checkedValueFromThisData,
        onChange,
      } = this.data
      if (this.data._pure_be_controlled) {
        tmpCheckedValueMap = {...checkedValueFromThisData}
      }
      const checkedValueMap = this._trigger(value, checked, tmpCheckedValueMap)
      checkedValue = Object.keys(checkedValueMap).filter(item => (checkedValueMap[item]))
      const realCheckedValue = isMultiple ? checkedValue : checkedValue[0]
      if (onChange && typeof onChange === 'function') {
        onChange(realCheckedValue)
      }
      /*
      const {value: valueFromProps} = this.data
      if (valueFromProps) {
        this.setData({value: realCheckedValue})
      }
      */
    },
    _trigger(value, checked, checkedValueMap) {
      if (value) {
        const {
          _pure_multiple: isMultiple,
          _pure_checked_value: checkedValue,
        } = this.data
        let realCheckedValue = checkedValueMap || checkedValue
        if (!isMultiple) {
          realCheckedValue = {}
        }
        realCheckedValue[value] = checked
        return realCheckedValue
      }
      return null
    },
  },
  observers: {
    value(value) {
      let checkedValueArr = []
      const {_pure_targets: targets, _pure_checked_value: checkedValue} = this.data
      if (typeof value === 'string') {
        checkedValueArr = value.split(',')
      } else if (Array.isArray(value)) {
        checkedValueArr = value
      }
      const checkedValueMap = {}
      checkedValueArr.forEach(val => {
        checkedValueMap[val] = true
      })
      Object.keys(targets).forEach(targetName => {
        const realChecked = checkedValueMap[targetName] || false
        checkedValue[targetName] = realChecked
        targets[targetName]._groupControll(realChecked)
      })
    }
  },
})
