Component({
  properties: {
    mStyle: String,
    mClass: String,
    menuItems: {
      type: Array,
      value: [],
    },
    menuHeight: {
      type: String,
      value: 'auto',
    },
  },
  methods: {
    _buttonTap(e) {
      const {target: {dataset: {key = ''} = {}} = {}} = e
      this.triggerEvent('itemClick', {key}, {bubbles: true})
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
