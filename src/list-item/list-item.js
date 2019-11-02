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
    iconSize: {
      type: Number,
      value: 24,
    },
    iconColor: String,
    avatar: String,
    avatarSize: {
      type: Number,
      value: 40,
    },
    avatarColor: {
      type: String,
      value: '#ffffff',
    },
    avatarBackground: {
      type: String,
      value: '#bdbdbd',
    },
    avatarSrc: String,
    primaryText: String,
    secondaryText: String,
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
