Component({
  properties: {
    mStyle: String,
    mClass: String,
    open: {
      type: Boolean,
      value: false,
    },
    message: {
      type: String,
      value: '',
    },
    duration: {
      type: Number,
      value: 0,
    },
    placeholder: {
      type: String,
      value: 'top-center',
    },
  },
  data: {
  },
  methods: {
    close() {
      this.setData({open: false})
    },
  },
  options: {
    pureDataPattern: /^_/,
    styleIsolation: 'shared',
  },
})
