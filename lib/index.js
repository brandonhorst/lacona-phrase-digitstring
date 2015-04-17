'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});
/** @jsx createElement */

var _createElement$Phrase = require('lacona-phrase');

var _Validator = require('lacona-phrase-validator');

var _Validator2 = _interopRequireWildcard(_Validator);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var DigitString = (function () {
  function DigitString() {
    _classCallCheck(this, DigitString);
  }

  _createClass(DigitString, [{
    key: 'validate',
    value: function validate(input) {
      if (input.search(/^[0-9]+$/) === -1) {
        return false;
      }if (!_import2['default'].isUndefined(this.props.maxLength) && input.length > this.props.maxLength) {
        return false;
      }if (!_import2['default'].isUndefined(this.props.minLength) && input.length < this.props.minLength) {
        return false;
      }if (!this.props.allowLeadingZeros && input !== '0' && input.search(/^0/) !== -1) {
        return false;
      }var intValue = parseInt(input, 10);
      if (isNaN(intValue)) {
        return false;
      }if (!_import2['default'].isUndefined(this.props.max) && intValue > this.props.max) {
        return false;
      }if (!_import2['default'].isUndefined(this.props.min) && intValue < this.props.min) {
        return false;
      }return true;
    }
  }, {
    key: 'describe',
    value: function describe() {
      return _createElement$Phrase.createElement(_Validator2['default'], { validate: this.validate.bind(this) });
    }
  }], [{
    key: 'defaultProps',
    get: function () {
      return { allowLeadingZeros: true };
    }
  }]);

  return DigitString;
})();

exports['default'] = DigitString;
module.exports = exports['default'];