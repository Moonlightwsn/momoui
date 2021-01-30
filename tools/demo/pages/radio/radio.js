import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    gender: 'female',
    selectedValue: 'a',
    error: false,
    groupValue: '',
    helperText: '',
  },
  onLoad() {
    this.setData({
      ChangeGender: this.ChangeGender.bind(this),
      ChangeSelectValue: this.ChangeSelectValue.bind(this),
      HandleGroupChange: this.HandleGroupChange.bind(this),
    })
  },
  ChangeGender(gender) {
    this.setData({gender})
  },
  ChangeSelectValue(checked, value) {
    if (checked) {
      this.setData({selectedValue: value})
    }
  },
  HandleGroupChange(value) {
    this.setData({
      groupValue: value,
      helperText: '',
      error: false,
    })
  },
  submit(e) {
    const formValue = e.detail.value
    let error = true
    let helperText = 'Please select an option.'
    if (formValue) {
      if (formValue.quiz === 'best') {
        error = false
        helperText = 'You got it!'
      } else if (formValue.quiz === 'worst') {
        helperText = 'Sorry, wrong answer!'
      }
    }
    this.setData({error, helperText})
  },
})
