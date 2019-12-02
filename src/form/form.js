Component({
  data: {
    _targetList: [],
  },
  methods: {
    _submit(e) {
      console.log('submit', e.detail.values)
    },
    _reset(e) {
      console.log('reset', e)
    }
  },
  relations: {
    '../button-group/button-group': {
      type: 'descendant',
    },
    '../button/button': {
      type: 'descendant',
    },
    '../input/input': {
      type: 'descendant',
      linked(target) {
        this.data._targetList.push(target)
      },
      unlinked(target) {
        let index = -1
        this.data._targetList.forEach((item, idx) => {
          if (item === target) {
            index = idx
          }
        })
        this.data._targetList.splice(index, 1)
      },
    },
  },
  options: {
    pureDataPattern: /^_/,
  },
})
