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
  },
  data: {
    _focus: false,
  },
  methods: {
    _focus() {
      this.setData({_focus: true})
    },
    _blur() {
      this.setData({_focus: false})
    },
  },
})
