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
        if (input.search(/^[0-9]+$/) === -1) {
          return false;
        }if (!_.isUndefined(this.props.maxLength) && input.length > this.props.maxLength) {
          return false;
        }if (!_.isUndefined(this.props.minLength) && input.length < this.props.minLength) {
          return false;
        }if (!this.props.allowLeadingZeros && input !== "0" && input.search(/^0/) !== -1) {
          return false;
        }var intValue = parseInt(input, 10);
        if (isNaN(intValue)) {
          return false;
        }if (!_.isUndefined(this.props.max) && intValue > this.props.max) {
          return false;
        }if (!_.isUndefined(this.props.min) && intValue < this.props.min) {
          return false;
        }return true;
      }
    },
    describe: {
      value: function describe() {
        return createElement(Validator, { validate: this.validate.bind(this) });
      }
    }
  }, {
    defaultProps: {
      get: function () {
        return { allowLeadingZeros: true };
      }
    }
  });

  return DigitString;
})();

module.exports = DigitString;