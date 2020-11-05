import { json } from 'body-parser';
import ApiProfissional from './profissional';

const axios = require('axios');

export default class ApiVaga {

  async postAdmin(body, funErro = ()=>{}) {
    return new Promise(async(sucesso, erro)=>{

      var config = {
        method: 'post',
        url: '/api/job/admin',
        data: body,
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

  async getAllCount(status, enterprise_id = "", funErro = ()=>{}) {
    return new Promise(async(sucesso, erro)=>{

      var config = {
        method: 'get',
        url: '/api/job/all/count?status='+status+'&enterprise_id='+enterprise_id,
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

  async getBySlugOrId(input, funErro = () => { }, userId = "") {
    return new Promise(async (sucesso, erro) => {
      let listaVagas = await this.getTodas(userId);

      // Validando se o slug ou id da vaga está valido
      let ok = false;
      for (var j = 0; j < listaVagas.length; ++j) {
        if (listaVagas[j].slug == input) {
          listaVagas = listaVagas[j];
          ok = true;
          break;
        } else
          if (listaVagas[j].id == input) {
            listaVagas = listaVagas[j];
            ok = true;
            break;
          } else
            if (listaVagas[j]._id == input) {
              listaVagas = listaVagas[j];
              ok = true;
              break;
            }
      }
      if (ok == false) {
        funErro();
        erro("ERRO: Não achamos ninguem com esse ID ou Slug.");
      } else {
        sucesso(listaVagas);
      }

    })
  }

  async getById(id, funErro = () => { }) {
    return new Promise(async (sucesso, erro) => {
      let listaVagas = await this.getTodas();

      // Validando se o id da vaga está valido
      let ok = false;
      for (var j = 0; j < listaVagas.length; ++j) {
        if (listaVagas[j].id == id) {
          listaVagas = listaVagas[j];
          ok = true;
          break;
        } else
          if (listaVagas[j]._id == id) {
            listaVagas = listaVagas[j];
            ok = true;
            break;
          }
      }
      if (ok == false) {
        funErro();
        erro("ERRO: Não achamos ninguem com esse ID.");
      } else {
        for (let index = 1; index < 4; index++) {
          console.log(index);
          if (listaVagas['top'+index]) {
            if (listaVagas['top'+index]['type'] == "professional") {
            let userProf = await ApiProfissional.prototype.getById(listaVagas['top'+index]['_id']);
            listaVagas['top'+index+'Prof'] = userProf;
            }
          }
        }
        sucesso(listaVagas);
      }

    })
  }

  async getTodas(userId = "", status = "") {
    return new Promise(async (sucesso, erro) => {
      let url;

      if (userId) {
        url = '/api/job/?userId=' + userId;
      } else
        if (status) {
          url = '/api/job/all?status=' + status;
        } else {
          url = '/api/job/all';
        }

      var config = {
        method: 'get',
        url,
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

  async putById(id, body, funErro = () => { }) {
    return new Promise(async (sucesso, erro) => {
      var config = {
        method: 'put',
        url: "/api/job/" + id,
        json: true, 
        data: body,
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