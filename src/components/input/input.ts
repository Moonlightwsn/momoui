import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import {ObserversForControlledPropsByAncestor} from '../../common/utils.ts'

const controlledProps: string[] = [
  'color',
  'disabled',
  'error',
  'fullWidth',
  'focus',
  'margin',
  'size',
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
      value: 24,
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
    size: {
      type: String,
      value: 'medium',
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
        this._UnLinked()
      },
    },
    '../input-adornment/input-adornment': {
      type: 'descendant',
      linked(target) {
        this._LinkedAdornment(target)
      },
      unlinked() {
        this._UnLinkedAdornment()
      }
    },
  },
  methods: {
    _AdjustTextareaHeight(rows, rowsMax) {
      const {multiline} = this.data
      if (multiline) {
        this._hasInitTextareaHeight = true
        if ((rows > 1 || rowsMax > 0)) {
          const query = this.createSelectorQuery()
          query.select('.mui-input').fields({
            computedStyle: ['line-height'],
          })
          query.exec(res => {
            const [view] = res || []
            let lineHeight = view['line-height']
            if (lineHeight && lineHeight.slice(-2) === 'px') {
              lineHeight = Number(lineHeight.slice(0, -2))
              if (!Number.isNaN(lineHeight)) {
                this.data._pureLineHeight = lineHeight
                this._CalcTextareaHeight(rows, rowsMax)
              }
            }
          })
        } else {
          this._CalcTextareaHeight(rows, rowsMax)
        }
      }
    },
    _CalcTextareaHeight(rows, rowsMax) {
      let _textAutoHeight = true
      let _textareaHeight = 0
      if (rows > 1) {
        _textareaHeight = this.data._pureLineHeight * rows
        _textAutoHeight = false
      } else if (rowsMax > 0 && (this.data._pureLineCount || 0) >= rowsMax) {
        _textareaHeight = this.data._pureLineHeight * rowsMax
        _textAutoHeight = false
      }
      this.setData({
        _textareaHeight,
        _textAutoHeight,
      })
    },
    _onFocus(e) {
      this.setData({_focus: true})
      if (this._formControlComp) {
        const shrink = true
        this._SetInputLabelShrink(shrink)
        this._formControlComp._ControlFormItem('_onFocus', ['input-label'], {})
      }
      const {inputFocus} = this.data
      if (inputFocus && typeof inputFocus === 'function') {
        inputFocus(e, this.dataset)
      }
    },
    _onBlur(e) {
      this.setData({_focus: false})
      if (this._formControlComp) {
        const shrink = !!e.detail.value
        this._SetInputLabelShrink(shrink)
        this._formControlComp._ControlFormItem('_onBlur', ['input-label'], {})
      }
      const {inputBlur} = this.data
      if (inputBlur && typeof inputBlur === 'function') {
        inputBlur(e, this.dataset)
      }
    },
    _onChange(e) {
      const {inputChange} = this.data
      if (inputChange && typeof inputChange === 'function') {
        const {value, cursor, keyCode} = e.detail || {}
        inputChange(value, cursor, keyCode, e, this.dataset)
      }
    },
    _onConfirm(e) {
      const {inputConfirm} = this.data
      if (inputConfirm && typeof inputConfirm === 'function') {
        inputConfirm(e, this.dataset)
      }
    },
    _onKeyboardHeightChange(e) {
      const {inputKeyboardHeightChange} = this.data
      if (inputKeyboardHeightChange && typeof inputKeyboardHeightChange === 'function') {
        inputKeyboardHeightChange(e, this.dataset)
      }
    },
    _LineChange(e) {
      const {
        lineChange,
        rows,
        rowsMax,
        multiline
      } = this.data
      if (multiline) {
        const {detail: {lineHeight = 0, lineCount = 0} = {}} = e || {}
        this.data._pureLineHeight = lineHeight
        this.data._pureLineCount = lineCount
        this._hasChangedLine = true
        if (this._hasObserverdRows) {
          if (rows <= 1 || !this._hasInitTextareaHeight) {
            this._AdjustTextareaHeight(rows, rowsMax)
          }
        }
      }
      if (lineChange && typeof lineChange === 'function') {
        lineChange(e, this.dataset)
      }
    },
    _Linked(target) {
      if (target) {
        this._formControlComp = target
        const shrink = !!this.data.value
        this._SetInputLabelShrink(shrink)
      }
    },
    _UnLinked() {
      this._formControlComp = undefined
    },
    _LinkedAdornment(target) {
      this._permanentShrink = undefined
      this._hasLinkedToInputAdornment = true
      if (target) {
        const {position} = target.data
        if (position === 'start') {
          this._permanentShrink = true
          const shrink = !!this.data.value
          this._SetInputLabelShrink(shrink)
        }
      }
    },
    _UnLinkedAdornment() {
      this._permanentShrink = undefined
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
    },
    _SetInputLabelShrink(shrink) {
      if (this._formControlComp) {
        const _shrink = this._permanentShrink || shrink
        this.setData({_inputLabelShrink: _shrink})
        this._formControlComp._SetInputLabelShrink(_shrink)
      }
    },
  },
  observers: {
    'rows, rowsMax': function (rows, rowsMax) {
      this._hasObserverdRows = true
      if (this._hasChangedLine) {
        this._AdjustTextareaHeight(rows, rowsMax)
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
