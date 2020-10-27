import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    mTitleStyle: {
      type: String,
      value: '',
    },
    mTitleClass: {
      type: String,
      value: '',
    },
    mSubTitleStyle: {
      type: String,
      value: '',
    },
    mSubTitleClass: {
      type: String,
      value: '',
    },
    mActionIconStyle: {
      type: String,
      value: '',
    },
    mActionIconClass: {
      type: String,
      value: '',
    },
    tilePosition: {
      type: String,
      value: 'bottom',
    },
    actionPosition: {
      type: String,
      value: 'right',
    },
    title: {
      type: String,
      value: '',
    },
    subTitle: {
      type: String,
      value: '',
    }
  },
  data: {
    _innerStyles: '',
  },
  lifetimes: {
    ready() {
      this.createSelectorQuery().select('.sub-title').boundingClientRect((res) => {
        const {height} = res
        if (height > 0) {
          const _innerStyles = 'height: 64px;'
          this.setData({
            _innerStyles
          })
        }
      }).exec()
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
