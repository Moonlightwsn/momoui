import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  submit(event) {
    console.log(event)
  },
  reset(event) {
    console.log(event)
  }
})