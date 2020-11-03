const express = require('express')
const router = express.Router()
const path = require('path')
const axios = require('axios')
const fileUpload = require('express-fileupload');
const fs = require('fs');
const UserPhotos = require('../../models/UserPhotos')

fileUpload

router.post('/all/count', async (req, res) => {
    try {
        const response = await UserPhotos.countDocuments();
        res.status(200).json({ resposta: response });
    } catch (error) {
        console.error(error);
        res.status(400).json({ resposta: String(error) });
    }
});


router.post('/upload', async (req, res) => {
    const body = req.body;
    if (req.files || Object.keys(req.files).length != 0) {
        let randomNumber = "" + ((Math.random() * 999999999) + 1) + "" + ((Math.random() * 999999999) + 1);
        let fileNameExt = req.files.arquivo.name;
        let fileExt = path.extname(fileNameExt);
        let foto = String(randomNumber + fileExt);

        try {
            const responseFindPhotos = await UserPhotos.find({ _user: body._user }).sort({ createdAt: 'desc' });
            if(parseInt(responseFindPhotos.length) >= 8){
                res.status(200).send(`
                    <html> <head> <meta charset="utf-8"/>
                    <style> body{ background: linear-gradient(101deg, #6f0000 0%, #410114 60%); color: #F9A639!important; } </style></head> <body> <center> <h1>Limite de fotos atingido!</h1> <p> Você só pode ter 8 fotos na galeria de trabalhos, 
                        <a href="/perfil/editar/profissional#galeria-trabalhos">Clique aqui para voltar.</a> </p> </center>
                    </body> </html>
                `);
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ resposta: String(error) });
        }

        try {
            (req.files.arquivo).mv('upload/userFotos/' + foto, async function (err) {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                } else {
                    body.arquivo = foto;
                    const response = await UserPhotos.create(body);
                    if (response) {
                        res.status(200).send(`
                            <html> <head> <meta charset="utf-8"/>
                                <meta http-equiv="refresh" content="0; URL='/perfil/editar/profissional#galeria-trabalhos'"/>
                            <style> body{ background: linear-gradient(101deg, #6f0000 0%, #410114 60%); color: #F9A639!important; } </style></head> <body> <center> <h1>Arquivo Carregado!</h1> <p> Arquivo carregado, redirecionando de volta, a pagina do usuario, 
                                <a href="/perfil/editar/profissional#galeria-trabalhos">Clique aqui caso, queira voltar mais rapido./</a> </p> </center>
                            </body> </html>
                        `);
                    }
                }
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({ resposta: String(error) });
        }
    } else {
        return res.status(400).json({ resposta: 'Nehum arquivo encontrado.' });
    }
});


router.post('/criar', async (req, res) => {
    const body = req.body;
    try {
        const response = await UserPhotos.create(body);
        res.status(200).json({ resposta: response });
    } catch (error) {
        console.error(error);
        res.status(400).json({ resposta: String(error) });
    }
});

router.post('/buscar', async (req, res) => {
    const query = req.query;
    const body = req.body;
    try {
        if (!query.limite) {
            query.limite = 999;
        }
        const response = await UserPhotos.find(body).sort({ createdAt: 'desc' }).limit(parseInt(query.limite));
        res.status(200).json({ resposta: response });
    } catch (error) {
        console.error(error);
        res.status(400).json({ resposta: String(error) });
    }
});

router.post('/deletar/:_id', async (req, res) => {
    const params = req.params;
    try {
        if (params._id) {
            const foto = await UserPhotos.findOne({ _id: params._id });
            const response = await UserPhotos.remove({ _id: params._id });
            fs.unlinkSync("upload/userFotos/" + foto.arquivo, async function () {
                res.status(200).json({ resposta: response });
            });
        } else {
            res.status(400).json({ resposta: 'Ocorreu um erro pois o campo "_id" não foi enviado!' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ resposta: String(error) });
    }
});




module.exports = router
