Component({
  properties: {
    header: String,
  },
  relations: {
    '../list-item/list-item': {
      type: 'child',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
