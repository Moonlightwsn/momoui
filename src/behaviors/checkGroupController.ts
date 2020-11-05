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
      if (Array.isArray(value)) {
        this.data._pure_be_controlled = true
        checkedValue = value
      } else if (typeof value === 'string') {
        this.data._pure_be_controlled = true
        checkedValue = value.split(',')
      } else if (Array.isArray(defaultValue)) {
        checkedValue = defaultValue
      } else if (typeof defaultValue === 'string') {
        checkedValue = defaultValue.split(',')
      }
      if (checkedValue) {
        if (!isMultiple && checkedValue[0]) {
          this.data._pure_checked_value[checkedValue[0]] = true
        } else {
          checkedValue.forEach(value => {
            if (value) {
              this.data._pure_checked_value[value] = true
            }
          })
        }
      }
    }
  },
  methods: {
    innerchange(e) {
      const {value, checked} = e.detail
      let checkedValue: Array<String> = []
      let tmpCheckedValueMap = false
      const {
        _pure_multiple: isMultiple,
        _pure_checked_value: checkedValueFromThisData,
      } = this.data
      if (this.data._pure_be_controlled) {
        tmpCheckedValueMap = {...checkedValueFromThisData}
      }
      const checkedValueMap = this._trigger(value, checked, tmpCheckedValueMap)
      checkedValue = Object.keys(checkedValueMap).filter(item => (checkedValueMap[item]))
      this.triggerEvent('change', {checkedValue: isMultiple ? checkedValue : checkedValue[0]})
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
    }
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
