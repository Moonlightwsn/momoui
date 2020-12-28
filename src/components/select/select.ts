import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase, 'wx://form-field'],
  properties: {
    color: {
      type: String,
      value: 'primary',
    },
    customItem: {
      type: String,
      value: null,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    disableDefaultPadding: {
      type: Boolean,
      value: false,
    },
    disableUnderline: {
      type: Boolean,
      value: false,
    },
    error: {
      type: Boolean,
      value: false,
    },
    end: {
      type: String,
      value: null,
    },
    fullWidth: {
      type: Boolean,
      value: true,
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
    margin: {
      type: String,
      value: 'none',
    },
    name: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: '',
    },
    placeholderStyle: {
      type: String,
      value: '',
    },
    placeholderClass: {
      type: String,
      value: '',
    },
    range: {
      type: Array,
      value: null,
    },
    rangeKey: {
      type: String,
      value: null,
    },
    required: {
      type: Boolean,
      value: false,
    },
    start: {
      type: String,
      value: null,
    },
    // @ts-ignore
    value: null,
    variant: {
      type: String,
      value: 'standard',
    },
  },
  data: {
    _display: null,
    _focus: false,
  },
  lifetimes: {
    attached() {
      const {mode, value} = this.data
      if (value === null || typeof value === 'undefined') {
        this._controlled = false
      } else {
        this._controlled = true
      }
      if (mode === 'region' && !Array.isArray(value)) {
        this.setData({value: []})
      }
    }
  },
  methods: {
    _value2display(val) {
      const {
        range,
        rangeKey
      } = this.data
      let _display
      if (Array.isArray(range)) {
        if (Array.isArray(val)) {
          _display = val.map((item, i) => {
            const index = Number(item)
            return (rangeKey ? range[i][index][rangeKey] : range[i][index])
          }).join(' ')
        } else {
          const index = Number(val)
          _display = rangeKey ? range[index][rangeKey] : range[index]
        }
      } else if (Array.isArray(val)) {
        _display = val.join(' ')
      } else {
        _display = val
      }
      this.setData({
        _display
      })
    },
    _inputBlur(e) {
      if (!this._muiSelectInput) {
        const _muiSelectInput = this.selectComponent('._mui-select-input')
        this._muiSelectInput = _muiSelectInput
      }
      if (this._muiSelectInput) {
        this._muiSelectInput._onBlur(e)
      }
      this.setData({_focus: false})
    },
    _inputFocus(e) {
      if (!this._muiSelectInput) {
        const _muiSelectInput = this.selectComponent('._mui-select-input')
        this._muiSelectInput = _muiSelectInput
      }
      if (this._muiSelectInput) {
        this._muiSelectInput._onFocus(e)
      }
      this.setData({_focus: true})
    },
    _change(e) {
      const {detail: {value}} = e
      if (!this._controlled) {
        this.setData({value})
      }
      this._inputBlur(e)
      this.triggerEvent('change', e.detail)
    },
    _cancel(e) {
      this._inputBlur(e)
      this.triggerEvent('cancel', e.detail)
    }
  },
  observers: {
    value(val) {
      this._value2display(val)
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
