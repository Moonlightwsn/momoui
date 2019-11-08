import rippleBehaviors from '../ripple/behaviors'

Component({
  behaviors: [rippleBehaviors],
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    size: {
      type: Number,
      value: 24,
    },
    checked: {
      type: Boolean,
      value: false,
    }
  },
  data: {
    // iconName: 'square'
    centerripple: true,
  },
  lifetimes: {
    attached() {
      /*
      if (this.properties.checked) {
        this.setData({
          iconName: 'square-check'
        })
      }
      */
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
