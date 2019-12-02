Component({
  behaviors: ['wx://form-field'],
  properties: {
    value: Array,
  },
  data: {
    _targetList: [],
  },
  methods: {
    checkedChange(checkedItem) {
      let vals = []
      this.data._targetList.forEach(item => {
        if (item === checkedItem) {
          vals = [checkedItem.data.value]
        } else {
          item.uncheck()
        }
      })
      this.triggerEvent('change', {value: vals})
      this.setData({value: vals})
    },
  },
  relations: {
    '../radio/radio': {
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
    styleIsolation: 'shared',
  },
})
