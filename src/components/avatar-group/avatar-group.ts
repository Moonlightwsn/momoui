import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    max: {
      type: Number,
      value: 5,
    },
    spacing: {
      type: String,
      value: 'medium',
    },
  },
  data: {
    _pure_avatars: [],
    _more: 0,
    _moreStyle: '',
  },
  lifetimes: {
    ready() {
      console.log(this.data._more, this.data._moreStyle)
      this.setData({
        _more: this.data._more,
        _moreStyle: this.data._moreStyle,
      })
    }
  },
  relations: {
    '../avatar/avatar': {
      type: 'child',
      linked(target) {
        if (target) {
          const {
            max,
            spacing,
            _pure_avatars: avatars,
          } = this.data
          avatars.push(target)
          const targetStyles: any = {'z-index': 0, 'margin-left': '-8px'}
          const targetIndex = avatars.length
          if (targetIndex === 1) {
            targetStyles['margin-left'] = '0'
          } else if (!Number.isNaN(Number(spacing))) {
            targetStyles['margin-left'] = `-${spacing}px`
          } else if (spacing === 'small') {
            targetStyles['margin-left'] = '-16px'
          }

          if (targetIndex > max) {
            this.data._more += 1
            if (!this.data._moreStyle) {
              this.data._moreStyle = `z-index: 0;margin-left: ${targetStyles['margin-left']};`
            }
            targetStyles.display = 'none'
          } else {
            targetStyles['z-index'] = max - targetIndex + 1
          }
          target._groupControlAction(targetStyles)
        }
      },
    }
  },
  options: {
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
