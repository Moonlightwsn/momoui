Component({
  properties: {
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
