const axios = require('axios');

export default class ApiVaga {

  async getTodas() {
    return new Promise(async(sucesso, erro)=>{
      var config = {
        method: 'get',
        url: '/api/job/',
        headers: {
          'Authorization': localStorage.getItem("jwtToken")
        }
      };
  
      axios(config)
        .then(function (response) {
          sucesso(response.data);
        })
        .catch(function (error) {
          console.error(error);
          erro(error);
        });
    })

  }

}