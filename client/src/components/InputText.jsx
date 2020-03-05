import React from "react"
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';

const InputText = (
  {
    label,
    name,
    type,
    icon,
    help,
    error,
    register,
    placeholder
  }) => {
  return (
    <div className="field">
      <Typography variant="subtitle2" component="span">{label}</Typography>
      <div
        className={`control ${icon ? "has-icons-left" : ""} ${error ? "has-icons-right" : ""}`}
      >
        <input
          className={`input ${error ? "is-danger" : ""}`}
          type={type}
          placeholder={placeholder}
          name={name}
          ref={register}
        />
        {icon && (
          <span
            className="icon is-left is-small"
            style={{ 'zIndex': 'unset ' }}
          >
            <i className={`fas ${icon}`} />
          </span>
        )}
        {error && (
          <span className="icon is-right is-small">
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>
      {help && <p className="help">{help}</p>}
      {error &&
        <p className="help is-danger">
          {error}
        </p>
      }
    </div>
  )
}

InputText.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  help: PropTypes.string,
  register: PropTypes.func.isRequired
}

InputText.defaultProps = {
  type: "text",
  help: undefined,
  error: undefined
}

export default InputText
