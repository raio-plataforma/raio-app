import { thunk, action } from 'easy-peasy'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import setAuthToken from '../utils/setAuthToken'
import history from '../history'
import { isEmpty, getUserType } from '../utils/service'

const authModel = {
  authUser: thunk(async (actions, payload) => {
    try {
      const res = await axios.post('/api/user/login', payload)

      // Set token to localStorage
      const { token } = res.data
      console.log(token)
      localStorage.setItem('jwtToken', token)
  
      // Set token to auth header
      setAuthToken(token)
  
      // Decode token to get user data
      const decoded = jwtDecode(token)

      // Set current user
      actions.setAuth({
        isAuthenticated: !isEmpty(decoded),
        user: decoded
      })

      localStorage.removeItem('user_type')
      
      try {
        const check = await axios.get('/api/user/has-additional-register')
        const type = getUserType(decoded.type)
        console.log({type})
        
        if (check.data.hasAdditionalRegister || type === 'admin') {
          return history.push(`/dashboard/${type}`)
        }
        
        return history.push(`/cadastro/${type}`)
      }
      catch (err) {
        console.log(2, {err})
        // throw err
      }
    }
    catch (err) {
      const error = err.response.data && err.response.data.login
      console.log(error)
      return actions.setErrors(error)
    }
  }),
  logoutUser: thunk(async (actions, payload) => {
     // Remove token from localStorage
     localStorage.removeItem('jwtToken')

     // Remove auth header for future requests
     setAuthToken(false)
 
     // Set the current user to {} wich will set isAuthenticated to false
     actions.setAuth({
       isAuthenticated: false,
       user: {}
     })
 
     history ? history.push('/') : window.location.href = '/'
  }),
  auth: {
    isAuthenticated: false,
    user: {}
  },
  setAuth: action((state, payload) => ({
    auth: { ...payload }
  })),
  error: {},
  setErrors: action((state, payload) => ({
    error: payload
  }))
}

export default authModel