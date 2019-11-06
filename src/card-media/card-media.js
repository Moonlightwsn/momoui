Component({
  properties: {
    imageSrc: String,
    title: {
      type: String,
      value: 'img',
    }
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
