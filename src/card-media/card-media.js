Component({
  properties: {
    mStyle: String,
    mode: {
      type: String,
      value: 'widthFix',
    },
    imageSrc: String,
    title: {
      type: String,
      value: 'img',
    }
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
