import mercadopago from 'mercadopago';

mercadopago.configure({
  sandbox: true,
  access_token: "TEST-644853399630358-091722-edc73f4a076c3939f5661d9fc7db4417-301619184"
});

export default class ApiMercadoPago {

  prepararBotaoDePagamento() {
    return new Promise((sucesso, erro)=>{
      // Cria um objeto de preferência
      let preference = {
        items: [
          {
            title: 'Meu produto',
            unit_price: 100,
            quantity: 1,
          }
        ]
      };
  
      mercadopago.preferences.create(preference)
        .then(function (response) {
          console.log(response.body.id);
          sucesso(response.body.id);
        }).catch(function (error) {
          console.log(error);
          erro("ERRO");
        });
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

  listaMeiosPagamentos() {
    mercadopago.payment.create().then(function (mpResponse) {
      console.log(mpResponse);
    }).catch(function (err) {
      console.log(err);
    });
  }

}