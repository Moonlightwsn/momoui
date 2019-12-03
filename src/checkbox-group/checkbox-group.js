Component({
  behaviors: ['wx://form-field'],
  properties: {
    value: Array,
  },
  data: {
    _targetList: [],
  },
  methods: {
    checkedChange() {
      const vals = []
      this.data._targetList.forEach(item => {
        if (item.data.checked && item.data.value) {
          vals.push(item.data.value)
        }
      })
      this.triggerEvent('change', {value: vals})
      this.setData({value: vals})
    },
    reset() {
      const {_targetList} = this.data
      if (_targetList && _targetList.length > 0) {
        for (const item of _targetList) {
          if (item._checkControol && typeof item._checkControol === 'function') {
            item._checkControol(false)
          }
        }
      }
    },
  },
  relations: {
    '../checkbox/checkbox': {
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
    '../form/form': {
      type: 'ancestor',
    },
  },
  options: {
    pureDataPattern: /^_/,
    styleIsolation: 'shared',
  },
})
