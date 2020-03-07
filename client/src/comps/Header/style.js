import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Wrapper = styled.nav`
  background-color: #200122;
  padding: 5px;
  transition: .3s all ease-in-out;
  display: flex;
  left: 0;

  &.opened {
    left: -320px;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

`

const StyledLogo = styled.img`
margin-left: 30px;
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #FC9B55;
  &:hover {
    color: #fff;
  }
`
const StyledBurger = styled.button`
  outline: none;
  background: transparent;
  position: relative;
  width: 32px;
  height: 15px;
  border: none;
  cursor: pointer;

  &:after,
  &:before,
  > span {
    content: '';
    width: 20px;
    height: 2px;
    background: #fc9b44;
    display: block;
    position: absolute;
  }

  &:before {
    top: 0;
  }

  &:after {
    top: 10px;
  }

  > span {
    top: 5px
  }
`

const StyledAside = styled.aside`
  transition: .3s all ease-in-out;
  position: fixed;
  right: -320px;
  top: 0;
  width: 320px;
  height: 100%;
  background: #6f0000;

  .buttons {
    padding: 24px 48px;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    left: 0;

    a,
    button {
      display: block;
      color: #fc9b44;
      width: 100%;
      text-align: left;
      font-weight: normal;
    }
  }

  &.opened {
    right: 0;
  }
`
export {
    Wrapper,
    StyledLogo,
    StyledNavLink,
    StyledBurger,
    StyledAside
}