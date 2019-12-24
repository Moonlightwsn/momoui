Component({
  properties: {
    placeholder: {
      type: String,
      value: 'bottomLeft'
    },
  },
  data: {
    overlayVisible: false,
    overlayStyle: 'opacity: 0;',
    overlayPosition: '',
  },
  methods: {
    _trigger() {
      const that = this
      const queryContent = that.createSelectorQuery()
      queryContent.select('.mui-dropdown-content').boundingClientRect()
      queryContent.exec((resContent) => {
        const [viewContent = {}] = resContent
        const {
          bottom,
          top,
          right,
          left,
        } = viewContent
        const systemInfo = wx.getSystemInfoSync()
        const {windowWidth, windowHeight} = systemInfo || {}
        const {placeholder} = that.properties
        const newData = {
          overlayVisible: true,
          overlayStyle: 'opacity: 1;',
        }

        if (placeholder === 'bottomLeft') {
          newData.overlayPosition = `top: ${bottom}px; left: ${left}px;`
        } else if (placeholder === 'topLeft') {
          newData.overlayPosition = `bottom: ${windowHeight - top}px; left: ${left}px;`
        } else if (placeholder === 'bottomRight') {
          newData.overlayPosition = `top: ${bottom}px; right: ${windowWidth - right}px;`
        } else if (placeholder === 'topRight') {
          newData.overlayPosition = `bottom: ${windowHeight - top}px; right: ${windowWidth - right}px;`
        }
        that.setData(newData)
      })
    },
    _hide() {
      this.setData({overlayStyle: 'opacity: 0;'})
      setTimeout(() => {
        this.setData({overlayVisible: false})
      }, 300)
    },
  },
  options: {
    styleIsolation: 'shared',
    multipleSlots: true,
  },
})
