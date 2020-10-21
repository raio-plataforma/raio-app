import history from '../history'
const axios = require('axios');

export default class ApiUser {

  async deleteById(id, funErro = ()=>{}) {
    return new Promise(async(sucesso, erro)=>{

      var config = {
        method: 'delete',
        url: '/api/user/'+id,
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

  async getById(id, funErro = ()=>{}) {
    return new Promise(async(sucesso, erro)=>{

      var config = {
        method: 'get',
        url: '/api/user/'+id,
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


  async getTodos(tipo = false) {
    return new Promise(async(sucesso, erro)=>{
      let url;

      if (tipo) {
        url = '/api/user/all?tipo='+tipo;  
      } else {
        url = '/api/user/all';
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

  async getUserLogado(tipo = "admin") {
    return new Promise(async (sucesso, erro) => {
      try {

        if (!localStorage.getItem("jwtToken")) {
          sucesso({id: ""});
        }

        var config = {
          method: 'get',
          url: '/api/user/current',
          headers: {
            'Authorization': localStorage.getItem("jwtToken")
          }
        };

        let user = await axios(config);
        if (tipo !== "admin") {
          let userTypeData = await axios.get(`/api/${tipo}`)
          sucesso({
            ...user.data,
            ...userTypeData.data,
            enterprise_id: userTypeData.data._id
          });
        } else {
          sucesso({
            ...user.data
          });
        }
      }
      catch (err) {
        history.push(`/cadastro/${tipo}`)
        erro(err);
      }
    })
  }

}