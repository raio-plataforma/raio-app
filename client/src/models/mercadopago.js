import mercadopago from 'mercadopago';

mercadopago.configure({
    sandbox: true,
    access_token: "TEST-644853399630358-091722-edc73f4a076c3939f5661d9fc7db4417-301619184"
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