import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
    open2: false,
    open3: false,
    open4: false,
    message: '',
    anchorOrigin3: {
      vertical: 'top',
      horizontal: 'center',
    },
  },
  onLoad() {
    this.setData({
      Close: this.Close.bind(this),
      Close2: this.Close2.bind(this),
      Close3: this.Close3.bind(this),
      Close4: this.Close4.bind(this),
    })
  },
  Open() {
    this.setData({open: true})
  },
  Close() {
    this.setData({open: false})
  },
  Open2() {
    this.setData({open2: true})
  },
  Close2() {
    this.setData({open2: false})
  },
  Open3(e) {
    const {target: {dataset: {anchor = 'top-center'} = {}} = {}} = {} = e || {}
    const anchorArr = anchor.split('-')
    const anchorOrigin = {
      vertical: anchorArr[0],
      horizontal: anchorArr[1],
    }
    this.setData({
      open3: false,
    }, () => {
      setTimeout(() => {
        this.setData({
          open3: true,
          anchorOrigin3: anchorOrigin,
        })
      }, 200)
    });
  },
  Close3() {
    this.setData({open3: false})
  },
  Open4(e) {
    const {target: {dataset: {message = ''} = {}} = {}} = {} = e || {}
    this.setData({open4: false}, () => {
      setTimeout(() => {
        this.setData({open4: true, message})
      }, 200)
    })
  },
  Close4() {
    this.setData({open4: false})
  },
})
