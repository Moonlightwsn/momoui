Component({
  properties: {
    color: {
      type: String,
      value: 'primary',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    error: {
      type: Boolean,
      value: false,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    fullWidth: {
      type: Boolean,
      value: false,
    },
    hiddenLable: {
      type: Boolean,
      value: false,
    },
    margin: {
      type: String,
      value: 'none',
    },
    required: {
      type: Boolean,
      value: false,
    },
    size: {
      type: String,
      value: 'medium',
    },
    variant: {
      type: String,
      value: 'standard',
    },
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
