Component({
  properties: {
    mStyle: String,
  },
  relations: {
    '../card-header/card-header': {
      type: 'child',
    },
    '../card-media/card-media': {
      type: 'child',
    },
    '../card-content/card-content': {
      type: 'child',
    },
    '../card-action/card-action': {
      type: 'child',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
