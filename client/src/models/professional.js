import { thunk, action } from 'easy-peasy'
import history from '../history'
import axios from 'axios'

const professionalModel = {
  applyJob: thunk(async (actions, payload) => {
    try {
      await axios.post(`/api/job/apply`, payload)
      return history.push(`/dashboard/profissional`)
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.job
      actions.setError(error)
    }
  }),
  deleteMyJob: thunk(async (actions, payload) => {
    try {
      console.log(payload)
      await axios.delete(`/api/job/myjobs/${payload}`)
      return history.replace(`/listagem/candidaturas`)
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.job
      actions.setError(error)
    }
  }),
  getMyJobs: thunk(async (actions, payload) => {
    try {
      return  await axios.get(`/api/job/myjobs/${payload}`)
    }
    catch (err) {
      console.log(err)
      const error = err.response.data
      actions.setError({...error})
    }
  }),
  getAllProfessionals: thunk(async (actions, payload) => {
    try {
      const professionals = await axios.get('/api/professional/all')
      const users = await axios.get('/api/user/all')

      const fuse = (users.data)
        .filter(userFilter => userFilter.type === 'professional')
        .map(user => {
          const professional = (professionals.data).filter(i => i.user_id === user._id)
          console.log('prof =>', professional, user)
          if (professional.length > 0) {
            return {
              ...professional[0],
              ...user,
            }
          }
          return false
        })
      actions.setProfessionals(fuse.filter(op => op.name))
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
      console.log('getProfessionalById', professional)
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
      console.log('deu ruim')
    }
  }),
  editProfessional: thunk(async (actions, payload) => {
    try {
      await axios.put(`/api/professional/edit/${payload.id}`, payload)
      return history.push(`/dashboard/profissional`)
    }
    catch (e) {
      actions.setError(e)
    }
  }),
  professionals: [],
  setProfessionals: action((state, payload) => {
    return ({
      professionals: payload
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
