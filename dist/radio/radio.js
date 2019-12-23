module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// 防抖动函数
function debounce(func, wait) {
  var timer = void 0;
  var delay = parseInt(wait, 10) || 0;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);
    var content = this;
    timer = setTimeout(function () {
      func.apply(content, args);
    }, delay);
  };
}

var rippleBackgroundColorMap = {
  default: '#707070',
  primary: '#1976d2',
  secondary: '#dc004e'
};

exports.debounce = debounce;
exports.rippleBackgroundColorMap = rippleBackgroundColorMap;

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var regexp = /(\b[0-9]{1,3}\b)/g;

exports.default = Behavior({
  properties: {
    ripple: {
      type: Boolean,
      value: true
    },
    customRippleBackgroundColor: String
  },
  data: {
    rippleList: [],
    centerRipple: false
  },
  methods: {
    _stopRipple: (0, _utils.debounce)(function (that, key) {
      var _tobeDeletedIndex = void 0;
      that.data.rippleList.some(function (item, index) {
        _tobeDeletedIndex = index;
        return item.key === key;
      });
      if (_tobeDeletedIndex >= 0) {
        that.data.rippleList.splice(0, _tobeDeletedIndex + 1);
        that.setData({ rippleList: that.data.rippleList });
      }
    }, 300),
    stopRipple: function stopRipple(e) {
      this._stopRipple(this, e.target.dataset.key);
    },

    /*
    rippleHoldEnd(e, that) {
      const thisRippleBehaviors = that || this
      const {ripple, disabled} = thisRippleBehaviors.properties
      const {innerDisabled} = thisRippleBehaviors.data
      if (ripple && !disabled && !innerDisabled) {
        if (thisRippleBehaviors.data.ripplelongpress) {
          setTimeout(function () {
            thisRippleBehaviors.setData({
              rippleList: [],
              ripplelongpress: false,
            })
          }, 200)
        }
      }
    },
    */
    rippleHold: function rippleHold(e, that) {
      var thisRippleBehaviors = that || this;
      var _thisRippleBehaviors$ = thisRippleBehaviors.properties,
          ripple = _thisRippleBehaviors$.ripple,
          disabled = _thisRippleBehaviors$.disabled;
      var innerDisabled = thisRippleBehaviors.data.innerDisabled;

      if (ripple && !disabled && !innerDisabled) {
        var _e$detail = e.detail,
            x = _e$detail.x,
            y = _e$detail.y;

        thisRippleBehaviors._ripple({
          x: x,
          y: y
        }, 'hold');
      }
    },
    rippleClick: function rippleClick(e, that) {
      var thisRippleBehaviors = that || this;
      var _thisRippleBehaviors$2 = thisRippleBehaviors.properties,
          ripple = _thisRippleBehaviors$2.ripple,
          disabled = _thisRippleBehaviors$2.disabled;
      var innerDisabled = thisRippleBehaviors.data.innerDisabled;

      if (ripple && !disabled && !innerDisabled) {
        var _e$detail2 = e.detail,
            x = _e$detail2.x,
            y = _e$detail2.y;

        thisRippleBehaviors._ripple({
          x: x,
          y: y
        }, 'click');
      }
    },
    _ripple: function _ripple(position, type) {
      var that = this;
      var query = that.createSelectorQuery();
      query.select('.mui-ripple-view').fields({
        size: true,
        rect: true,
        computedStyle: ['backgroundColor']
      });
      query.selectViewport().scrollOffset();
      query.exec(function (res) {
        var view = res[0],
            viewPort = res[1];

        var rippleBackgroundColor = that.properties.customRippleBackgroundColor || that.data.rippleBackgroundColor || (that._highBrightnessColor(view.backgroundColor) ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)');
        var boxWidth = parseInt(view.width, 10);
        var boxHeight = parseInt(view.height, 10);

        var rippleLength = void 0;
        if (boxWidth >= boxHeight) {
          rippleLength = boxWidth;
        } else {
          rippleLength = boxHeight;
        }

        var centerRipple = that.data.centerRipple;


        var rippleClass = 'mui-ripple-animation' + (type === 'hold' ? '-hold' : '') + (centerRipple ? '-center' : '');

        var rippleX = void 0;
        var rippleY = void 0;
        if (centerRipple) {
          if (boxWidth === boxHeight) {
            rippleX = 0;
            rippleY = 0;
          } else if (boxWidth > boxHeight) {
            rippleX = 0;
            rippleY = -((boxWidth - boxHeight) / 2);
          } else {
            rippleX = -((boxHeight - boxWidth) / 2);
            rippleY = 0;
          }
        } else {
          rippleX = position.x - (view.left + viewPort.scrollLeft) - rippleLength / 2;
          rippleY = position.y - (view.top + viewPort.scrollTop) - rippleLength / 2;
        }

        that.data.rippleList.push({
          length: rippleLength,
          x: rippleX,
          y: rippleY,
          backgroundColor: rippleBackgroundColor,
          key: 'ripple-' + new Date().getTime() + '-' + Math.round(Math.random() * 10000),
          rippleClass: rippleClass
        });
        that.setData({
          rippleList: that.data.rippleList
        });
      });
    },
    _highBrightnessColor: function _highBrightnessColor(color) {
      var _color$match = color.match(regexp),
          r = _color$match[0],
          g = _color$match[1],
          b = _color$match[2],
          _color$match$ = _color$match[3],
          a = _color$match$ === undefined ? 1 : _color$match$;

      return parseInt(r, 10) * 0.299 + parseInt(g, 10) * 0.578 + parseInt(b, 10) * 0.114 >= 192 * a;
    }
  }
});

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _behaviors = __webpack_require__(1);

var _behaviors2 = _interopRequireDefault(_behaviors);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
  behaviors: [_behaviors2.default],
  properties: {
    disabled: {
      type: Boolean,
      value: false
    },
    mStyle: String,
    mClass: String,
    value: {
      type: String,
      value: ''
    },
    size: {
      type: Number,
      value: 24
    },
    color: {
      type: String,
      value: 'secondary'
    },
    checked: {
      type: Boolean,
      value: false
    },
    placement: {
      type: String,
      value: 'right'
    }
  },
  data: {
    centerRipple: true,
    iconColor: '#707070',
    rippleBackgroundColor: '#dc004e'
  },
  lifetimes: {
    attached: function attached() {
      var _properties = this.properties,
          disabled = _properties.disabled,
          checked = _properties.checked,
          color = _properties.color;

      if (disabled) {
        this.setData({ iconColor: '#b6b6b6' });
      } else {
        var rippleBackgroundColor = _utils.rippleBackgroundColorMap[color];
        this.setData({ iconColor: checked ? rippleBackgroundColor : '#707070' });
        this.data.rippleBackgroundColor = rippleBackgroundColor;
      }
    }
  },
  methods: {
    uncheck: function uncheck() {
      this.setData({ checked: false, iconColor: '#707070' });
    },
    _rippleControll: function _rippleControll(e, action) {
      if (action && typeof action === 'function') {
        action(e, this);
      }
    },
    _checkControol: function _checkControol() {
      var checked = this.data.checked;
      var _properties2 = this.properties,
          disabled = _properties2.disabled,
          color = _properties2.color;

      if (!disabled && !checked) {
        var rippleBackgroundColor = _utils.rippleBackgroundColorMap[color];
        this.setData({ checked: true, iconColor: rippleBackgroundColor });
        this.data._group.checkedChange(this);
      }
    },
    _tap: function _tap(e) {
      this._checkControol();
      this._rippleControll(e, this.rippleClick);
    },
    _longPress: function _longPress(e) {
      this._checkControol();
      this._rippleControll(e, this.rippleHold);
    }
  },
  relations: {
    '../radio-group/radio-group': {
      type: 'ancestor',
      linked: function linked(target) {
        this.data._group = target;
      },
      unlinked: function unlinked() {
        this.data._group = null;
      }
    }
  },
  options: {
    pureDataPattern: /^_/,
    styleIsolation: 'shared'
  }
});

/***/ })

/******/ });