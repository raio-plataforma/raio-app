import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FooterContent = styled.div`
  flex-grow: 1;
  padding: 0 0 0 84.7px;

  & a {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    text-decoration: none;
    margin-right: 35px;
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
`

const StyledFooter = styled.footer`
  ${props => props.fixed && `
    position: absolute;
    bottom: 0;
  `}
  display: flex;
  align-items: center;
  height: 94px;
  background: #d1913c;
  padding: 0 150px;
  overflow: hidden;
  width: auto;
`

const Footer = ({ children }) => (
  <StyledFooter className="footer">
    <FooterContent className="content">
      {children}
    </FooterContent>
  </StyledFooter>
)

const { oneOfType, node, func } = PropTypes

Footer.propTypes = {
  /** The content of the footer. */
  children: oneOfType([node, func]),
}

Footer.displayName = 'Footer'

/** @component */
export default Footer
