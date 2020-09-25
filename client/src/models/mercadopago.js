import mercadopago from 'mercadopago';

mercadopago.configure({
  sandbox: true,
  access_token: "TEST-644853399630358-091722-edc73f4a076c3939f5661d9fc7db4417-301619184"
});

export default class ApiMercadoPago {

  async prepararBotaoDePagamento() {
    return new Promise(async(sucesso, erro)=>{
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
  
      let response = await mercadopago.preferences.create(preference);
      if (responde.body.id) {
        console.log(response.body.id);
        sucesso(response.body.id);
      } else {
        console.error(response);
        erro("ERRO");
      }

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