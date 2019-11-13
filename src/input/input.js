Component({
  properties: {
    mStyle: String,
    mClass: String,
    color: {
      type: String,
      value: 'primary',
    },
    value: {
      type: String,
      value: '',
    },
    type: {
      type: String,
      value: 'text',
    },
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
      value: 16,
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
        placeholder
      } = this.properties
      const newData = {}
      if (!label) {
        newData.innerPlaceholder = placeholder
      }
      if (value) {
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
    _input(e) {
      const {value} = e.detail
      this.data.currentValue = value
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
      const {disabled, error} = this.properties
      const {currentValue} = this.data
      if (!disabled) {
        const newData = {}
        if (!error) {
          newData.innerFocus = false
        }
        newData.innerLabelShrink = currentValue.length > 0
        newData.innerPlaceholder = ''
        this.setData(newData)
      }
    },
  },
  relations: {
    '../typography/typography': {
      type: 'descendant',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
