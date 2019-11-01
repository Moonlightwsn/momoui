import rippleBehaviors from '../ripple/behaviors'

Component({
  behaviors: [rippleBehaviors],
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    mstyle: String,
    icon: String,
  },
  relations: {
    '../list/list': {
      type: 'parent',
    },
  },
  options: {
    styleIsolation: 'shared',
    multipleSlots: true,
  },
})
