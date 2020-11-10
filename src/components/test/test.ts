Component({
  properties: {
    value: {
      type: null,
      value: null,
    },
    onChange: {
      // @ts-ignore
      type: Function,
      value: null,
    }
  },
  methods: {
    _test() {
      const {value, onChange} = this.data
      let _value
      if (typeof value === 'string') {
        _value = value === '1' ? '0' : '1'
      } else if (typeof value === 'boolean') {
        _value = !value
      } else if (typeof value === 'number') {
        _value = value === 1 ? -1 : 1
      } else if (Array.isArray(value)) {
        _value = value.length > 0 ? [1] : []
      } else if (typeof value === 'object' && value !== null) {
        _value = Object.keys(value).length > 0 ? {} : {a: 1}
      }
      if (onChange && typeof onChange === 'function') {
        onChange(_value)
      }
      this.setData({value: _value})
    },
  }
})
