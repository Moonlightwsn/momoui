Component({
  properties: {
    avatar: String,
    avatarText: String,
    avatarSrc: String,
    avatarColor: String,
    avatarBackgroundColor: String,
    action: String,
    actionColor: {
      type: String,
      value: 'rgba(0, 0, 0, 0.54)',
    },
    actionBackgroundColor: String,
    title: String,
    subheader: String,
  },
  relations: {
    '../card/card': {
      type: 'parent',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
