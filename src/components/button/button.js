import rippleBehaviors from '../ripple/behaviors'

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
  methods: {
  }
})
