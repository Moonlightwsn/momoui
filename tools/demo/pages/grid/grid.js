import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    papers: [],
  },
  onLoad() {
    const papers = [];
    for (let i = 0; i < 25; i+=1) { papers.push(i) }  
    
    this.setData({
      papers,
    })
  }
})

