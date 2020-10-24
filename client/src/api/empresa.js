import { json } from 'body-parser';

const axios = require('axios');

export default class ApiEmpresa {

  async getTodas() {
    return new Promise(async (sucesso, erro) => {

      var config = {
        method: 'get',
        url: '/api/enterprise/all',
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