import { thunk, action } from 'easy-peasy'
import history from '../history'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

const userModel = {
    user: {},
    error: {},
    getUser: thunk(async (actions, payload) => {
        try {
            const user = await axios.get('/api/user/current')
            if (payload !== "admin") {
                const userTypeData = await axios.get(`/api/${payload}`)

                // Set current user profile
                actions.setUser({
                    ...user.data,
                    ...userTypeData.data,
                    enterprise_id: userTypeData.data._id
                })
            } else {

                // Set current user profile
                actions.setUser({
                    ...user.data
                })
            }
        }
        catch (e) {
            console.error(e);
            history.push(`/cadastro/${payload}`)
            throw e
        }
    }),
    deleteUser: thunk(async (actions, payload) => {
        try {
            const res = await axios.delete(`/api/user/${payload}`)
            console.log(res)

            localStorage.removeItem('jwtToken')
            setAuthToken(false)

            window.location.reload()
        }
        catch (e) {
            throw e
        }
    }),
    getUserById: thunk(async (actions, payload) => {
        try {
            const user = await axios.get(`/api/user/${payload}`)
            const userTypeData = await axios.get(`/api/professional`)
            // Set current user profile
            actions.setUser({
                id: user.data._id,
                name: user.data.name,
                email: user.data.email,
                phone: user.data.phone,
                gender: user.data.gender,
                type: user.data.type,
                self_declaration: user.data.self_declaration,
                ...userTypeData.data,
                enterprise_id: userTypeData.data._id
            })
        }
        catch (e) {
            actions.setError(e)
        }
    }),
    editUser: thunk(async (actions, payload) => {
        try {
            await axios.put(`/api/user/edit/${payload.type}/${payload.id}`, payload)
            const type = payload.type === 'enterprise' ? 'empresa' : 'profissional'
            return history.push(`/dashboard/${type}`)
        }
        catch (e) {
            actions.setError(e)
        }
    }),
    getAllUsers: thunk(async (actions) => {
        try {
            return await axios.get('/api/user/all')
        }
        catch (err) {
            console.log(err)
            const error = err.response.data && err.response.data.users
            actions.setError(error)
        }
    }),
    getProfessionalAll: thunk(async (actions, payload) => {
        try {
            console.log('getProfessionalAll', payload)
            return await axios.post(
                '/api/professional/all',
                payload
            )
        }
        catch (err) {
            console.log(err)
            return err.response
        }
    }),
    setUser: action((state, payload) =>
        ({
            user: { ...payload }
        })
    ),
    setError: action((state, payload) => ({
        error: payload
    }))
}

export default userModel
