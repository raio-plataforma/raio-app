const nodemailer = require("nodemailer");
const fs = require('fs')
const path = require('path')
const Professional = require('../models/Professional')
const Enterprise = require('../models/Enterprise')

const states = require('./states.json')

let transporter;

/**
 * admin@raio.agency
 Raio123!@#
 * @returns {MailService & {MailService: typeof MailService}}
 */
const getEmailTransport = () => {
    if(!transporter)
    {
        transporter = nodemailer.createTransport({
            host: "mail.raio.agency",
            port: 465,
            secure: true,
            auth: {
                user: 'admin@raio.agency',
                pass: 'Raio123!@#',
            },
        });
    }

    return transporter;
};

function replaceAll(string, search, replace)
{
    return string.split(search).join(replace);
}


const sendEmailNewJobApply = async(jobProf) => {
    const transporter = getEmailTransport();


    const tpl = fs.readFileSync(path.resolve('email/', 'interessa-vaga.html'), 'utf8')

    // console.log(jobProf)
    const prof = await Professional.findOne({user_id: jobProf._user.id})
    prof.pcdName = prof.pcd?'PCD':'Não PCD';
    const state = states.filter((obj)=>{
        return obj.id === Number(prof.state)
    });
    prof.stateName = state[0].name

    data = {
        user: jobProf._user,
        job: jobProf._job,
        prof: prof
    };

    let html = tpl
    for(let k in data)
    {
        let olabel = k + '.';
        for(let f in data[k])
        {
            let flabel = '{{' + olabel + f + '}}';
            html = replaceAll(html, flabel, data[k][f])
        }
    }

    const enterprise = await Enterprise.findById(jobProf._job.enterprise_id)

    let info = await transporter.sendMail({
        from: '👻Raio <admin@raio.agency>',
        to: enterprise.user_email + ",diogo.abdalla@gmail.com",
        subject: "Novo cadastro em sua vaga",
        text: "-",
        html: html,
    });

    console.log("Message sent: %s", info.messageId);
    console.log(info)
};

module.exports = sendEmailNewJobApply
