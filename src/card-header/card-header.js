Component({
  properties: {
    avatar: String,
    action: String,
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
