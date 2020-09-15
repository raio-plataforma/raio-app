import mercadopago from 'mercadopago';

mercadopago.configure({
    sandbox: true,
    access_token: "ACCESS_TOKEN"
  });

export default class ApiMercadoPago {

  createInvoice() {
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

}