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
    icon: String,
    iconSize: {
      type: Number,
      value: 24,
    },
    iconColor: {
      type: String,
      value: '#757575',
    },
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
    action: String,
    actionType: {
      type: String,
      value: 'default',
    },
    actionColor: String,
    /*
    actionColor: {
      type: String,
      value: '#757575',
    },
    */
  },
  data: {
    disabledListItemRipple: false,
  },
  lifetimes: {
    attached() {
      if (this.properties.action) {
        this.setData({
          disabledListItemRipple: true
        })
      }
    },
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
