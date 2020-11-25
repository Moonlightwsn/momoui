import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    collapsedHeight: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    in: {
      type: Boolean,
      value: false,
    },
    timeout: {
      type: Number,
      optionalTypes: [String, Object],
      value: 300,
    },
  },
  data: {
    _openStyles: '',
  },
  methods: {
    _getInnerHeight() {
      const query = this.createSelectorQuery()
      query.select('.mui-collapse-wrapper').fields({
        size: true,
      }).exec((res) => {
        const [size = {}] = res || {}
        const {height} = size
        if (height > 0) {
          this.setData({_openStyles: `height:${height}px`})
        }
      })
    },
  },
  observers: {
    in(open) {
      if (open) {
        this._getInnerHeight()
      } else {
        this.setData({_openStyles: ''})
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
