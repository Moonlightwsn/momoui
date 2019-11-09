Component({
  relations: {
    '../card/card': {
      type: 'ancestor',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
