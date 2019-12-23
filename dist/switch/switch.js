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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(0);

Component({
  behaviors: ['wx://form-field'],
  properties: {
    disabled: {
      type: Boolean,
      value: false
    },
    ripple: {
      type: Boolean,
      value: true
    },
    mStyle: String,
    mClass: String,
    value: Boolean,
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
    iconColor: '#ffffff'
  },
  lifetimes: {
    attached: function attached() {
      var _properties = this.properties,
          disabled = _properties.disabled,
          checked = _properties.checked;

      if (disabled) {
        this.setData({ iconColor: '#bdbdbd' });
      } else {
        this._switchControol(checked);
      }
    }
  },
  methods: {
    _switchControol: function _switchControol(force) {
      var _properties2 = this.properties,
          checked = _properties2.checked,
          color = _properties2.color;

      var newState = {};
      if (typeof force === 'boolean') {
        newState.valuse = force;
        newState.checked = force;
      } else {
        this.triggerEvent('change', { checked: !checked });
        newState.value = !checked;
        newState.checked = !checked;
      }
      var rippleBackgroundColor = _utils.rippleBackgroundColorMap[color];
      if (color === 'default') {
        newState.iconColor = '#ffffff';
      } else {
        newState.iconColor = newState.checked ? rippleBackgroundColor : '#ffffff';
      }
      this.setData(newState);
    },
    _tap: function _tap(e) {
      var disabled = this.properties.disabled;

      if (!disabled) {
        this._switchControol();
        var el = this.selectComponent('.mui-switch-icon');
        if (el && el.rippleClick && typeof el.rippleClick === 'function') {
          el.rippleClick(e, el);
        }
      }
    },
    reset: function reset() {
      this._switchControol(false);
    }
  },
  relations: {
    '../form/form': {
      type: 'ancestor'
    }
  },
  options: {
    styleIsolation: 'shared'
  }
});

/***/ })

/******/ });