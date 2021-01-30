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
    value: null,
  },
  Change(e) {
    console.log(e)
  }
})
