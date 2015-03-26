/** @jsx createElement */
/* eslint-env mocha */

import {createElement, Phrase} from 'lacona-phrase'
import DigitString from '..'
import {expect} from 'chai'
import fulltext from 'lacona-util-fulltext'
import {Parser} from 'lacona'

function from (i) {const a = []; for (let x of i) a.push(x); return a}

describe('DigitString', () => {
  let parser, data

  beforeEach(() => {
    parser = new Parser()
  })

  it('handles a digit string with no min/max', () => {
    parser.sentences = [<DigitString />]

    data = from(parser.parse('123'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('123')
    expect(data[0].result).to.equal(123)

    data = from(parser.parse('123f'))
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a min', () => {
    parser.sentences = [<DigitString min={5} />]

    data = from(parser.parse('7'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('7')
    expect(data[0].result).to.equal(7)

    data = from(parser.parse('5'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('5')
    expect(data[0].result).to.equal(5)

    data = from(parser.parse('3'))
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a max', () => {
    parser.sentences = [<DigitString max={5} />]

    data = from(parser.parse('3'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('3')
    expect(data[0].result).to.equal(3)

    data = from(parser.parse('5'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('5')
    expect(data[0].result).to.equal(5)

    data = from(parser.parse('7'))
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a min and a max', () => {
    parser.sentences = [<DigitString min={3} max={5} />]

    data = from(parser.parse('2'))
    expect(data).to.have.length(0)

    data = from(parser.parse('3'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('3')
    expect(data[0].result).to.equal(3)

    data = from(parser.parse('4'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('4')
    expect(data[0].result).to.equal(4)

    data = from(parser.parse('5'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('5')
    expect(data[0].result).to.equal(5)

    data = from(parser.parse('6'))
    expect(data).to.have.length(0)
  })
})
