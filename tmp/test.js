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
    expect(data[0].result).to.equal(123);

    data = from(parser.parse("123f"));
    expect(data).to.have.length(0);
  });

  it("handles a digit string with a min", function () {
    parser.sentences = [createElement(DigitString, { min: 5 })];

    data = from(parser.parse("7"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("7");
    expect(data[0].result).to.equal(7);

    data = from(parser.parse("5"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("5");
    expect(data[0].result).to.equal(5);

    data = from(parser.parse("3"));
    expect(data).to.have.length(0);
  });

  it("handles a digit string with a max", function () {
    parser.sentences = [createElement(DigitString, { max: 5 })];

    data = from(parser.parse("3"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("3");
    expect(data[0].result).to.equal(3);

    data = from(parser.parse("5"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("5");
    expect(data[0].result).to.equal(5);

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
    expect(data[0].result).to.equal(3);

    data = from(parser.parse("4"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("4");
    expect(data[0].result).to.equal(4);

    data = from(parser.parse("5"));
    expect(data).to.have.length(1);
    expect(fulltext.all(data[0])).to.equal("5");
    expect(data[0].result).to.equal(5);

    data = from(parser.parse("6"));
    expect(data).to.have.length(0);
  });
});