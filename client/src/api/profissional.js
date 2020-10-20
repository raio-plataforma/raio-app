import history from '../history'
import statesJSON from '../assets/states.json';
const axios = require('axios');

export default class ApiProfissional {

  async getById(id) {
    return new Promise(async(sucesso, erro)=>{

      var config = {
        method: 'get',
        url: '/api/professional/'+id,
        headers: {
          'Authorization': localStorage.getItem("jwtToken")
        }
      };
  
      axios(config)
        .then(function (response) {
          let resposta = response.data;
          resposta.stateName = statesJSON.filter(function(i) { return String(i.id) === String(resposta.state); });
          resposta.stateName = resposta.stateName[0].name;
          sucesso(resposta);
        })
        .catch(function (error) {
          console.error(error);
          erro(error);
        });
    })

  }

  async getTodos() {
    return new Promise(async(sucesso, erro)=>{

      var config = {
        method: 'get',
        url: '/api/professional/all',
        headers: {
          'Authorization': localStorage.getItem("jwtToken")
        }
      };
  
      axios(config)
        .then(function (response) {
          let resposta = response.data;
          sucesso(resposta);
        })
        .catch(function (error) {
          console.error(error);
          erro(error);
        });
    })

  }

  async applyJob(body, linkRedirect = '/listagem/candidaturas') {
    return new Promise(async(sucesso, erro)=>{
      try {
        let response = await axios.post(`/api/job/apply`, body)
        if(linkRedirect){
          history.push(linkRedirect)
        }else{
          window.location.reload();
        }
        sucesso(response);
      }
      catch (err) {
        let error = err.response.data && err.response.data.job
        erro(error);
      }
    })
  }

}