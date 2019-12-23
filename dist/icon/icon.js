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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _base = __webpack_require__(3);

/* eslint-disable */
var app = getApp();
/* eslint-disable */
var pathPrefix = '/miniprogram_npm/momoui/dist';
if (app.momouiRootPath) {
  pathPrefix = app.momouiRootPath;
}

var muiIconPath = '/styles/icons/';

var iconPathMap = {
  'default': muiIconPath + 'default.svg',
  'share': muiIconPath + 'share.svg',
  'share-arrow': muiIconPath + 'share-arrow.svg',
  'check': muiIconPath + 'check.svg',
  'check-circle': muiIconPath + 'check-circle.svg',
  'close': muiIconPath + 'close.svg',
  'close-circle': muiIconPath + 'close-circle.svg',
  'bullet-list': muiIconPath + 'bullet-list.svg',
  'link': muiIconPath + 'link.svg',
  'trash': muiIconPath + 'trash.svg',
  'like': muiIconPath + 'like.svg',
  'arrow-down-1': muiIconPath + 'arrow-down-1.svg',
  'arrow-up-1': muiIconPath + 'arrow-up-1.svg',
  'arrow-left-1': muiIconPath + 'arrow-left-1.svg',
  'arrow-right-1': muiIconPath + 'arrow-right-1.svg',
  'arrow-down-2': muiIconPath + 'arrow-down-2.svg',
  'arrow-up-2': muiIconPath + 'arrow-up-2.svg',
  'arrow-left-2': muiIconPath + 'arrow-left-2.svg',
  'arrow-right-2': muiIconPath + 'arrow-right-2.svg',
  'play': muiIconPath + 'play.svg',
  'play-next': muiIconPath + 'play-next.svg',
  'play-prev': muiIconPath + 'play-previous.svg',
  'pictures': muiIconPath + 'pictures.svg',
  'square': muiIconPath + 'square.svg',
  'square-check': muiIconPath + 'square-check-fill.svg',
  'round': muiIconPath + 'round.svg',
  'radio-box': muiIconPath + 'radio-box.svg',
  'user': muiIconPath + 'user.svg',
  'circle': muiIconPath + 'circle.svg',
  'progress-circle': muiIconPath + 'progress-circle.svg',
  'save': muiIconPath + 'save.svg',
  'search': muiIconPath + 'search.svg',
  'clock': muiIconPath + 'clock.svg',
  'location': muiIconPath + 'location.svg',
  'folder': muiIconPath + 'folder.svg',
  'menu': muiIconPath + 'menu.svg',
  'message': muiIconPath + 'message.svg',
  'address-book': muiIconPath + 'address-book.svg',
  'browser': muiIconPath + 'browser.svg',
  'plus': muiIconPath + 'plus.svg',
  'send': muiIconPath + 'send.svg',
  'info': muiIconPath + 'info.svg',
  'mail': muiIconPath + 'mail.svg',
  'user-add': muiIconPath + 'user-add.svg',
  'scan': muiIconPath + 'scan.svg',
  'pay': muiIconPath + 'pay.svg'
};

Component({
  properties: {
    name: {
      type: String,
      value: 'default'
    },
    size: {
      type: Number,
      value: 20
    },
    color: String,
    background: {
      type: String,
      value: 'transparent'
    },
    pathPrefix: {
      type: String,
      value: pathPrefix
    },
    src: {
      type: String,
      value: ''
    },
    base64content: String
  },
  lifetimes: {
    attached: function attached() {
      var _properties = this.properties,
          name = _properties.name,
          path = _properties.path;

      if (path) {
        this._readSvgFile(path);
      } else if (name && iconPathMap[name]) {
        var iconPath = '' + this.properties.pathPrefix + iconPathMap[name];
        this._readSvgFile(iconPath);
      }
    }
  },
  methods: {
    _readSvgFile: function _readSvgFile(iconPath) {
      var that = this;
      var _that$properties = that.properties,
          color = _that$properties.color,
          name = _that$properties.name;

      wx.getFileSystemManager().readFile({
        filePath: iconPath,
        encoding: 'binary',
        success: function success(res) {
          var base64 = new _base.Base64();
          var svgdata = res.data;
          if (color) {
            if (name === 'progress-circle') {
              svgdata = svgdata.replace(/stroke="#[a-zA-Z0-9]{0,6}"/g, 'stroke="' + color + '"');
            } else {
              svgdata = svgdata.replace(/fill="#[a-zA-Z0-9]{0,6}"/g, 'fill="' + color + '"');
            }
          }
          var svgtobase64 = base64.encode(svgdata);
          that.setData({
            base64content: 'data:image/svg+xml;base64,' + svgtobase64
          });
        }
      });
    }
  },
  observers: {
    'name, color': function nameColor(name) {
      if (name && iconPathMap[name]) {
        var iconPath = '' + this.properties.pathPrefix + iconPathMap[name];
        this._readSvgFile(iconPath);
      }
    }
  },
  options: {
    styleIsolation: 'shared'
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base64 = function () {
  function Base64() {
    _classCallCheck(this, Base64);

    this._keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  }

  Base64.prototype.encode = function encode(input) {
    var output = '';
    var chr1 = void 0;
    var chr2 = void 0;
    var chr3 = void 0;
    var enc1 = void 0;
    var enc2 = void 0;
    var enc3 = void 0;
    var enc4 = void 0;
    var i = 0;
    input = Base64._utf8Encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;

      if (Number.isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (Number.isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }
    return output;
  };

  // public method for decoding

  Base64.prototype.decode = function decode(input) {
    var output = '';
    var chr1 = void 0;
    var chr2 = void 0;
    var chr3 = void 0;
    var enc1 = void 0;
    var enc2 = void 0;
    var enc3 = void 0;
    var enc4 = void 0;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9+/=]/g, '');

    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;

      output += String.fromCharCode(chr1);

      if (enc3 !== 64) {
        output += String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output += String.fromCharCode(chr3);
      }
    }

    output = Base64._utf8Decode(output);

    return output;
  };

  // private method for UTF-8 encoding

  Base64._utf8Encode = function _utf8Encode(str) {
    var string = str.replace(/\r\n/g, '\n');
    var utftext = '';
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode(c >> 6 | 192);
        utftext += String.fromCharCode(c & 63 | 128);
      } else {
        utftext += String.fromCharCode(c >> 12 | 224);
        utftext += String.fromCharCode(c >> 6 & 63 | 128);
        utftext += String.fromCharCode(c & 63 | 128);
      }
    }
    return utftext;
  };

  // private method for UTF-8 decoding

  Base64._utf8Decode = function _utf8Decode(utftext) {
    var string = '';
    var i = 0;
    var c = 0;
    // let c1 = 0
    var c2 = 0;
    var c3 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode((c & 31) << 6 | c2 & 63);
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        i += 3;
      }
    }
    return string;
  };

  return Base64;
}();

exports.Base64 = Base64;

/***/ })
/******/ ]);