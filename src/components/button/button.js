import rippleBehaviors from '../ripple/behaviors'

const rippleBackgroundColorMap = {
  default: null,
  primary: '#1976d2',
  secondary: '#dc004e',
}

Component({
  behaviors: [rippleBehaviors],
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    color: {
      type: String,
      value: 'default',
    },
    size: {
      type: String,
      value: 'medium',
    },
    variant: {
      type: String,
      value: 'contained',
    },
  },
  data: {
    variantMap: {
      text: 'mui-button-text',
      contained: 'mui-button-contained',
      outlined: 'mui-button-outlined'
    },
    colorMap: {
      default: 'mui-button-default',
      primary: 'mui-button-primary',
      secondary: 'mui-button-secondary',
    },
    sizeMap: {
      medium: 'mui-button-medium',
      small: 'mui-button-small',
      large: 'mui-button-large',
    },
  },
  lifetimes: {
    attached() {
      if (this.properties.variant !== 'contained') {
        this.rippleBackgroundColor = rippleBackgroundColorMap[this.properties.color]
      }
    }
  },
  methods: {
  }
})
