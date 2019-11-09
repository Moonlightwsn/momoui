import rippleBehaviors from '../ripple/behaviors'

Component({
  behaviors: [rippleBehaviors],
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    mClass: String,
    mStyle: String,
  },
  relations: {
    '../card/card': {
      type: 'ancestor',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
