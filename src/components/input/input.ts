import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import {ObserversForControlledPropsByAncestor} from '../../common/utils.ts'

const controlledProps: string[] = [
  'color',
  'disabled',
  'error',
  'focus',
  'margin',
  'variant',
]

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
    rowsMax: {
      type: Number,
      value: 0,
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
    _textareaHeight: 0,
    _hasInputLabel: false,
    _inputLabelShrink: false,
  },
  lifetimes: {
    attached() {
      this._hasAttached = true
    },
  },
  relations: {
    '../form-control/form-control': {
      type: 'ancestor',
      linked(target) {
        this._Linked(target)
      },
      unlinked() {
        this._formControlComp = undefined
      },
    }
  },
  methods: {
    _AdjustTextareaHeight(height, autoHeight) {
      if (!this._initTextareaHeigth) {
        this._initTextareaHeigth = true
      }
      this.setData({
        _textareaHeight: height,
        _textAutoHeight: autoHeight,
      })
    },
    _onFocus(e) {
      this.setData({_focus: true})
      if (this._formControlComp) {
        const shrink = true
        this.setData({_inputLabelShrink: shrink})
        this._formControlComp._ControlFormItem('_onFocus', ['input-label'], {shrink})
      }
      const {inputFocus} = this.data
      if (inputFocus && typeof inputFocus === 'function') {
        inputFocus(e)
      }
    },
    _onBlur(e) {
      this.setData({_focus: false})
      if (this._formControlComp) {
        const shrink = !!e.detail.value
        this.setData({_inputLabelShrink: shrink})
        this._formControlComp._ControlFormItem('_onBlur', ['input-label'], {shrink})
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
        inputChange(value, cursor, keyCode, e)
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
    _LineChange(e) {
      const {lineChange, rowsMax, rows} = this.data
      const {detail: {height = 0, lineHeight = 0, lineCount = 0} = {}} = e || {}
      let textareaHeight = height
      let autoHeight = true
      this._lineHeight = lineHeight
      this._hasChangedLine = true
      if (!this._initTextareaHeigth && this._hasObserverdRows) {
        if (rows > 1) {
          autoHeight = false
          textareaHeight = (rows * this._lineHeight)
          this._AdjustTextareaHeight(textareaHeight, autoHeight)
        }
      }
      if (rows <= 1 && rowsMax > 0) {
        if ((lineCount + 1) >= rowsMax) {
          autoHeight = false
          textareaHeight = rowsMax * this._lineHeight
        }
        this._AdjustTextareaHeight(textareaHeight, autoHeight)
      }
      if (lineChange && typeof lineChange === 'function') {
        lineChange(e)
      }
    },
    _Linked(target) {
      if (target) {
        this._formControlComp = target
        const shrink = !!this.data.value
        this.setData({_inputLabelShrink: shrink})
        this._formControlComp._SetInputLabelShrink(shrink)
      }
    },
    _ReRenderControlledProps(hasInputLabel) {
      const target = this._formControlComp
      if (target && Array.isArray(controlledProps)) {
        const newData: any = {}
        if (typeof hasInputLabel !== 'undefined') {
          newData._hasInputLabel = hasInputLabel
        }
        controlledProps.forEach(item => {
          if (!this._propIsSet || !this._propIsSet[item]) {
            newData[item] = target.data[item]
          }
        })
        if (Object.keys(newData).length > 0) {
          this.setData(newData)
        }
      }
    },
    _SetInputLabel(hasInputLabel) {
      this.setData({_hasInputLabel: hasInputLabel})
    }
  },
  observers: {
    rows(rows) {
      this._hasObserverdRows = true
      if (this._initTextareaHeigth || this._hasChangedLine) {
        if (rows > 1) {
          this._AdjustTextareaHeight((this._lineHeight * rows), true)
        } else {
          this._AdjustTextareaHeight(0, false)
        }
      }
    },
    ...ObserversForControlledPropsByAncestor(controlledProps),
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  }
})
