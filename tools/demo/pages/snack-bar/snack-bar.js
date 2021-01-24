import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    message: '',
    transition: 'grow',
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
      Close5: this.Close5.bind(this),
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
      open3: true,
      anchorOrigin3: anchorOrigin,
    })
  },
  Close3() {
    this.setData({open3: false})
  },
  Open4(e) {
    const {target: {dataset: {message = ''} = {}} = {}} = {} = e || {}
    this.setData({open4: true, message})
  },
  Close4() {
    this.setData({open4: false})
  },
  Open5(e) {
    const {target: {dataset: {transition = 'grow'} = {}} = {}} = {} = e || {}
    const {transition: currentTransition} = this.data
    if (currentTransition !== transition) {
      this.setData({transition, open5: true})
    } else {
      this.setData({open5: true})
    }
  },
  Close5() {
    this.setData({open5: false})
  }
})
