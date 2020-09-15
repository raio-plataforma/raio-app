const express = require('express')
const mercadopago = require('mercadopago')
const router = express.Router()

router.get('/ipn', async (req, res) => {
    mercadopago.configure({
        sandbox: true,
        access_token: "ACCESS_TOKEN"
    });

    let merchant_ID;

    switch (req.query.topic) {
        case "payment":
            let payment = await mercadopago.payment.get(req.query.id);
            // Obtenha o pagamento e o correspondente merchant_order relatado pelo IPN.
            merchant_ID = req.query.id;
            break;
        case "merchant_order":
            merchant_ID = req.query.id;
            break;
    }
    let merchant_order = await mercadopago.merchant_orders.get(merchant_ID);

    let paid_amount = 0;
    merchant_order.payments.forEach(payment => {
        if (payment['status'] == 'approved') {
            paid_amount += payment['transaction_amount'];
        }
    });

    // Se o valor da transação do pagamento for igual (ou maior) do que o valor do merchant_order, você pode liberar seus itens
    if (paid_amount >= merchant_order.total_amount) {
        if (count(merchant_order.shipments) > 0) { // O merchant_order tem remessas
            if (merchant_order.shipments[0].status == "ready_to_ship") {
                console.log("Totalmente pago. Imprima a etiqueta e libere seu item.");
            }
        } else { //O merchant_order não tem remessas
            console.log("Totalmente pago. Libere seu item.");
        }
    } else {
        console.log("Não pagou ainda. Não libere seu item.");
    }
})

module.exports = router
