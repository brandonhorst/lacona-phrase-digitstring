/** @jsx createElement */
import {createElement, Phrase} from 'lacona-phrase'
import Validator from 'lacona-phrase-validator'
import _ from 'lodash'

export default class DigitString {
  validate (input) {
    if (input.match(/^[0-9]+$/)) {
      if (this.props.max || this.props.min) {
        const intValue = parseInt(input, 10)
        return (
          !isNaN(intValue) &&
          (_.isUndefined(this.props.max) || this.props.max >= intValue) &&
          (_.isUndefined(this.props.min) || this.props.min <= intValue)
        )
      }
      return true
    }
    return false
  }

  getValue (result) {
    return parseInt(result, 10)
  }

  describe () {
    return <Validator validate={this.validate.bind(this)} />
  }
}
