Component({
  properties: {
    mStyle: String,
    mClass: String,
    menuItems: {
      type: Array,
      value: [],
    }
  },
  options: {
    styleIsolation: 'shared',
  },
})
