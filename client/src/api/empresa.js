import { json } from 'body-parser';

const axios = require('axios');

export default class ApiEmpresa {

  async getAllCount(funErro = ()=>{}) {
    return new Promise(async(sucesso, erro)=>{

      var config = {
        method: 'get',
        url: '/api/enterprise/all/count',
        headers: {
          'Authorization': localStorage.getItem("jwtToken")
        }
      };
  
      axios(config)
        .then(function (response) {
          response.data.countFormatado = (response.data.count).toLocaleString('pt-BR');
          sucesso(response.data);
        })
        .catch(function (error) {
          console.error(error);
          funErro();
          erro(error);
        });
    })
  }

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