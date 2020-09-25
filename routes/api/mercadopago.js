const express = require('express')
const mercadopago = require('mercadopago')
const router = express.Router()
const nodemailer = require('nodemailer');

const Job = require('../../models/Job')
const Enterprise = require('../../models/Enterprise')


router.get('/ipn', async (req, res) => {

    async function ativarCompra(id) {
        const job = await Job.findById(id).populate('company');
        if (job._id) {
            const jobEdit = await Job.findOneAndUpdate(id, { status: "Visivel" }, { new: true });
            await jobEdit.save();
            enviarEmail({
                from: 'RAIO <contato@raio.agency>',
                to: 'contato@raio.agency',
                subject: 'RAIO - Novo pagamento confirmado de vaga.',
                text: 'Olá, um novo pagamento foi confirmado da vaga ' + job.title + ' da empresa ' + job.enterprise_name + ', a vaga já foi liberada e está visivel ao publico a equipe RAIO deve começar seu trabalho de seleção imediatamente!'
            });

            let empresa = await Enterprise.findOne({ _id: job.enterprise_id });
            enviarEmail({
                from: 'RAIO <contato@raio.agency>',
                to: empresa.user_email,
                subject: 'RAIO - Pagamento confirmado sua vaga está visivel!',
                text: 'Olá, acabamos que confirmar seu pagamento da vaga ' + job.title + ' agora sua vaga já se encontra visivel ao publico e os candidatos já poderão se inscrever na mesma, dentro de 7 dias a equipe RAIO já disponibilizar um rank de TOP 3 candidatos na plataforma RAIO para sua vaga, obrigado.'
            });
        } else {

        }
    }

    async function enviarEmail(mailOptions) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'contato.raio.plataforma@gmail.com',
                pass: 'jDkbpDiP0r_ains'
            }
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: '+ mailOptions.to);
            }
        });
    }

    if (!req.query.id) {
        res.send("Você não informou o id.");
    } else
        if (!req.query.topic) {
            res.send("Você não informou o topic.");
        } else {

            mercadopago.configure({
                access_token: "APP_USR-644853399630358-091722-c547e83404160670c73b75d3306b3687-301619184"
            });

            let merchant_ID;

            switch (req.query.topic) {
                case "payment":
                    try {
                        await mercadopago.payment.get(req.query.id);
                    } catch (error) {
                        console.error(error);
                        res.send("ERRO: Algum erro ocorreu provavelmente o id enviado é invalido.");
                    }
                    let payment = await mercadopago.payment.get(req.query.id);
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
                    let referencia = String(merchant_order.external_reference).split(" | ");
                    let tipoVenda = referencia[0];
                    let id = referencia[1];
                    if (tipoVenda == "VAGA") {
                        if (count(merchant_order.shipments) > 0) { // O merchant_order tem remessas
                            if (merchant_order.shipments[0].status == "ready_to_ship") {
                                console.log("Totalmente pago. Imprima a etiqueta e libere seu item.");
                                ativarCompra(id);
                                res.send("Totalmente pago. Imprima a etiqueta e libere seu item.");
                            }
                        } else { //O merchant_order não tem remessas
                            console.log("Totalmente pago. Libere seu item.");
                            ativarCompra(id);
                            res.send("Totalmente pago. Libere seu item.");
                        }
                    } else {
                        console.log("Não pagou ainda. Não libere seu item.");
                        res.send("Não pagou ainda. Não libere seu item.");
                    }
                } else {
                    console.log("Não é uma venda de VAGA, então o codigo não fará nada");
                    res.send("Não é uma venda de VAGA, então o codigo não fará nada.");
                }

            } catch (error) {
                console.error(error);
                res.send("ERRO: Algum erro ocorreu provavelmente o id enviado é invalido.");
            }
        }
})

module.exports = router
