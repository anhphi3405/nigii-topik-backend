const nodemailer = require('nodemailer');
require('dotenv').config();
const MailGen = require('mailgen');
const sendMail = async (email, subject, text, html) => {
    try{
        console.log(process.env.EMAIL + " " + process.env.PASSWORD);
        let config = {
            service : 'gmail',
            auth : {
                user : process.env.EMAIL,
                pass : process.env.PASSWORD
            }

        }
        let transporter = nodemailer.createTransport(config);
        //koo
        let mailGenerator = new MailGen({
            theme : 'default',
            product : {
                name : 'Mailgen',
                link : 'https://mailgen.js/'
            }
        });
        let message = {
            from : process.env.EMAIL,
            to : email,
            subject :subject,
            html : html,
            text : text
        }
        transporter.sendMail(message, (err, info) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(info);
            }
        });
    }
    catch(error){
        console.log(error);
    }
};

module.exports = sendMail;  