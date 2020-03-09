import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const professionalModel = {
  professionals: [],
  error: {},

  getAllProfessionals: thunk(async (actions, payload) => {
    try {
      const professionals = await axios.get('/api/professional/all')
      const users = await axios.get('/api/user/all')

      const fuse = (users.data)
        .filter(userFilter => userFilter.type === 'professional')
        .map(user => {
          const professional = (professionals.data)
            .filter(i => i.user_id === user._id)[0]
          if (!professional) 
            return false  
          return {
            ...professional,
            ...user,
            professional_id: user._id,
            name: user.name
          }
        })

      actions.setProfessional({professionals: fuse.filter(registered => registered.name)})
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.status
      actions.setError(error)
    }
  }),
  setProfessional: action((state, payload) => ({
    ...payload
  })),
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default professionalModel