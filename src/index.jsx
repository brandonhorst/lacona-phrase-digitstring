/** @jsx createElement */
import {createElement, Phrase} from 'lacona-phrase'
import Validator from 'lacona-phrase-validator'
import _ from 'lodash'

export default class DigitString {
  static get defaultProps () {return {allowLeadingZeros: true}}

  validate (input) {
    if (input.search(/^[0-9]+$/) === -1) return false

    if (!_.isUndefined(this.props.maxLength) && input.length > this.props.maxLength) return false
    if (!_.isUndefined(this.props.minLength) && input.length < this.props.minLength) return false

    if (!this.props.allowLeadingZeros && input !== '0' && input.search(/^0/) !== -1) return false

    const intValue = parseInt(input, 10)
    if (isNaN(intValue)) return false
    if (!_.isUndefined(this.props.max) && intValue > this.props.max) return false
    if (!_.isUndefined(this.props.min) && intValue < this.props.min) return false

    return true
  }

  describe () {
    return <Validator validate={this.validate.bind(this)} />
  }
}
