import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    anchorOrigin: {
      type: Object,
      value: {
        vertical: 'top',
        horizontal: 'right',
      }
    },
    content: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: 'default',
    },
    invisible: {
      type: Boolean,
      value: false,
    },
    overlap: {
      type: String,
      value: 'rectangle',
    },
    max: {
      type: Number,
      value: 99,
    },
    showZero: {
      type: Boolean,
      value: false,
    },
    variant: {
      type: String,
      value: 'standard',
    },
  },
  data: {
    _content: '',
  },
  observers: {
    content(content) {
      let _content = content
      const numberContent = Number(content)
      if (!Number.isNaN(numberContent)) {
        const {max, showZero} = this.data
        if (numberContent === 0) {
          _content = showZero ? '0' : ''
        } else {
          _content = numberContent > Number(max) ? `${max}+` : content
        }
      }
      this.setData({_content})
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
