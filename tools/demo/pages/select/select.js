import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    range: [{
      key: 10,
      display: 'Ten',
    }, {
      key: 20,
      display: 'Twenty',
    }, {
      key: 30,
      display: 'Thirty',
    }],
    range1: [{
      key: 0,
      display: 'None'
    }, {
      key: 10,
      display: 'Ten',
    }, {
      key: 20,
      display: 'Twenty',
    }, {
      key: 30,
      display: 'Thirty',
    }],
    value: null,
    key: null,
  },
  Change(e) {
    this.setData({
      value: e.detail.value
    })
  },
  Change2(e) {
    this.setData({
      key: e.detail.value,
    })
  }
})
