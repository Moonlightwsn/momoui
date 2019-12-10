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
      const query = that.createSelectorQuery()
      query.select('.mui-dropdown-content').boundingClientRect()
      query.exec(function (res) {
        const [view = {}] = res
        const {
          bottom,
          top,
          right,
          left,
        } = view
        const {placeholder} = that.properties
        const newData = {
          overlayVisible: true,
          overlayStyle: 'display: inline-flex;',
        }

        if (placeholder === 'bottomLeft') {
          newData.overlayStyle = `${newData.overlayStyle}top: ${bottom}px; left: ${left}px;`
        } else if (placeholder === 'topLeft') {
          newData.overlayStyle = `${newData.overlayStyle}bottom: ${top}px; left: ${left}px;`
        } else if (placeholder === 'bottomRight') {
          newData.overlayStyle = `${newData.overlayStyle}top: ${bottom}px; left: ${right}px;`
        } else if (placeholder === 'topRight') {
          newData.overlayStyle = `${newData.overlayStyle}bottom: ${top}px; left: ${right}px;`
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
