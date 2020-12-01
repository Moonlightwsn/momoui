Component({
  properties: {
    mode: {
      type: String,
      value: 'selector'
    },
    customItem: {
      type: String,
      value: null,
    },
    // @ts-ignore
    value: null,
  },
  lifetimes: {
    attached() {
      const {mode, value} = this.data
      if (mode === 'region' && !Array.isArray(value)) {
        this.setData({value: []})
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
