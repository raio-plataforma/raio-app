const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput (data) {
  const errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  // Email
  if (!Validator.isEmail(data.email)) {
    errors.email = 'E-mail ou senha inválidos.'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Digite seu e-mail'
  }

  // Password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Digite uma senha'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
