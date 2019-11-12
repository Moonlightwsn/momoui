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
  },
  data: {
    _focus: false,
  },
  methods: {
    _focus() {
      const {disabled, error} = this.properties
      if (!disabled && !error) {
        this.setData({_focus: true})
      }
    },
    _blur() {
      const {disabled, error} = this.properties
      if (!disabled && !error) {
        this.setData({_focus: false})
      }
    },
  },
})
