import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const professionalModel = {
  getAllProfessionals: thunk(async (actions, payload) => {
    try {
      const res = await axios.get('/api/professional/all')

      actions.setprofessionals(
        res.data.filter(user => user.type === 'professional')
      )
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.professionals
      actions.setError(error)
    }
  }),
  getProfessionalById: thunk(async (actions, payload) => {
    try {
      const professional = await axios.get(`/api/professional/${payload}`)
      console.log(professional.data)
      // Set current user profile
      
      actions.setProfessionalForEdit({
        id: professional.data._id,
        birthday: professional.data.birthday,
        pcd: professional.data.pcd,
        home_state: professional.data.home_state,
        state: professional.data.state,
        city: professional.data.city,
        address: professional.data.address,
        education: professional.data.education,
        formation_institution: professional.data.formation_institution,
        cnpj: professional.data.cnpj,
        cnpj_type: professional.data.cnpj_type,
        identity_content: professional.data.identity_content,
        identity_segments: professional.data.identity_segments,
        expertise_areas: professional.data.expertise_areas,
        apan_associate: professional.data.apan_associate,
        links: professional.data.links,
        bio: professional.data.bio,
      })
    }
    catch (e) {
      actions.setError(e)
    }
  }),
  professionals: [],
  setProfessionals: action((state, payload) => {
    console.log('setPro =>', payload)
    return ({
      professionals: [...payload]
    })
  }),
  setProfessionalForEdit: action((state, payload) => {
    console.log('setPro =>', payload)
    return ({
      professional: payload
    })
  }),
  error: {},
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default professionalModel