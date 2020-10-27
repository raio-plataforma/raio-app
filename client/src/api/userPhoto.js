import history from '../history'
const axios = require('axios');

export default class ApiPhoto {

  async getAll(filtros, funErro = ()=>{}) {
    return new Promise(async(sucesso, erro)=>{

      var config = {
        method: 'post',
        url: '/api/userPhotos/buscar',
        body: filtros,
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
          funErro();
          erro(error);
        });
    })

  }


  async deleteById(id, funErro = ()=>{}) {
    return new Promise(async(sucesso, erro)=>{

      var config = {
        method: 'post',
        url: '/api/userPhotos/deletar/'+id,
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
          funErro();
          erro(error);
        });
    })

  }

}