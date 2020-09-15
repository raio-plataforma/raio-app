import {thunk, action} from 'easy-peasy'
import axios from 'axios'

const vacancyModel = {
    getAllVacancies: thunk(async(actions, payload) => {
        // all specific enterpise vacancies
        try
        {
            const res = payload && await axios.get(`/api/job/all/${payload}`);
            actions.setVacancies(res && res.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }),
    getAllJobs: thunk(async(actions, payload) => {
        try
        {
            console.log(payload);
            return await axios.get('/api/job/', {params: payload})
        }
        catch(err)
        {
            console.log(err);
            const error = err.response.data;
            actions.setError({...error})
        }
    }),
    getAllJobProfs: thunk(async(actions, payload) => {
        try
        {
            const res = await axios.get('/api/job/profs/' + payload);
            console.log(res);

            actions.setVacancyProfs(res.data);
        }
        catch(err)
        {
            console.log(err);
            const error = err.response.data;
            actions.setError({...error});
        }
    }),
    vacancies: [],
    setVacancies: action((state, payload) => ({
        vacancies: payload
    })),
    vacancyProfs:[],
    setVacancyProfs: action((state, payload) => ({
        vacancyProfs: payload
    })),
    error: {},
    setError: action((state, payload) => ({
        error: payload
    }))
};

export default vacancyModel
