import history from '../history'
const axios = require('axios');

export default class ApiProfissional {

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