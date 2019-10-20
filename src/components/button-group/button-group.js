const rippleBackgroundColorMap = {
  default: null,
  primary: '#1976d2',
  secondary: '#dc004e',
}

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
  relations: {
    '../button/button': {
      type: 'child',
      linked(target) {
        if (this.properties.variant !== 'contained') {
          target.rippleBackgroundColor = rippleBackgroundColorMap[this.properties.color]
        }
      },
    },
  },
  options: {
    styleIsolation: 'shared'
  }
})
