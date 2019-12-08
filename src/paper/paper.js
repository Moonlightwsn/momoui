Component({
  properties: {
    mStyle: String,
    mClass: String,
    square: {
      type: Boolean,
      value: false,
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
