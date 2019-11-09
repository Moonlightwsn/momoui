Component({
  properties: {
    mClass: String,
    mStyle: String,
  },
  relations: {
    '../card-header/card-header': {
      type: 'descendant',
    },
    '../card-action-area/card-action-area': {
      type: 'descendant',
    },
    '../card-media/card-media': {
      type: 'descendant',
    },
    '../card-content/card-content': {
      type: 'descendant',
    },
    '../card-action/card-action': {
      type: 'descendant',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
