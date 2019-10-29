Component({
  properties: {
    src: String,
    icon: String,
    size: {
      type: Number,
      value: 36
    },
    background: {
      type: String,
      value: '#bdbdbd',
    },
    color: {
      type: String,
      value: '#ffffff',
    },
  },
  data: {
    iconSize: 24
  },
  lifetimes: {
    attached() {
      this.setData({
        iconSize: (this.properties.size / 1.5),
        fontSize: (this.properties.size / 2),
      })
    },
  },
})
