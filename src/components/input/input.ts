import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'

Component({
  behaviors: [muiBase, muiController, 'wx://form-field'],
  properties: {
    adjustPosition: {
      type: Boolean,
      value: true,
    },
    alwaysEmbed: {
      type: Boolean,
      value: false,
    },
    color: {
      type: String,
      value: 'primary',
    },
    cursor: {
      type: Number,
      value: null,
    },
    cursorSpacing: {
      type: Number,
      value: 0,
    },
    confirmType: {
      type: String,
      value: 'done',
    },
    confirmHold: {
      type: Boolean,
      value: false,
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
    fullWidth: {
      type: Boolean,
      value: true,
    },
    fixed: {
      type: Boolean,
      value: false,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    holdKeyboard: {
      type: Boolean,
      value: false,
    },
    inputDisabled: {
      type: Boolean,
      value: false,
    },
    inputChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    inputFocus: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    inputBlur: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    inputConfirm: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    lineChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    inputKeyboardHeightChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    margin: {
      type: String,
      value: 'none',
    },
    multiline: {
      type: Boolean,
      value: false,
    },
    maxlength: {
      type: Number,
      value: 140,
    },
    name: {
      type: String,
      value: '',
    },
    password: {
      type: Boolean,
      value: false,
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
    readOnly: {
      type: Boolean,
      value: false,
    },
    rows: {
      type: Number,
      value: 1,
    },
    required: {
      type: Boolean,
      value: false,
    },
    selectionStart: {
      type: Number,
      value: -1,
    },
    selectionEnd: {
      type: Number,
      value: -1,
    },
    showConfirmBar: {
      type: Boolean,
      value: true,
    },
    type: {
      type: String,
      value: 'text',
    },
    value: {
      type: String,
      value: '',
    },
    variant: {
      type: String,
      value: 'standard',
    },
  },
  data: {
    _focus: false,
    _textAutoHeight: true,
    _textareaHeight: 19,
    _formControl: false,
  },
  lifetimes: {
    attached() {
      const {rows} = this.properties
      this._adjustTextareaHeight(rows)
    },
  },
  relations: {
    '../form-control/form-control': {
      type: 'ancestor',
      linked(target) {
        this._formControlComp = target
        const {focus, value} = this.data
        this._formControlComp._onFocusOrBlur(focus, !!value)
      }
    }
  },
  methods: {
    _formControlAction(params) {
      this.setData(params)
    },
    _adjustTextareaHeight(rows) {
      if (rows > 1) {
        const query = this.createSelectorQuery()
        query.select('.mui-input').fields({
          computedStyle: ['height'],
        })
        query.exec(res => {
          const [view] = res || []
          let {height} = view || {}
          if (height && height.slice(-2) === 'px') {
            height = Number(height.slice(0, -2))
            if (!Number.isNaN(height)) {
              this.setData({
                _textareaHeight: height * rows,
                _textAutoHeight: false,
              })
            }
          }
        })
      }
    },
    _onFocus(e) {
      this.setData({_focus: true})
      if (this._formControlComp) {
        this._formControlComp._onFocusOrBlur(true, true)
      }
      const {inputFocus} = this.data
      if (inputFocus && typeof inputFocus === 'function') {
        inputFocus(e)
      }
    },
    _onBlur(e) {
      this.setData({_focus: false})
      if (this._formControlComp) {
        this._formControlComp._onFocusOrBlur(false, !!this.data.value)
      }
      const {inputBlur} = this.data
      if (inputBlur && typeof inputBlur === 'function') {
        inputBlur(e)
      }
    },
    _onChange(e) {
      const {inputChange} = this.data
      if (inputChange && typeof inputChange === 'function') {
        const {value, cursor, keyCode} = e.detail || {}
        inputChange(value, cursor, keyCode)
      }
    },
    _onConfirm(e) {
      const {inputConfirm} = this.data
      if (inputConfirm && typeof inputConfirm === 'function') {
        inputConfirm(e)
      }
    },
    _onKeyboardHeightChange(e) {
      const {inputKeyboardHeightChange} = this.data
      if (inputKeyboardHeightChange && typeof inputKeyboardHeightChange === 'function') {
        inputKeyboardHeightChange(e)
      }
    },
    _lineChange(e) {
      const {lineChange} = this.data
      if (lineChange && typeof lineChange === 'function') {
        lineChange(e)
      }
    }
  },
  observers: {
    rows(rows) {
      this._adjustTextareaHeight(rows)
    }
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  }
})
