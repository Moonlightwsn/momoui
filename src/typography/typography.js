Component({
  properties: {
    mClass: String,
    mStyle: String,
    variant: {
      type: String,
      value: 'body1',
    },
    color: {
      type: String,
      value: 'inherit',
    },
    display: {
      type: String,
      value: 'block',
    }
  },
  relations: {
    '../input/input': {
      type: 'ancestor',
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
