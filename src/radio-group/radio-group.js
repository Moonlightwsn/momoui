Component({
  data: {
    targetList: [],
  },
  methods: {
    checkedChange(checkedItem) {
      let vals = []
      this.data.targetList.forEach(item => {
        if (item === checkedItem) {
          vals = [checkedItem.data.value]
        } else {
          item.uncheck()
        }
      })
      this.triggerEvent('change', {value: vals})
    },
  },
  relations: {
    '../radio/radio': {
      type: 'descendant',
      linked(target) {
        this.data.targetList.push(target)
      },
      unlinked(target) {
        let index = -1
        this.data.targetList.forEach((item, idx) => {
          if (item === target) {
            index = idx
          }
        })
        this.data.targetList.splice(index, 1)
      },
    },
  },
})
