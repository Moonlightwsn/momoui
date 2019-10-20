Component({
  properties: {
    color: {
      type: String,
      value: 'default',
    },
    variant: {
      type: String,
      value: 'contained',
    },
    size: {
      type: String,
      value: 'medium',
    },
  },
  data: {
    variantMap: {
      contained: 'mui-button-group-contained',
      outlined: 'mui-button-group-outlined'
    },
    colorMap: {
      default: 'mui-button-group-default',
      primary: 'mui-button-group-primary',
      secondary: 'mui-button-group-secondary',
    },
    sizeMap: {
      medium: 'mui-button-group-medium',
      small: 'mui-button-group-small',
      large: 'mui-button-group-large',
    },
  },
  options: {
    styleIsolation: 'shared'
  }
})
