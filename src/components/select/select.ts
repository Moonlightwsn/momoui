import muiBase from '../../behaviors/muiBase.ts'
import {ObserversForControlledPropsByAncestor} from '../../common/utils.ts'

const controlledProps: string[] = [
  'color',
  'disabled',
  'error',
  'fullWidth',
  'margin',
  'size',
  'variant',
]

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
    rangeIndex: {
      type: String,
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
    _value: null,
  },
  lifetimes: {
    attached() {
      this._hasAttached = true
      if (!this._controlled) {
        const {mode, value} = this.data
        if (mode === 'region' && !Array.isArray(value)) {
          this.setData({value: []})
        }
      }
    }
  },
  relations: {
    '../form-control/form-control': {
      type: 'ancestor',
      linked(target) {
        this._GetSelectInput()._Linked(target)
        if (target) {
          this._formControlComp = target
        }
      },
      unlinked() {
        this._GetSelectInput()._UnLinked()
      }
    },
    '../input-adornment/input-adornment': {
      type: 'descendant',
      linked(target) {
        this._GetSelectInput()._LinkedAdornment(target)
      },
      unlinked() {
        this._GetSelectInput()._UnLinkedAdornment()
      },
    }
  },
  methods: {
    _Cancel(e) {
      const {_display} = this.data
      this._InputBlur({
        detail: {
          value: _display,
        }
      })
      this.triggerEvent('cancel', e.detail)
    },
    _Change(e) {
      const {detail: {value}} = e
      const {range, rangeIndex, rangeKey} = this.data
      if (range && Array.isArray(range) && rangeIndex && rangeKey) {
        const rangeItem = range[Number(value)]
        if (typeof rangeItem === 'object') {
          e.detail.value = rangeItem[rangeIndex]
        }
        if (!this._controlled) {
          this.setData({value: e.detail.value})
        }
      } else if (!this._controlled) {
        this.setData({value})
      }
      this.triggerEvent('change', e.detail)
    },
    _ColumnChange(e) {
      this.triggerEvent('columnchange', e.detail)
    },
    _InputBlur(e) {
      this._GetSelectInput()._onBlur(e)
      this.setData({_focus: false})
    },
    _InputFocus(e) {
      const {disabled} = this.data
      if (!disabled) {
        this._GetSelectInput()._onFocus(e)
        this.setData({_focus: true})
      }
    },
    _GetSelectInput() {
      if (!this._muiSelectInput) {
        this._muiSelectInput = this.selectComponent('._mui-select-input')
      }
      return this._muiSelectInput
    },
    _ReRenderControlledProps(hasInputLabel) {
      const target = this._formControlComp
      if (target && Array.isArray(controlledProps)) {
        const newData: any = {}
        controlledProps.forEach(item => {
          if (!this._propIsSet || !this._propIsSet[item]) {
            newData[item] = target.data[item]
          }
        })
        if (Object.keys(newData).length > 0) {
          this.setData(newData)
        }
      }
      this._GetSelectInput()._SetInputLabel(hasInputLabel)
    },
    _Value2Display(val) {
      const {
        range,
        rangeIndex,
        rangeKey
      } = this.data
      let _display = ''
      let _index
      let isValid = false
      if (Array.isArray(val)) {
        isValid = val.every(item => (typeof item === 'string' || typeof item === 'number'))
      } else if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
        isValid = true
      }
      if (isValid) {
        if (Array.isArray(range)) {
          if (Array.isArray(val)) {
            _index = []
            _display = val.map((valItem, i) => {
              if (rangeIndex && rangeKey) {
                let displayItem = ''
                range.some((rangeItem, index) => {
                  if (typeof rangeItem === 'object' && valItem === rangeItem[rangeIndex]) {
                    _index.push(index)
                    displayItem = rangeItem[rangeKey]
                    return true
                  }
                  return false
                })
                return displayItem
              } else {
                const index = Number(valItem)
                _index.push(index)
                return ((rangeKey && typeof range[i][index] === 'object') ? range[i][index][rangeKey] : range[i][index])
              }
            }).join(' ')
          } else if (!(val === null || typeof val === 'undefined' || val === '')) {
            if (rangeIndex && rangeKey) {
              range.some((rangeItem, index) => {
                if (typeof rangeItem === 'object' && val === rangeItem[rangeIndex]) {
                  _index = index
                  _display = rangeItem[rangeKey]
                  return true
                }
                return false
              })
            } else {
              const index = Number(val)
              _display = (rangeKey && typeof range[index] === 'object') ? range[index][rangeKey] : range[index]
            }
          }
        } else if (Array.isArray(val)) {
          _display = val.join(' ')
        } else {
          _display = val
        }
      }
      return {_display, _index}
    },
  },
  observers: {
    value(val) {
      let _value = val
      const {mode, value} = this.data
      if (!this._hasAttached) {
        this._controlled = true
        if (mode === 'region' && !Array.isArray(value)) {
          _value = []
        }
      }
      const {_display, _index} = this._Value2Display(_value)
      this._InputBlur({
        detail: {
          value: _display,
        }
      })
      if (!(typeof _index === 'undefined')) {
        _value = _index
      }
      this.setData({
        _display,
        _value,
      })
    },
    ...ObserversForControlledPropsByAncestor(controlledProps),
  },
  options: {
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
