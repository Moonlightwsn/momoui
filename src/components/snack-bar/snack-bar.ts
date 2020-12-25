import muiBase from '../../behaviors/muiBase.ts'
import openCloseTransition from '../../behaviors/transition/openClose.ts'

Component({
  behaviors: [muiBase, openCloseTransition],
  properties: {
    anchorOrigin: {
      type: Object,
      value: {
        vertical: 'top',
        horizontal: 'center',
      },
    },
    message: {
      type: String,
      value: null,
    },
    transitionType: {
      type: String,
      value: 'grow',
    },
  },
  data: {
    _transitionStyle: '',
    _defaultStyle: 'opacity: 0;',
  },
  methods: {
    _onBeforeShow() {
      const {transitions, transitionType} = this.data
      if ((!transitions || transitions.length <= 0) && transitionType === 'slide' && !this._positionComputed) {
        return this._computePosition()
      }
      this._positionComputed = true
      return null
    },
    _computePosition() {
      return new Promise((resolve, reject) => {
        let count = 0
        const position: any = {}
        wx.getSystemInfo({
          success: res => {
            const {windowHeight, windowWidth} = res
            position.windowHeight = windowHeight
            position.windowWidth = windowWidth
            count += 1
            if (count >= 2) {
              resolve(position)
            }
          },
          fail: () => {
            reject(new Error('getSystemInfo fail'))
          }
        })
        const query = this.createSelectorQuery().select('.mui-snack-bar-root').fields({
          rect: true,
        })
        query.exec(res => {
          const {
            top,
            right,
            bottom,
            left
          } = res[0] || {}
          position.top = top
          position.right = right
          position.bottom = bottom
          position.left = left
          count += 1
          if (count >= 2) {
            resolve(position)
          }
        })
      }).then((position: any) => {
        this._positionComputed = true
        const _endStyle = 'transform: none;'
        let _startStyle = ''
        const {anchorOrigin: {vertical, horizontal}} = this.data
        if (horizontal === 'center') {
          if (vertical === 'top') {
            _startStyle = `transform: translateY(${-position.bottom}px);`
          } else {
            _startStyle = `transform: translateY(${position.windowHeight - position.top}px);`
          }
        } else if (horizontal === 'left') {
          _startStyle = `transform: translateX(${-position.right}px);`
        } else if (horizontal === 'right') {
          _startStyle = `transform: translateX(${position.windowWidth - position.left}px);`
        }
        return {
          _endStyle,
          _startStyle,
          _defaultStyle: _startStyle,
        }
      }).catch(e => console.log(e))
    }
  },
  observers: {
    _show(show) {
      if (this._positionComputed) {
        const {
          _endStyle,
          _startStyle,
          _enterStyle,
          _exitStyle,
        } = this.data
        const _transitionStyle = show ? `${_endStyle}${_enterStyle}` : `${_startStyle}${_exitStyle}`
        this.setData({
          _transitionStyle,
        })
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
