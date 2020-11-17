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
        this._controlFormItem(params, target)
      }
    },
    _onFocusOrBlur(focus, shrink) {
      this._formItems.filter(item => item.type === 'input-label').forEach(item => {
        item.target._formControlAction({
          focus,
          shrink,
        })
      })
    },
    _controlFormItem(parmas, target) {
      target._formControlAction(parmas)
    },
  },
  observers: {
    'color, disabled, error, focus, fullWidth, margin, required, size, variant': function (color, disabled, error, focus, fullWidth, margin, required, size, variant) {
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
    }
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
