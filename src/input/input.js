Component({
  behaviors: ['wx://form-field'],
  properties: {
    mStyle: String,
    mClass: String,
    color: {
      type: String,
      value: 'primary',
    },
    type: {
      type: String,
      value: 'text',
    },
    value: String,
    confirmType: {
      type: String,
      value: 'done',
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
    disabled: {
      type: Boolean,
      value: false,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    cursorSpacing: {
      type: Number,
      value: 72,
    },
    error: {
      type: Boolean,
      value: false,
    },
    label: String,
    fullWidth: {
      type: Boolean,
      value: false,
    },
    help: String,
    filled: {
      type: Boolean,
      value: false,
    },
    startAdornment: String,
    startIconColor: {
      type: String,
      value: '#202020',
    },
    inherit: {
      type: Boolean,
      value: false,
    }
  },
  data: {
    innerFocus: false,
    innerPlaceholder: '',
    innerLabelShrink: false,
    currentValue: '',
  },
  lifetimes: {
    attached() {
      const {
        value,
        disabled,
        label,
        placeholder,
        startAdornment,
      } = this.properties
      const newData = {}
      if (!label) {
        newData.innerPlaceholder = placeholder
      }
      if (value || (startAdornment)) {
        this.data.currentValue = value
        newData.innerLabelShrink = true
      }
      if (disabled && value) {
        newData.innerPlaceholder = value
        newData.value = ''
      }
      this.setData(newData)
    },
  },
  methods: {
    reset() {
      this.setData({value: '', innerPlaceholder: '', innerLabelShrink: false})
    },
    _input(e) {
      const {value} = e.detail
      this.data.currentValue = value
      this.setData({value})
    },
    _focus() {
      const {
        disabled,
        error,
        placeholder
      } = this.properties
      if (!disabled) {
        const newData = {}
        if (!error) {
          newData.innerFocus = true
        }
        newData.innerLabelShrink = true
        newData.innerPlaceholder = (placeholder || '')
        this.setData(newData)
      }
    },
    _blur() {
      const {
        disabled,
        error,
        startAdornment,
        // placeholder
      } = this.properties
      const {currentValue} = this.data
      if (!disabled) {
        const newData = {}
        if (!error) {
          newData.innerFocus = false
        }
        newData.innerLabelShrink = currentValue || startAdornment
        newData.innerPlaceholder = currentValue || ''
        this.setData(newData)
      }
    },
  },
  relations: {
    '../typography/typography': {
      type: 'descendant',
    },
    '../form/form': {
      type: 'ancestor',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
