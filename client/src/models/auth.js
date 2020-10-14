import {thunk, action} from 'easy-peasy'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import setAuthToken from '../utils/setAuthToken'
import history from '../history'
import {isEmpty, getUserType} from '../utils/service'

const authModel = {
    authUser: thunk(async(actions, payload) => {
        try
        {
            const res = await axios.post('/api/user/login', payload)

            // Set token to localStorage
            const {token} = res.data
            localStorage.setItem('jwtToken', token)

            // Set token to auth header
            setAuthToken(token)

            // Decode token to get user data
            const decoded = jwtDecode(token)

            // Set current user
            localStorage.setItem('menuAutoAbrir', 'true' );

            actions.setAuth({
                isAuthenticated: !isEmpty(decoded),
                user: decoded
            })

            localStorage.removeItem('user_type')

            try
            {
                const check = await axios.get('/api/user/has-additional-register')
                const type = getUserType(decoded.type)

                if(check.data.hasAdditionalRegister || type === 'admin')
                {
                    return history.push(`/dashboard/${type}`)
                }

                return history.push(`/cadastro/${type}`)
            }
            catch(err)
            {
                const error = err.response.data

                if(String(err.response.data.message)){
                    window.location.href = `/?errorLogin=true`;
                }

                return actions.setErrors({...error})
            }
        }
        catch(err)
        {
            const error = err.response?.data

            if(String(err.response.data.message)){
                window.location.href = `/?errorLogin=true`;
            }

            return actions.setErrors({...error})
        }
    }),
    forgotPwd: thunk(async(actions, payload) => {
        try
        {
            const res = await axios.post('/api/user/forgot-password', payload);
            console.log(res);
            return actions.setForgotResp({resp: res})
        }
        catch(err)
        {
            const error = err.response.data;
            return actions.setErrors({...error})
        }
    }),
    resetPwd: thunk(async(actions, payload) => {
        console.log(payload)

        try
        {
            const res = await axios.post('/api/user/reset/' + payload.token, payload)
            return actions.setForgotResp({resp: res})
        }
        catch(err)
        {
            const error = err.response.data
            return actions.setErrors({...error})
        }
    }),
    logoutUser: thunk(async(actions, payload) => {
        // Remove token from localStorage
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('menuAutoAbrir')

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
        auth: {...payload}
    })),
    setForgotResp: action((state, payload) => ({
        forgot: {...payload}
    })),
    error: {},
    setErrors: action((state, payload) => ({
        error: payload
    }))
}

export default authModel
