Component({
  relations: {
    '../radio/radio': {
      type: 'descendant',
      linked(target) {
        console.log(target)
      },
      unlinked(target) {
        console.log(target)
      },
    },
  },
})
