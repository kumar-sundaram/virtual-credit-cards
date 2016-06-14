'use strict'

var State = require('dover')
var Observ = require('observ')
var value = require('observ-value')
var pipe = require('value-pipe')

var h = require('virtual-dom/h')
var changeEvent = require('value-event/change')
var numeric = require('numeric-pattern')
var card = require('creditcards/card')
var cvc = require('creditcards/cvc')

var NAME = 'cc-csc'

module.exports = CardNumberInput

function CardNumberInput (data) {
  data = data || {}

  return State({
    value: Observ(data.value || ''),
    channels: {
      change: change
    }
  })
}

function change (state, data) {
  pipe(card.parse, state.value.set)(data[NAME])
}

CardNumberInput.validate = function validate (state, type) {
  var code = value(state.value)
  return cvc.isValid(code, type)
}

CardNumberInput.render = function render (state) {
  return h('input', {
    name: NAME,
    autocomplete: NAME,
    type: 'text',
    placeholder: 'CVC',
    pattern: numeric,
    maxLength: 4,
    value: state.value,
    'ev-event': changeEvent(state.channels.change)
  })
}
