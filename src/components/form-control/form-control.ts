import muiBase from '../../behaviors/muiBase.ts'
import {debounce} from '../../common/utils.ts'

Component({
  behaviors: [muiBase],
  properties: {
    color: {
      type: String,
      value: 'primary',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    error: {
      type: Boolean,
      value: false,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    fullWidth: {
      type: Boolean,
      value: false,
    },
    hiddenLable: {
      type: Boolean,
      value: false,
    },
    margin: {
      type: String,
      value: 'none',
    },
    required: {
      type: Boolean,
      value: false,
    },
    size: {
      type: String,
      value: 'medium',
    },
    variant: {
      type: String,
      value: 'standard',
    },
  },
  data: {
    _pureFormItems: [],
  },
  lifetimes: {
    created() {
      if (!this._ArrangeFormItems) {
        this._ArrangeFormItems = debounce(() => {
          const newFormItems = this.data._pureFormItems
          if (newFormItems.length > 0) {
            const _hasInputLabel = newFormItems.some(item => item.type === 'input-label')
            newFormItems.forEach(item => {
              if (item.type === 'input' || item.type === 'select') {
                item.target._ReRenderControlledProps(_hasInputLabel)
              } else {
                item.target._ReRenderControlledProps()
              }
            })
          }
        }, 50)
      }
    },
  },
  relations: {
    '../form-control-label/form-control-label': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'form-control-label')
      },
    },
    '../form-helper-text/form-helper-text': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'form-helper-text')
      },
    },
    '../form-label/form-label': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'form-label')
      },
    },
    '../input-label/input-label': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'input-label')
      },
    },
    '../input/input': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'input')
      },
    },
    '../select/select': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'select')
      },
    },
  },
  methods: {
    _Linked(target, type) {
      if (target) {
        this.data._pureFormItems.push({
          target,
          type,
        })
        this.setData({_pureFormItems: this.data._pureFormItems})
      }
    },
    _ControlFormItem(method: string, formItemTypes: string[], params: any) {
      const formItemTypesMap = {}
      formItemTypes.forEach(type => {
        formItemTypesMap[type] = true
      })
      this.data._pureFormItems.filter(item => formItemTypesMap[item.type]).forEach(item => {
        if (item.target[method] && typeof item.target[method] === 'function') {
          item.target[method](params)
        }
      })
    },
    _onBlur() {
      this.setData({focus: false})
      // this._ControlFormItem('_onBlur', ['form-label'], {focus: false})
    },
    _onFocus() {
      this.setData({focus: true})
      // this._ControlFormItem('_onFocus', ['form-label'], {focus: true})
    },
    _SetInputLabelShrink(shrink) {
      this._ControlFormItem('_SetShrink', ['input-label'], {shrink})
    },
    _TouchStart() {
      // this._onFocus()
    },
  },
  observers: {
    'color, disabled, error, focus, fullWidth, margin, required, size, variant, _pureFormItems': function () {
      if (this._ArrangeFormItems) {
        this._ArrangeFormItems()
      }
    }
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
