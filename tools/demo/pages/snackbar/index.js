Component({
  data: {
    open: false,
  },
  methods: {
    showMessage() {
      this.setData({open: true})
    },
  },
})
