Component({
  behaviors: ['wx://form-field'],
  properties: {
    value: Array,
  },
  data: {
    targetList: [],
  },
  methods: {
    checkedChange() {
      const vals = []
      this.data.targetList.forEach(item => {
        if (item.data.checked && item.data.value) {
          vals.push(item.data.value)
        }
      })
      this.triggerEvent('change', {value: vals})
      this.setData({value: vals})
    },
  },
  relations: {
    '../checkbox/checkbox': {
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
  options: {
    styleIsolation: 'shared',
  },
})
