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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Component({
  behaviors: ['wx://form-field'],
  properties: {
    mStyle: String,
    mClass: String,
    color: {
      type: String,
      value: 'primary'
    },
    type: {
      type: String,
      value: 'text'
    },
    value: String,
    confirmType: {
      type: String,
      value: 'next'
    },
    password: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: ''
    },
    placeholderStyle: {
      type: String,
      value: ''
    },
    placeholderClass: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    focus: {
      type: Boolean,
      value: false
    },
    cursorSpacing: {
      type: Number,
      value: 72
    },
    error: {
      type: Boolean,
      value: false
    },
    label: String,
    fullWidth: {
      type: Boolean,
      value: false
    },
    help: String,
    filled: {
      type: Boolean,
      value: false
    },
    startAdornment: String,
    startIconColor: {
      type: String,
      value: '#202020'
    },
    inherit: {
      type: Boolean,
      value: false
    }
  },
  data: {
    innerFocus: false,
    innerPlaceholder: '',
    innerLabelShrink: false,
    currentValue: ''
  },
  lifetimes: {
    attached: function attached() {
      var _properties = this.properties,
          value = _properties.value,
          disabled = _properties.disabled,
          label = _properties.label,
          placeholder = _properties.placeholder,
          startAdornment = _properties.startAdornment;

      var newData = {};
      if (!label) {
        newData.innerPlaceholder = placeholder;
      }
      if (value || startAdornment) {
        this.data.currentValue = value;
        newData.innerLabelShrink = true;
      }
      if (disabled && value) {
        newData.innerPlaceholder = value;
        newData.value = '';
      }
      this.setData(newData);
    }
  },
  methods: {
    reset: function reset() {
      this.setData({ value: '', innerPlaceholder: '', innerLabelShrink: false });
    },
    _input: function _input(e) {
      var value = e.detail.value;

      this.data.currentValue = value;
      this.setData({ value: value });
    },
    _focus: function _focus() {
      var _properties2 = this.properties,
          disabled = _properties2.disabled,
          error = _properties2.error,
          placeholder = _properties2.placeholder;

      if (!disabled) {
        var newData = {};
        if (!error) {
          newData.innerFocus = true;
        }
        newData.innerLabelShrink = true;
        newData.innerPlaceholder = placeholder || '';
        this.setData(newData);
      }
    },
    _blur: function _blur() {
      var _properties3 = this.properties,
          disabled = _properties3.disabled,
          error = _properties3.error,
          startAdornment = _properties3.startAdornment,
          placeholder = _properties3.placeholder;
      var currentValue = this.data.currentValue;

      if (!disabled) {
        var newData = {};
        if (!error) {
          newData.innerFocus = false;
        }
        newData.innerLabelShrink = currentValue || startAdornment;
        newData.innerPlaceholder = currentValue || placeholder;
        this.setData(newData);
      }
    }
  },
  relations: {
    '../typography/typography': {
      type: 'descendant'
    },
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