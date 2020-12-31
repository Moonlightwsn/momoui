import muiBase from '../../behaviors/muiBase.ts'

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
  relations: {
    '../form-control-label/form-control-label': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'form-control-label')
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
    }
  },
  methods: {
    _Linked(target, type) {
      if (target) {
        if (!this._formItems) {
          this._formItems = []
        }
        if (type === 'input-label' && !this._hasInputLabel) {
          this._hasInputLabel = true
        }
        if (type === 'input' && this._hasInputLabel) {
          target._SetInputLabel()
        }
        this._formItems.push({target, type})
      }
    },
    _ControlFormItem(method: string, formItemTypes: string[], params: any) {
      const formItemTypesMap = {}
      formItemTypes.forEach(type => {
        formItemTypesMap[type] = true
      })
      this._formItems.filter(item => formItemTypesMap[item.type]).forEach(item => {
        if (item.target[method] && typeof item.target[method] === 'function') {
          item.target[method](params)
        }
      })
    },
    _onBlur() {
      this._ControlFormItem('_onBlur', ['form-label'], {focus: false})
    },
    _onFocus() {
      this._ControlFormItem('_onFocus', ['form-label'], {focus: true})
    },
    _SetInputLabelShrink(shrink) {
      this._ControlFormItem('_SetShrink', ['input-label'], {shrink})
    },
    _TouchStart() {
      this._onFocus()
    },
  },
  observers: {
    'color, disabled, error, focus, fullWidth, margin, required, size, variant': function () {
      if (this._formItems) {
        this._formItems.forEach(item => {
          item.target._ReRenderControlledProps()
        })
      }
    }
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
