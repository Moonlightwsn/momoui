import muiBase from './muiBase.ts'

export default Behavior({
  behaviors: [muiBase, 'wx://form-field'],
  properties: {
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
    row: {
      type: Boolean,
      value: false,
    },
    value: {
      type: Array,
      optionalTypes: [String],
      value: null,
    },
  },
  data: {
    _pureTargets: {},
    _pureCheckedValue: {},
    _pureIsControlled: false,
    _pureMultiple: true,
  },
  lifetimes: {
    attached() {
      const {
        value,
        defaultValue,
        _pureMultiple: isMultiple,
      } = this.data
      let checkedValue
      let isControlled = false
      if (Array.isArray(value)) {
        isControlled = true
        checkedValue = value
      } else if (typeof value === 'string') {
        isControlled = true
        checkedValue = value.split(',')
      } else if (Array.isArray(defaultValue)) {
        checkedValue = defaultValue
      } else if (typeof defaultValue === 'string') {
        checkedValue = defaultValue.split(',')
      }
      if (checkedValue) {
        const {_pureCheckedValue: checkedValueMap} = this.data
        if (!isMultiple && checkedValue[0]) {
          checkedValueMap[checkedValue[0]] = true
        } else {
          checkedValue.forEach(value => {
            if (value) {
              checkedValueMap[value] = true
            }
          })
        }
        this.data._pureIsControlled = isControlled
        this.data._pureCheckedValue = checkedValueMap
        if (!isControlled) {
          this.setData({
            value: checkedValue
          })
        }
      }
    }
  },
  methods: {
    innerchange(detail) {
      const {value, checked} = detail
      let checkedValue: Array<String> = []
      let tmpCheckedValueMap = false
      const {
        _pureMultiple: isMultiple,
        _pureCheckedValue: checkedValueFromThisData,
        onChange,
      } = this.data
      if (this.data._pureIsControlled) {
        tmpCheckedValueMap = {...checkedValueFromThisData}
      }
      const checkedValueMap = this._trigger(value, checked, tmpCheckedValueMap)
      checkedValue = Object.keys(checkedValueMap).filter(item => (checkedValueMap[item]))
      const realCheckedValue = isMultiple ? checkedValue : checkedValue[0]
      if (onChange && typeof onChange === 'function') {
        onChange(realCheckedValue)
      }
      const {_pureIsControlled: isControlled} = this.data
      if (!isControlled) {
        this.setData({value: realCheckedValue})
      }
    },
    _trigger(value, checked, checkedValueMap) {
      if (value) {
        const {
          _pureMultiple: isMultiple,
          _pureCheckedValue: checkedValue,
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
      const {_pureTargets: targets, _pureCheckedValue: checkedValue} = this.data
      const targetsKeyArr = Object.keys(targets)
      if (targetsKeyArr.length) {
        if (typeof value === 'string') {
          checkedValueArr = value.split(',')
        } else if (Array.isArray(value)) {
          checkedValueArr = value
        }
        const checkedValueMap = {}
        checkedValueArr.forEach(val => {
          checkedValueMap[val] = true
        })
        targetsKeyArr.forEach(targetName => {
          const realChecked = checkedValueMap[targetName] || false
          checkedValue[targetName] = realChecked
          targets[targetName]._GroupControll(realChecked)
        })
      }
    }
  },
})
