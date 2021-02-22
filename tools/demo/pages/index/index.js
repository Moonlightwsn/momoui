import themeMixin from '../../behaviors/theme'

/* eslint-disable */
const app = getApp()
/* eslint-disable */

Page({
  behaviors: [themeMixin],
  data: {
    value: 0,
    loading: false,
    loading2: false,
    open: false,
    scrollIntoView: '',
    scrollIntoView2: '',
    components: [{
      key: 'layout',
      title: 'Layout 布局',
      children: [{
        key: 'grid',
        title: 'Grid',
        subtitle: '栅格',
        avatar: 'G',
        img: {width: 155, height: 104},
        path: '/pages/grid/grid',
      }, {
        key: 'gridlist',
        title: 'Grid List',
        subtitle: '网格列表',
        avatar: 'GL',
        img: {width: 155, height: 104},
        path: '/pages/grid-list/grid-list',
      }]
    }, {
      key: 'form',
      title: 'Form 表单输入',
      children: [{
        key: 'button',
        title: 'Button',
        subtitle: '按钮',
        avatar: 'B',
        img: {width: 81, height: 112},
        path: '/pages/button/button',
      }, {
        key: 'buttongroup',
        title: 'Button Group',
        subtitle: '按钮组',
        avatar: 'BG',
        briefimg: '../../assets/components/button.svg',
        img: {width: 81, height: 112},
        path: '/pages/button-group/button-group',
      }, {
        key: 'checkbox',
        title: 'Checkbox',
        subtitle: '多选框',
        avatar: 'C',
        img: {width: 104, height: 75},
        path: '/pages/checkbox/checkbox',
      }, {
        key: 'radio',
        title: 'Radio',
        subtitle: '单选框',
        avatar: 'R',
        img: {width: 93, height: 82},
        path: '/pages/radio/radio',
      }, {
        key: 'select',
        title: 'Select',
        subtitle: '选择器',
        avatar: 'S',
        img: {width: 120, height: 112},
        path: '/pages/select/select',
      }, {
        key: 'switch',
        title: 'Switch',
        subtitle: '选择器',
        avatar: 'S',
        img: {width: 85, height: 56},
        path: '/pages/switch/switch',
      }, {
        key: 'input',
        title: 'Input',
        subtitle: '文本框',
        avatar: 'I',
        img: {width: 120, height: 76},
        path: '/pages/input/input',
      }]
    }, {
      key: 'navigation',
      title: 'Navigation 导航栏',
      children: [{
        key: 'bottomnavigation',
        title: 'Bottom Navigation',
        subtitle: '底部导航栏',
        avatar: 'BN',
        img: {width: 112, height: 32},
        briefimg: '../../assets/components/icon.svg',
        path: '/pages/bottom-navigation/bottom-navigation',
      }, {
        key: 'drawer',
        title: 'Drawer',
        subtitle: '抽屉',
        avatar: 'D',
        img: {width: 155, height: 104},
        path: '/pages/drawer/drawer',
      }, {
        key: 'menu',
        title: 'Menu',
        subtitle: '菜单',
        avatar: 'M',
        img: {width: 120, height: 96},
        path: '/pages/menu/menu',
      }, {
        key: 'tabs',
        title: 'Tabs',
        subtitle: '选项卡',
        avatar: 'T',
        img: {width: 208, height: 56},
        path: '/pages/tabs/tabs',
      }],
    }, {
      key: 'surfaces',
      title: 'Surfaces 表面展示',
      children: [{
        key: 'appbar',
        title: 'App Bar',
        subtitle: '应用栏',
        avatar: 'AB',
        img: {width: 150, height: 44},
        path: '/pages/app-bar/app-bar',
      }, {
        key: 'paper',
        title: 'Paper',
        subtitle: '纸张',
        avatar: 'P',
        img: {width: 176, height: 96},
        path: '/pages/paper/paper',
      }, {
        key: 'card',
        title: 'Card',
        subtitle: '卡片',
        avatar: 'C',
        img: {width: 173, height: 122},
        path: '/pages/card/card',
      }]
    }, {
      key: 'feedback',
      title: 'Feedback 用户反馈',
      children: [{
        key: 'alert',
        title: 'Alert',
        subtitle: '警告提示',
        avatar: 'A',
        img: {width: 142, height: 88},
        path: '/pages/alert/alert',
      }, {
        key: 'progress',
        title: 'Progress',
        subtitle: '进度条',
        avatar: 'P',
        img: {width: 165, height: 48},
        path: '/pages/progress/progress',
      }, {
        key: 'dialog',
        title: 'Dialog',
        subtitle: '对话框',
        avatar: 'D',
        img: {width: 155, height: 104},
        path: '/pages/dialog/dialog',
      }, {
        key: 'snackbar',
        title: 'Snackbar',
        subtitle: '消息条',
        avatar: 'S',
        img: {width: 174, height: 64},
        path: '/pages/snack-bar/snack-bar',
      }, {
        key: 'backdrop',
        title: 'Backdrop',
        subtitle: '背景板',
        avatar: 'B',
        img: {width: 180, height: 90},
        path: '/pages/backdrop/backdrop',
      }]
    }, {
      key: 'datadisplay',
      title: 'Data Display 数据展示',
      children: [{
        key: 'avatar',
        title: 'Avatar',
        subtitle: '头像',
        avatar: 'A',
        img: {width: 138, height: 83},
        path: '/pages/avatar/avatar',
      }, {
        key: 'badge',
        title: 'Badge',
        subtitle: '徽章',
        avatar: 'B',
        img: {width: 191, height: 55},
        path: '/pages/badge/badge',
      }, {
        key: 'chip',
        title: 'Chip',
        subtitle: '纸片组件',
        avatar: 'C',
        img: {width: 192, height: 56},
        path: '/pages/chip/chip',
      }, {
        key: 'divider',
        title: 'Divider',
        subtitle: '分割线',
        avatar: 'D',
        img: {width: 155, height: 101},
        path: '/pages/divider/divider',
      }, {
        key: 'icon',
        title: 'Icon',
        subtitle: '图标',
        avatar: 'I',
        img: {width: 112, height: 32},
        path: '/pages/icon/icon',
      }, {
        key: 'list',
        title: 'List',
        subtitle: '列表',
        avatar: 'L',
        img: {width: 150, height: 93},
        path: '/pages/list/list',
      }, {
        key: 'tooltip',
        title: 'Tooltip',
        subtitle: '提示',
        avatar: 'T',
        img: {width: 114, height: 60},
        path: '/pages/tooltip/tooltip',
      }, {
        key: 'typography',
        title: 'Typography',
        subtitle: '文字铸排',
        avatar: 'T',
        img: {width: 150, height: 105},
        path: '/pages/typography/typography',
      }]
    }],
  },
  onLoad(q) {
    const newData = {
      SetValue: this.SetValue.bind(this),
      CloseDrawer: this.CloseDrawer.bind(this),
      NavigateTo: this.NavigateTo.bind(this),
      GotoPlanB: this.GotoPlanB.bind(this),
    }
    if (q && q.current) {
      newData.value = Number(q.current) || 0
    }
    this.setData(newData)
  },
  onShareAppMessage() {
    return {
      title: 'MOMO UI - 精美丰富的类Material UI的小程序UI组件',
      path: '/pages/index/index',
      imageUrl: '../../assets/brief.png',
    }
  },
  onShareTimeline() {
    return {
      title: 'MOMO UI - 精美丰富的类Material UI的小程序UI组件',
      path: '/pages/index/index',
      imageUrl: '../../assets/brief.png',
    }
  },
  SetValue(e) {
    const {current} = e.detail
    this.setData({
      value: current,
    })
  },
  NavigateTo(e, dataset) {
    let to
    const {currentTarget: {dataset: {path = ''}}} = e || {}
    if (path) {
      to = path
    } else if (dataset && dataset.path) {
      to = dataset.path
    }
    if (to) {
      this.setData({loading: true}, () => {
        setTimeout(() => {
          wx.navigateTo({
            url: to,
            complete: () => {
              this.setData({loading: false})
            }
          })
        }, 325)
      })
    }
  },
  OpenDrawer() {
    this.setData({loading2: true}, () => {
      setTimeout(() => {
        this.setData({loading2: false, open: true})
      }, 325)
    })
  },
  CloseDrawer() {
    this.setData({open: false})
  },
  ScrollToTop() {
    this.setData({scrollIntoView: 'top'})
  },
  GotoPlanB() {
    this.setData({scrollIntoView2: 'planb'})
  },
  ChangeTheme() {
    let newTheme = this.data.theme === 'light' ? 'dark' : 'light'
    app.momouiTheme = newTheme
    wx.redirectTo({ url: '/pages/index/index?current=2' })
  },
})
