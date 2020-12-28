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
    '../form-label/form-label': {
      type: 'descendant',
      linked(target) {
        this._linked(target, 'form-label')
      },
    },
    '../input-label/input-label': {
      type: 'descendant',
      linked(target) {
        this._linked(target, 'input-label')
      },
    },
    '../input/input': {
      type: 'descendant',
      linked(target) {
        this._linked(target, 'input')
      },
    }
  },
  methods: {
    _linked(target, type) {
      if (target) {
        if (!this._formItems) {
          this._formItems = []
        }
        this._formItems.push({target, type})
        /*
        const {
          color,
          disabled,
          error,
          focus,
          fullWidth,
          margin,
          required,
          size,
          variant,
        } = this.data
        const params: any = {
          _formControl: true,
          color,
          disabled,
          error,
          focus,
          fullWidth,
          margin,
          required,
          size,
          variant,
        }
        if (type === 'input' && variant === 'outlined') {
          params.disableUnderline = true
        }
        this._ControlFormItem(params, target)
        */
      }
    },
    /*
    _onFocusOrBlur(focus, shrink) {
      this._formItems.filter(item => item.type === 'input-label').forEach(item => {
        item.target._formControlAction({
          focus,
          shrink,
        })
      })
    },
    _ControlFormItem(parmas, target) {
      if (target._formControlAction && typeof target._formControlAction === 'function') {
        target._formControlAction(parmas)
      }
    },
    */
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
    _TouchStart() {
      this._onFocus()
    },
  },
  observers: {
    'color, disabled, error, focus, fullWidth, margin, required, size, variant': function (/* color, disabled, error, focus, fullWidth, margin, required, size, variant */) {
      console.log(3)
      if (this._formItems) {
        this._formItems.forEach(item => {
          item.target._ReRenderControlledProps()
        })
      }
      /*
      const params: any = {
        color,
        disabled,
        error,
        focus,
        fullWidth,
        margin,
        required,
        size,
        variant,
      }
      if (this._formItems) {
        this._formItems.forEach(item => {
          if (item.type === 'input' && variant === 'outlined') {
            params.disableUnderline = true
          }
          item.target._formControlAction(params)
        })
      }
      */
    }
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
