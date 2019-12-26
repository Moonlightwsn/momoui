Component({
  data: {
    formData: '',
  },
  methods: {
    formReset() {
      console.log('form发生了reset事件')
      this.setData({formData: ''})
    },
    formSubmit(e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.values)
      this.setData({formData: JSON.stringify(e.detail.values)})
    },
  },
})
