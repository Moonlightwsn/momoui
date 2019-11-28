Component({
  properties: {
    actions: {
      type: Array,
      value: [],
    },
    color: {
      type: String,
      value: 'primary',
    },
  },
  lifetimes: {
    attached() {
      console.log(this.properties.actions)
    }
  },
  options: {
    styleIsolation: 'apply-shared',
  },
})
