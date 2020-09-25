import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: "APP_USR-644853399630358-091722-c547e83404160670c73b75d3306b3687-301619184"
});

export default class ApiMercadoPago {

  async criarLinkDePagamento(vaga) {
    return new Promise(async (responder) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");
      console.log(vaga);

      // Cria um objeto de preferência
      let preference = {
        items: [
          {
            title: 'Ativação vaga '+vaga.title,
            description: 'Ativação da vaga '+vaga.title+' '+vaga.hiring_type[0]+', área '+vaga.function+', empresa '+vaga.enterprise_name+' do estado '+vaga.stateName,
            unit_price: vaga.valorDevedor,
            currency_id: "BRL",
            quantity: 1,
          }
        ],
        external_reference: "VAGA | "+vaga._id+" | "+vaga.id
      };

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(preference),
        redirect: 'follow'
      };

      fetch("https://api.mercadopago.com/checkout/preferences?access_token=APP_USR-644853399630358-091722-c547e83404160670c73b75d3306b3687-301619184", requestOptions)
        .then( async (response) => {
          let body = await response.json();
          console.log(body);
          responder(body.init_point)
        })
        .catch(error => responder("ERRO"));

    });
  }

}