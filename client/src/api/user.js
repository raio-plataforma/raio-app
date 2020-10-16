import history from '../history'
const axios = require('axios');

export default class ApiUser {

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
        erro(err);
      }
    })
  }

}