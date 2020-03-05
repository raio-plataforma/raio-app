import { css } from 'styled-components'

export const px = (value, defaultValue) => {
  if (value && typeof value === 'string') {
    return value
  }

  const newValue = `${value || defaultValue || 0}px`
  return css`${newValue}`
}

export const emailValidation = () => (
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
)

export const isEmpty = (value) => {  
  return value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)
}

export const parseText = input => input.toLowerCase().split(' ').join('_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")

export const formatCheckboxFields = (field = []) => {
  const identifiers = Object.keys(field)
  return identifiers.filter((i) => field[i])
}

export const getUserType = (type) => {
  switch (type) {
    case 'enterprise':
    case 'empresa':
      return'empresa'
    case 'professional':
    case 'profissional':
      return'profissional'
    default:
      return'admin'
  }
}

export const validatingFields = (value) => {
  if (value) return value;

  switch (typeof value) {
      case "number":
          return 0;
      default:
          return "";
  }
}



