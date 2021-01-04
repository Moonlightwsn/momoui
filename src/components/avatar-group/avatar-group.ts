import muiBase from '../../behaviors/muiBase.ts'
import {debounce} from '../../common/utils.ts'

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
    _pureAvatars: [],
    _more: 0,
    _moreStyle: '',
  },
  lifetimes: {
    created() {
      if (!this._ArrangeAvatars) {
        this._ArrangeAvatars = debounce(() => {
          const newAvatars = this.data._pureAvatars
          if (newAvatars.length > 0) {
            const {
              max,
              spacing,
            } = this.data
            let more = 0
            let moreStyle
            newAvatars.forEach((item, index) => {
              const targetStyles: any = {'z-index': 0, 'margin-left': '-8px'}
              if (index === 0) {
                targetStyles['margin-left'] = '0'
              } else if (!Number.isNaN(Number(spacing))) {
                targetStyles['margin-left'] = `-${spacing}px`
              } else if (spacing === 'small') {
                targetStyles['margin-left'] = '-16px'
              }
              if (index >= max) {
                more += 1
                targetStyles.display = 'none'
                if (!moreStyle) {
                  moreStyle = `z-index: 0;margin-left: ${targetStyles['margin-left']};`
                }
              } else {
                targetStyles['z-index'] = max - index
              }
              item._groupControlAction(targetStyles)
            })
            this.setData({
              _more: more,
              _moreStyle: moreStyle
            })
          }
        }, 50)
      }
    },
  },
  relations: {
    '../avatar/avatar': {
      type: 'child',
      linked(target) {
        if (target) {
          this.data._pureAvatars.push(target)
          this.setData({_pureAvatars: this.data._pureAvatars})
        }
      },
      unlinked(target) {
        const _targetIndex = this.data._pureAvatars.findIndex(item => item === target)
        this.data._pureAvatars.splice(_targetIndex, 1)
        this.setData({_pureAvatars: this.data._pureAvatars})
      },
    }
  },
  observers: {
    'max, spacing, _pureAvatars': function () {
      if (this._ArrangeAvatars) {
        this._ArrangeAvatars()
      }
    }
  },
  options: {
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
