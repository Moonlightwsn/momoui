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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ({

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Component({
  properties: {
    placeholder: {
      type: String,
      value: 'bottomLeft'
    }
  },
  data: {
    overlayVisible: false,
    overlayStyle: 'opacity: 0;'
  },
  methods: {
    _trigger: function _trigger() {
      var that = this;
      var queryContent = that.createSelectorQuery();
      queryContent.select('.mui-dropdown-content').boundingClientRect();
      queryContent.exec(function (resContent) {
        var _resContent$ = resContent[0],
            viewContent = _resContent$ === undefined ? {} : _resContent$;
        var bottom = viewContent.bottom,
            top = viewContent.top,
            right = viewContent.right,
            left = viewContent.left;

        var systemInfo = wx.getSystemInfoSync();

        var _ref = systemInfo || {},
            windowWidth = _ref.windowWidth,
            windowHeight = _ref.windowHeight;

        var placeholder = that.properties.placeholder;

        var newData = {
          overlayVisible: true,
          overlayStyle: 'opacity: 1;'
        };

        if (placeholder === 'bottomLeft') {
          newData.overlayStyle = newData.overlayStyle + 'top: ' + bottom + 'px; left: ' + left + 'px;';
        } else if (placeholder === 'topLeft') {
          newData.overlayStyle = newData.overlayStyle + 'bottom: ' + (windowHeight - top) + 'px; left: ' + left + 'px;';
        } else if (placeholder === 'bottomRight') {
          newData.overlayStyle = newData.overlayStyle + 'top: ' + bottom + 'px; right: ' + (windowWidth - right) + 'px;';
        } else if (placeholder === 'topRight') {
          newData.overlayStyle = newData.overlayStyle + 'bottom: ' + (windowHeight - top) + 'px; right: ' + (windowWidth - right) + 'px;';
        }
        that.setData(newData);
      });
    },
    _hide: function _hide() {
      this.setData({ overlayVisible: false, overlayStyle: 'opacity: 0;' });
    }
  },
  options: {
    styleIsolation: 'shared',
    multipleSlots: true
  }
});

/***/ })

/******/ });