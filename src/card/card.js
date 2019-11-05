Component({
  properties: {
    mStyle: String,
  },
  relations: {
    '../card-content/card-content': {
      type: 'child',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
