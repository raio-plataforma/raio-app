import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const uiModel = {
  menuOpened: false,
  
  toggleMenu: action((state, payload) => ({
      menuOpened: payload
  }))
}

export default uiModel