import React from 'react'
import { NavLink } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { Button } from '@material-ui/core'


const LinkButtonNav = ({ children, to, target, onClick = () => { }, href = null }) => {
  const toggleMenu = useStoreActions(actions => actions.ui.toggleMenu)
  const { menuOpened } = useStoreState(state => state.ui)

  return (
    <>
      {
        href != null ?(
          <a href={href} target={target} className="LinkButtonNav">
            <Button onClick={() => { toggleMenu(!menuOpened); onClick() }}>
              {children}
            </Button>
          </a>
        ) : (
      <NavLink to={to} className="LinkButtonNav">
        <Button onClick={() => { toggleMenu(!menuOpened); onClick() }}>
          {children}
        </Button>
      </NavLink>
    )
    }
    </>
  )
}

export default LinkButtonNav
