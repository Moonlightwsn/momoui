Page({
  data: {
    list: [
      {
        key: 'form',
        header: '表单',
        items: [
          {
            key: 'button',
            text: 'Button',
          },
          {
            key: 'input',
            text: 'Input',
          },
          {
            key: 'form',
            text: 'Form',
          },
        ],
      },
      {
        key: 'navigation',
        header: '导航',
        items: [
          {
            key: 'bottomnavigation',
            text: 'BottomNavigation',
          },
          {
            key: 'appbar',
            text: 'AppBar',
          },
        ],
      },
      {
        key: 'interaction',
        header: '交互',
        items: [
          {
            key: 'progress',
            text: 'Progress',
          },
          {
            key: 'snackbar',
            text: 'SnackBar',
          },
        ],
      },
      {
        key: 'display',
        header: '展示',
        items: [
          {
            key: 'typography',
            text: 'Typography',
          },
          {
            key: 'icon',
            text: 'Icon',
          },
          {
            key: 'avatar',
            text: 'Avatar',
          },
          {
            key: 'card',
            text: 'Card',
          },
          {
            key: 'list',
            text: 'List',
          },
          {
            key: 'paper',
            text: 'Paper',
          },
          {
            key: 'menu',
            text: 'Menu',
          },
          {
            key: 'dropdown',
            text: 'Dropdown',
          },
        ],
      },
    ],
  },
  navigateTo(e) {
    console.log(e)
  },
})
