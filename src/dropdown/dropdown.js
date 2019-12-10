Component({
  properties: {
    placeholder: {
      type: String,
      value: 'bottomLeft'
    },
  },
  data: {
    overlayVisible: false,
    overlayStyle: 'display: none;',
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
          overlayStyle: 'display: inline-flex;',
        }

        if (placeholder === 'bottomLeft') {
          newData.overlayStyle = `${newData.overlayStyle}top: ${bottom}px; left: ${left}px;`
        } else if (placeholder === 'topLeft') {
          newData.overlayStyle = `${newData.overlayStyle}bottom: ${windowHeight - top}px; left: ${left}px;`
        } else if (placeholder === 'bottomRight') {
          newData.overlayStyle = `${newData.overlayStyle}top: ${bottom}px; right: ${windowWidth - right}px;`
        } else if (placeholder === 'topRight') {
          newData.overlayStyle = `${newData.overlayStyle}bottom: ${windowHeight - top}px; right: ${windowWidth - right}px;`
        }
        that.setData(newData)
      })
    },
    _hide() {
      this.setData({overlayVisible: false, overlayStyle: 'display: none;'})
    },
  },
  options: {
    styleIsolation: 'shared',
    multipleSlots: true,
  },
})
