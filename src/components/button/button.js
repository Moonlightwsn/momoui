import rippleBehaviors from '../ripple/behaviors'

Component({
  behaviors: [rippleBehaviors],
  properties: {
    type: {
      type: String,
      value: 'default',
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
