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
    expect(data[0].result).to.equal('123')

    data = from(parser.parse('123f'))
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a min', () => {
    parser.sentences = [<DigitString min={5} />]

    data = from(parser.parse('7'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('7')
    expect(data[0].result).to.equal('7')

    data = from(parser.parse('5'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('5')
    expect(data[0].result).to.equal('5')

    data = from(parser.parse('3'))
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a max', () => {
    parser.sentences = [<DigitString max={5} />]

    data = from(parser.parse('3'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('3')
    expect(data[0].result).to.equal('3')

    data = from(parser.parse('5'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('5')
    expect(data[0].result).to.equal('5')

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
    expect(data[0].result).to.equal('3')

    data = from(parser.parse('4'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('4')
    expect(data[0].result).to.equal('4')

    data = from(parser.parse('5'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('5')
    expect(data[0].result).to.equal('5')

    data = from(parser.parse('6'))
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a minLength', () => {
    parser.sentences = [<DigitString minLength={2} />]

    data = from(parser.parse('04'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('04')
    expect(data[0].result).to.equal('04')

    data = from(parser.parse('403'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('403')
    expect(data[0].result).to.equal('403')

    data = from(parser.parse('3'))
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a maxLength', () => {
    parser.sentences = [<DigitString maxLength={3} />]

    data = from(parser.parse('02'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('02')
    expect(data[0].result).to.equal('02')

    data = from(parser.parse('403'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('403')
    expect(data[0].result).to.equal('403')

    data = from(parser.parse('4032'))
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a minLength and a maxLength', () => {
    parser.sentences = [<DigitString minLength={2} maxLength={4} />]

    data = from(parser.parse('2'))
    expect(data).to.have.length(0)

    data = from(parser.parse('03'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('03')
    expect(data[0].result).to.equal('03')

    data = from(parser.parse('440'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('440')
    expect(data[0].result).to.equal('440')

    data = from(parser.parse('4242'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('4242')
    expect(data[0].result).to.equal('4242')

    data = from(parser.parse('123456'))
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a all validators', () => {
    parser.sentences = [<DigitString minLength={3} maxLength={4} min={10} max={8000} />]

    data = from(parser.parse('002'))
    expect(data).to.have.length(0)

    data = from(parser.parse('20'))
    expect(data).to.have.length(0)

    data = from(parser.parse('100'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('100')
    expect(data[0].result).to.equal('100')

    data = from(parser.parse('0777'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('0777')
    expect(data[0].result).to.equal('0777')

    data = from(parser.parse('7000'))
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('7000')
    expect(data[0].result).to.equal('7000')

    data = from(parser.parse('8500'))
    expect(data).to.have.length(0)

    data = from(parser.parse('07500'))
    expect(data).to.have.length(0)
  })
})
