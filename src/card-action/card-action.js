Component({
  relations: {
    '../card/card': {
      type: 'parent',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
