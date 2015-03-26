"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/** @jsx createElement */

var _laconaPhrase = require("lacona-phrase");

var createElement = _laconaPhrase.createElement;
var Phrase = _laconaPhrase.Phrase;

var Validator = _interopRequire(require("lacona-phrase-validator"));

var _ = _interopRequire(require("lodash"));

var DigitString = (function () {
  function DigitString() {
    _classCallCheck(this, DigitString);
  }

  _createClass(DigitString, {
    validate: {
      value: function validate(input) {
        if (input.match(/^[0-9]+$/)) {
          if (this.props.max || this.props.min) {
            var intValue = parseInt(input, 10);
            return !isNaN(intValue) && (_.isUndefined(this.props.max) || this.props.max >= intValue) && (_.isUndefined(this.props.min) || this.props.min <= intValue);
          }
          return true;
        }
        return false;
      }
    },
    getValue: {
      value: function getValue(result) {
        return parseInt(result, 10);
      }
    },
    describe: {
      value: function describe() {
        return createElement(Validator, { validate: this.validate.bind(this) });
      }
    }
  });

  return DigitString;
})();

module.exports = DigitString;