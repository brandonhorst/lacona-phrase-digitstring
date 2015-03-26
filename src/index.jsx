/** @jsx createElement */
import {createElement, Phrase} from 'lacona-phrase'
import Validator from 'lacona-phrase-validator'
import _ from 'lodash'

export default class DigitString {
  validate (input) {
    if (!input.match(/^[0-9]+$/)) {
      return false
    }

    if ((!_.isUndefined(this.props.maxLength) && input.length > this.props.maxLength) ||
        (!_.isUndefined(this.props.minLength) && input.length < this.props.minLength)) {
      return false
    }

    const intValue = parseInt(input, 10)
    if (isNaN(intValue) ||
        (!_.isUndefined(this.props.max) && intValue > this.props.max) ||
        (!_.isUndefined(this.props.min) && intValue < this.props.min)) {
      return false
    }

    return true
  }

  describe () {
    return <Validator validate={this.validate.bind(this)} />
  }
}
