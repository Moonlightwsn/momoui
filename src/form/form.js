Component({
  data: {
    _targetList: [],
  },
  methods: {
    _reset() {
      const {_targetList} = this.data
      if (_targetList && _targetList.length > 0) {
        for (const item of _targetList) {
          if (item.reset && typeof item.reset === 'function') {
            item.reset()
          }
        }
      }
    }
  },
  relations: {
    '../button/button': {
      type: 'descendant',
    },
    '../input/input': {
      type: 'descendant',
      target: 'wx://form-field',
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
