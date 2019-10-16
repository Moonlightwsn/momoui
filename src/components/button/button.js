Component({
  properties: {
    type: {
      type: String,
      value: 'default',
    },
    style: {
      type: String,
    },
  },
  data: {
    typeMap: {
      default: '',
      primary: 'mui-button-primary',
    }
  },
  methods: {
    buttonTap() {
      this.triggerEvent('onclick', {})
    }
  }
})
