"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/** @jsx createElement */
/* eslint-env mocha */

var _laconaPhrase = require("lacona-phrase");

var createElement = _laconaPhrase.createElement;
var Phrase = _laconaPhrase.Phrase;

var DigitString = _interopRequire(require(".."));

var expect = require("chai").expect;

var fulltext = _interopRequire(require("lacona-util-fulltext"));

var Parser = require("lacona").Parser;

function from(i) {
  var a = [];var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = i[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var x = _step.value;
      a.push(x);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return a;
}

describe("DigitString", function () {
  var parser = undefined,
      data = undefined;

  beforeEach(function () {
    parser = new Parser();
  });

  it("handles a digit string with no min/max", function () {
    parser.sentences = [createElement(DigitString, null)];

    data = from(parser.parse("123"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("123");
    expect(data[0].result).to.equal("123");

    data = from(parser.parse("123f"));
    expect(data).to.have.length(0);
  });

  it("handles a digit string with a min", function () {
    parser.sentences = [createElement(DigitString, { min: 5 })];

    data = from(parser.parse("7"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("7");
    expect(data[0].result).to.equal("7");

    data = from(parser.parse("5"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("5");
    expect(data[0].result).to.equal("5");

    data = from(parser.parse("3"));
    expect(data).to.have.length(0);
  });

  it("handles a digit string with a max", function () {
    parser.sentences = [createElement(DigitString, { max: 5 })];

    data = from(parser.parse("3"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("3");
    expect(data[0].result).to.equal("3");

    data = from(parser.parse("5"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("5");
    expect(data[0].result).to.equal("5");

    data = from(parser.parse("7"));
    expect(data).to.have.length(0);
  });

  it("handles a digit string with a min and a max", function () {
    parser.sentences = [createElement(DigitString, { min: 3, max: 5 })];

    data = from(parser.parse("2"));
    expect(data).to.have.length(0);

    data = from(parser.parse("3"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("3");
    expect(data[0].result).to.equal("3");

    data = from(parser.parse("4"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("4");
    expect(data[0].result).to.equal("4");

    data = from(parser.parse("5"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("5");
    expect(data[0].result).to.equal("5");

    data = from(parser.parse("6"));
    expect(data).to.have.length(0);
  });

  it("handles a digit string with a minLength", function () {
    parser.sentences = [createElement(DigitString, { minLength: 2 })];

    data = from(parser.parse("04"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("04");
    expect(data[0].result).to.equal("04");

    data = from(parser.parse("403"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("403");
    expect(data[0].result).to.equal("403");

    data = from(parser.parse("3"));
    expect(data).to.have.length(0);
  });

  it("handles a digit string with a maxLength", function () {
    parser.sentences = [createElement(DigitString, { maxLength: 3 })];

    data = from(parser.parse("02"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("02");
    expect(data[0].result).to.equal("02");

    data = from(parser.parse("403"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("403");
    expect(data[0].result).to.equal("403");

    data = from(parser.parse("4032"));
    expect(data).to.have.length(0);
  });

  it("handles a digit string with a minLength and a maxLength", function () {
    parser.sentences = [createElement(DigitString, { minLength: 2, maxLength: 4 })];

    data = from(parser.parse("2"));
    expect(data).to.have.length(0);

    data = from(parser.parse("03"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("03");
    expect(data[0].result).to.equal("03");

    data = from(parser.parse("440"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("440");
    expect(data[0].result).to.equal("440");

    data = from(parser.parse("4242"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("4242");
    expect(data[0].result).to.equal("4242");

    data = from(parser.parse("123456"));
    expect(data).to.have.length(0);
  });

  it("handles a digit string with a all validators", function () {
    parser.sentences = [createElement(DigitString, { minLength: 3, maxLength: 4, min: 10, max: 8000 })];

    data = from(parser.parse("002"));
    expect(data).to.have.length(0);

    data = from(parser.parse("20"));
    expect(data).to.have.length(0);

    data = from(parser.parse("100"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("100");
    expect(data[0].result).to.equal("100");

    data = from(parser.parse("0777"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("0777");
    expect(data[0].result).to.equal("0777");

    data = from(parser.parse("7000"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("7000");
    expect(data[0].result).to.equal("7000");

    data = from(parser.parse("8500"));
    expect(data).to.have.length(0);

    data = from(parser.parse("07500"));
    expect(data).to.have.length(0);
  });
});