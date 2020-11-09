import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'

Component({
  behaviors: [muiBase, muiController],
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
    fullWidth: {
      type: Boolean,
      value: false,
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
  },
  data: {
    _focus: false,
    _textAutoHeight: true,
    _textareaHeight: 19,
  },
  lifetimes: {
    attached() {
      const {rows} = this.properties
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
    }
  },
  methods: {
    _onFocus(e) {
      this.setData({_focus: true})
      const {inputFocus} = this.data
      if (inputFocus && typeof inputFocus === 'function') {
        inputFocus(e)
      }
    },
    _onBlur(e) {
      this.setData({_focus: false})
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
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
