import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    checked: true,
    modelChecked: false,
    size: 'medium',
    checkedValue: ['D'],
    input: 'Hello world',
  },
  onLoad() {
    this.setData({
      trigger: this.trigger.bind(this),
      inputChange: this.inputChange.bind(this),
      radioChange: this.radioChange.bind(this),
      groupChange: this.groupChange.bind(this)
    })
  },
  inputChange: (value, cursor, keyCode) => {
    console.log(value, cursor, keyCode)
  },
  trigger(checked) {
    console.log('trigger', checked)
    console.log(this.data)
  },
  radioChange(checked) {
    console.log('radioChange', checked)
  },
  showInput() {
    console.log(this.data.input, this.data.checked)
  },
  groupChange(checkedValue) {
    console.log('groupChange', checkedValue)
    this.setData({checkedValue})
  },
  changeSize() {
    this.setData({
      size: this.data.size === 'small' ? 'medium' : 'small',
    })
  },
  submit(event) {
    console.log(event)
  },
  reset(event) {
    console.log(event)
  }
})