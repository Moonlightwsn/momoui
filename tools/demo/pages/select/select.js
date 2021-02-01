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
    range2: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    value: null,
    value1: null,
    value2: [],
  },
  Change(e) {
    this.setData({
      value: e.detail.value
    })
  },
  Change1(e) {
    this.setData({
      value1: e.detail.value,
    })
  },
  Change2(e) {
    this.setData({
      value2: e.detail.value,
    })
  },
  ColumnChange2(e) {
    console.log(222, e)
    const data = {
      range2: this.data.range2,
      value2: this.data.value2
    };
    data.value2[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.value2[0]) {
          case 0:
            data.range2[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.range2[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.range2[1] = ['鱼', '两栖动物', '爬行动物'];
            data.range2[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.value2[1] = 0;
        data.value2[2] = 0;
        break;
      case 1:
        switch (data.value2[0]) {
          case 0:
            switch (data.value2[1]) {
              case 0:
                data.range2[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.range2[2] = ['蛔虫'];
                break;
              case 2:
                data.range2[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.range2[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.range2[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.value2[1]) {
              case 0:
                data.range2[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.range2[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.range2[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.value2[2] = 0;
        break;
    }
    console.log(data.value2);
    this.setData(data);
  },
})
