const express = require('express')
const mercadopago = require('mercadopago')
const router = express.Router()

router.get('/ipn', async (req, res) => {
    if (!req.query.id) {
        res.send("Você não informou o id.");
    } else
        if (!req.query.topic) {
            res.send("Você não informou o topic.");
        } else {

            mercadopago.configure({
                sandbox: true,
                access_token: "TEST-644853399630358-091722-edc73f4a076c3939f5661d9fc7db4417-301619184"
            });

            let merchant_ID;

            switch (req.query.topic) {
                case "payment":
                    try {
                        let payment = await mercadopago.payment.get(req.query.id);
                    } catch (error) {
                        console.error(error);
                        res.send("ERRO: Algum erro ocorreu provavelmente o id enviado é invalido.");
                    }
                    // Obtenha o pagamento e o correspondente merchant_order relatado pelo IPN.
                    merchant_ID = req.query.id;
                    break;
                case "merchant_order":
                    merchant_ID = req.query.id;
                    break;
            }
            try {
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
                            res.send("Totalmente pago. Imprima a etiqueta e libere seu item.");
                        }
                    } else { //O merchant_order não tem remessas
                        console.log("Totalmente pago. Libere seu item.");
                        res.send("Totalmente pago. Libere seu item.");
                    }
                } else {
                    console.log("Não pagou ainda. Não libere seu item.");
                    res.send("Não pagou ainda. Não libere seu item.");
                }

            } catch (error) {
                console.error(error);
                res.send("ERRO: Algum erro ocorreu provavelmente o id enviado é invalido.");
            }
        }
})

module.exports = router
