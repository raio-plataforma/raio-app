import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const mobile = '576px'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media(min-width: ${mobile}) {
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
  }
`
const Label = styled.label`
  display: flex;
  margin-bottom: 10px;
  color: #FFFF;
  font-weight: 500;
  @media(min-width: ${mobile}) {
    width: 50%;
  }
`
const Checkbox = styled.input`
  margin-right: 10px;
`

const Checkboxes = ({ label, register, name, fields }) => (
  <div className="field">
    <Typography color="primary" variant="h6">{label}</Typography>
    <Wrapper>
      {fields.map(item => {
        const checkedItem = typeof item !== 'string' ? item.name : item
        return (
          <Label key={uuid()} className="control checkbox">
            <Checkbox
              type="checkbox"
              name={`${name}[${checkedItem}]`}
              ref={register}
            />
            <Typography color="primary">{checkedItem}</Typography>
          </Label>
        )
      })}
    </Wrapper>
  </div>
)

Checkboxes.propTypes = {
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
}

export default Checkboxes