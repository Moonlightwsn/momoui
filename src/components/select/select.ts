import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    customItem: {
      type: String,
      value: null,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    end: {
      type: String,
      value: null,
    },
    fields: {
      type: String,
      value: 'day',
    },
    headerText: {
      type: String,
      value: null,
    },
    mode: {
      type: String,
      value: 'selector',
    },
    range: {
      type: Array,
      value: [],
    },
    rangeKey: {
      type: String,
      value: null,
    },
    start: {
      type: String,
      value: null,
    },
    value: {
      type: String,
      optionalTypes: [Array],
      value: null,
    },
  },
  data: {
    _index: null,
  },
  methods: {
    _value2index(val) {
      let _index
      const {
        mode,
        range,
        rangeKey,
      } = this.data
      switch (mode) {
        case 'selector':
          if (Array.isArray(range)) {
            range.some((item, index) => {
              if (val === item) {
                _index = index
                return true
              } else if (typeof item === 'object' && rangeKey && val === item[rangeKey]) {
                _index = index
                return true
              }
              return false
            })
          }
          break
        case 'multiSelector':
          _index = []
          if (Array.isArray(range) && Array.isArray(val)) {
            range.forEach((innerRange, i) => {
              if (Array.isArray(innerRange)) {
                innerRange.some((item, j) => {
                  if (val[i] === item) {
                    _index[i] = j
                    return true
                  } else if (typeof item === 'object' && rangeKey && val[i] === item[rangeKey]) {
                    _index[i] = j
                    return true
                  }
                  return false
                })
              }
            })
          }
          break
        default:
          _index = val
      }
      this.setData({_index})
    },
  },
  observers: {
    value(val) {
      this._value2index(val)
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
