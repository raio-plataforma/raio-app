import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: "APP_USR-644853399630358-091722-c547e83404160670c73b75d3306b3687-301619184"
});

export default class ApiMercadoPago {

  async prepararBotaoDePagamento() {
    return new Promise(async (responder) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");

      // Cria um objeto de preferência
      let preference = {
        items: [
          {
            title: 'Meu produto',
            unit_price: 10,
            currency_id: "BRL",
            quantity: 1,
          }
        ],
        external_reference: "ID-DO-SISTEMA"
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
          responder(body.id)
        })
        .catch(error => responder("ERRO"));

    });
  }

  criarPagamento() {
    mercadopago.payment.create({
      description: 'Buying a PS4',
      transaction_amount: 10,
      payment_method_id: 'rapipago',
      payer: {
        email: 'test_user_3931694@testuser.com',

        identification: {
          type: 'DNI',
          number: '34123123'
        }

      }
    }).then(function (mpResponse) {
      console.log(mpResponse);
    }).catch(function (err) {
      console.log(err);
    });
  }

  // listaMeiosPagamentos() {
  //   mercadopago.payment.create().then(function (mpResponse) {
  //     console.log(mpResponse);
  //   }).catch(function (err) {
  //     console.log(err);
  //   });
  // }

}