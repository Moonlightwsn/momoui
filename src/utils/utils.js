// 防抖动函数
function debounce(func, wait) {
  let timer
  const delay = parseInt(wait, 10) || 0

  return function (...args) {
    clearTimeout(timer)
    const content = this
    timer = setTimeout(function () {
      func.apply(content, args)
    }, delay)
  }
}

const rippleBackgroundColorMap = {
  default: '#707070',
  primary: '#1976d2',
  secondary: '#dc004e',
}

const muiIconPath = '/styles/icons/'

const iconPathMap = {
  default: `${muiIconPath}default.svg`,
  share: `${muiIconPath}share.svg`,
  'share-arrow': `${muiIconPath}share-arrow.svg`,
  check: `${muiIconPath}check.svg`,
  'check-circle': `${muiIconPath}check-circle.svg`,
  close: `${muiIconPath}close.svg`,
  'close-circle': `${muiIconPath}close-circle.svg`,
  'bullet-list': `${muiIconPath}bullet-list.svg`,
  link: `${muiIconPath}link.svg`,
  trash: `${muiIconPath}trash.svg`,
  like: `${muiIconPath}like.svg`,
  'hand-like': `${muiIconPath}hand-like.svg`,
  'arrow-down-1': `${muiIconPath}arrow-down-1.svg`,
  'arrow-up-1': `${muiIconPath}arrow-up-1.svg`,
  'arrow-left-1': `${muiIconPath}arrow-left-1.svg`,
  'arrow-right-1': `${muiIconPath}arrow-right-1.svg`,
  'arrow-down-2': `${muiIconPath}arrow-down-2.svg`,
  'arrow-up-2': `${muiIconPath}arrow-up-2.svg`,
  'arrow-left-2': `${muiIconPath}arrow-left-2.svg`,
  'arrow-right-2': `${muiIconPath}arrow-right-2.svg`,
  play: `${muiIconPath}play.svg`,
  'play-next': `${muiIconPath}play-next.svg`,
  'play-prev': `${muiIconPath}play-previous.svg`,
  pictures: `${muiIconPath}pictures.svg`,
  square: `${muiIconPath}square.svg`,
  'square-check': `${muiIconPath}square-check-fill.svg`,
  round: `${muiIconPath}round.svg`,
  'radio-box': `${muiIconPath}radio-box.svg`,
  user: `${muiIconPath}user.svg`,
  circle: `${muiIconPath}circle.svg`,
  'progress-circle': `${muiIconPath}progress-circle.svg`,
  save: `${muiIconPath}save.svg`,
  search: `${muiIconPath}search.svg`,
  clock: `${muiIconPath}clock.svg`,
  location: `${muiIconPath}location.svg`,
  folder: `${muiIconPath}folder.svg`,
  menu: `${muiIconPath}menu.svg`,
  message: `${muiIconPath}message.svg`,
  'address-book': `${muiIconPath}address-book.svg`,
  browser: `${muiIconPath}browser.svg`,
  plus: `${muiIconPath}plus.svg`,
  send: `${muiIconPath}send.svg`,
  info: `${muiIconPath}info.svg`,
  mail: `${muiIconPath}mail.svg`,
  'user-add': `${muiIconPath}user-add.svg`,
  scan: `${muiIconPath}scan.svg`,
  pay: `${muiIconPath}pay.svg`,
}

export {
  debounce,
  rippleBackgroundColorMap,
  iconPathMap,
}
