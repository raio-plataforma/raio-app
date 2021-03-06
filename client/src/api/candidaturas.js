import history from '../history'
import ApiProfissional from './profissional';
const axios = require('axios');

export default class ApiCandidaturas {

  async putStatusById(id, body, funErro = () => { }) {
    return new Promise(async (sucesso, erro) => {

      var config = {
        method: 'post',
        url: '/api/job/editar/status/candidatura/' + id,
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

  async getAllCount(userId, funErro = () => { }) {
    return new Promise(async (sucesso, erro) => {

      var config = {
        method: 'get',
        url: '/api/job/myJobs/all/count?userId=' + userId,
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

  async getByJobId(id, funErro = () => { }) {
    return new Promise(async (sucesso, erro) => {

      var config = {
        method: 'get',
        url: '/api/job/candidaturas/' + id,
        headers: {
          'Authorization': localStorage.getItem("jwtToken")
        }
      };

      axios(config)
        .then(async function (response) {
          let data = response.data;
          if (data.length === 0) {
            sucesso(data);
          } else {
            for (let i = 0; i < data.length; i++) {
              let user = data[i]._user;
              if (user.type == "professional") {
                let userProf = await ApiProfissional.prototype.getById(user._id);
                data[i]['userProf'] = userProf;
              } else {
                delete data[i];
              }

              if (parseInt(i) === parseInt(data.length - 1)) {
                setTimeout(() => {
                  sucesso(data);
                  console.log(data);
                }, 1000);
              }
            }
          }
        })
        .catch(function (error) {
          console.error(error);
          funErro();
          erro(error);
        });
    })

  }


  async getByUserId(id, funErro = () => { }) {
    return new Promise(async (sucesso, erro) => {

      var config = {
        method: 'get',
        url: '/api/job/myjobs/' + id,
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