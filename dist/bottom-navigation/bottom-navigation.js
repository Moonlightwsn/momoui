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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Component({
  properties: {
    mClass: String,
    mStyle: String,
    actions: {
      type: Array,
      value: []
    },
    color: {
      type: String,
      value: 'primary'
    },
    controlled: {
      type: Boolean,
      value: false
    },
    activeKey: String,
    activeColor: String
  },
  data: {
    activeStatus: {
      active: {
        iconColor: '#1976d2',
        typographyStyle: 'font-szie:14px;line-height:17px;transition: font-size 0.2s, opacity 0.2s;transition-delay: 0.1s;'
      },
      normal: {
        iconColor: '#757575',
        typographyStyle: 'color:#757575;font-szie:12px;line-height:14px;'
      }
    }
  },
  methods: {
    _tap: function _tap(e) {
      var _e$target = e.target;
      _e$target = _e$target === undefined ? {} : _e$target;
      var _e$target$dataset = _e$target.dataset;
      _e$target$dataset = _e$target$dataset === undefined ? {} : _e$target$dataset;
      var _e$target$dataset$key = _e$target$dataset.key,
          key = _e$target$dataset$key === undefined ? '' : _e$target$dataset$key;
      var _properties = this.properties,
          activeKey = _properties.activeKey,
          controlled = _properties.controlled;

      if (key !== activeKey) {
        this.triggerEvent('change', { key: key });
        if (!controlled) {
          this.setData({
            activeKey: key
          });
        }
      }
    }
  },
  lifetimes: {
    attached: function attached() {
      var color = this.properties.color;

      if (color === 'secondary') {
        this.setData({
          activeStatus: {
            active: {
              iconColor: '#dc004e',
              typographyStyle: 'font-szie:14px;line-height:17px;'
            },
            normal: {
              iconColor: '#757575',
              typographyStyle: 'color:#757575;font-szie:12px;line-height:14px;'
            }
          }
        });
      }
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  }
});

/***/ })

/******/ });