Component({
  properties: {
    type: {
      type: String,
      value: 'circle',
    },
    variant: {
      type: String,
      value: 'indeterminate',
    },
    color: {
      type: String,
      value: 'primary',
    },
    size: {
      type: Number,
      value: 40,
    }
  },
  options: {
    styleIsolation: 'shared',
  },
})
