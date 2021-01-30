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
      this._hasAttached = true
      const {mode, value} = this.data
      if (mode === 'region' && !Array.isArray(value)) {
        this.setData({value: []})
      }
    }
  },
  relations: {
    '../form-control/form-control': {
      type: 'ancestor',
      linked(target) {
        if (!this._muiSelectInput) {
          const _muiSelectInput = this.selectComponent('._mui-select-input')
          this._muiSelectInput = _muiSelectInput
        }
        this._muiSelectInput._Linked(target)
      },
    },
  },
  methods: {
    _Cancel(e) {
      this.triggerEvent('cancel', e.detail)
    },
    _Change(e) {
      const {detail: {value}} = e
      if (!this._controlled) {
        this.setData({value})
      }
      const _display = this._Value2Display(value)
      this._InputBlur({
        ...e,
        detail: {
          ...e.detail,
          value: _display,
        }
      })
      this.triggerEvent('change', e.detail)
    },
    _InputBlur(e) {
      if (!this._muiSelectInput) {
        const _muiSelectInput = this.selectComponent('._mui-select-input')
        this._muiSelectInput = _muiSelectInput
      }
      if (this._muiSelectInput) {
        this._muiSelectInput._onBlur(e)
      }
      this.setData({_focus: false})
    },
    _InputFocus(e) {
      if (!this._muiSelectInput) {
        const _muiSelectInput = this.selectComponent('._mui-select-input')
        this._muiSelectInput = _muiSelectInput
      }
      if (this._muiSelectInput) {
        this._muiSelectInput._onFocus(e)
      }
      this.setData({_focus: true})
    },
    _ReRenderControlledProps(params) {
      if (!this._muiSelectInput) {
        const _muiSelectInput = this.selectComponent('._mui-select-input')
        this._muiSelectInput = _muiSelectInput
      }
      this._muiSelectInput._ReRenderControlledProps(params)
    },
    _Value2Display(val) {
      const {
        range,
        rangeKey
      } = this.data
      let _display = ''
      let isValid = false
      if (Array.isArray(val)) {
        isValid = val.every(item => (typeof item === 'string'))
      } else if (typeof val === 'string' || typeof val === 'number') {
        isValid = true
      }
      if (isValid) {
        if (Array.isArray(range)) {
          if (Array.isArray(val)) {
            _display = val.map((item, i) => {
              const index = Number(item)
              return (rangeKey ? range[i][index][rangeKey] : range[i][index])
            }).join(' ')
          } else if (!(val === null || typeof val === 'undefined' || val === '')) {
            const index = Number(val)
            _display = rangeKey ? range[index][rangeKey] : range[index]
          }
        } else if (Array.isArray(val)) {
          _display = val.join(' ')
        } else {
          _display = val
        }
      }
      return _display
    },
  },
  observers: {
    value(val) {
      if (!this._hasAttached) {
        this._controlled = true
      }
      const _display = this._Value2Display(val)
      this.setData({
        _display
      })
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
