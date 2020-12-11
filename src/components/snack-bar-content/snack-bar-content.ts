import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    message: {
      type: String,
      value: null,
    },
    transitionDuration: {
      type: Number,
      value: 225,
    },
  },
  data: {
    _transitionStyle: 'transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
  },
  relations: {
    '../snack-bar/snack-bar': {
      type: 'parent',
      linked(target) {
        if (target) {
          const {transitionDuration} = target.data
          this.setData({transitionDuration})
        }
      }
    },
  },
  observers: {
    transitionDuration(duration) {
      this.setData({
        _transitionStyle: `transition: opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform ${duration * 0.66666667}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;`
      })
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
