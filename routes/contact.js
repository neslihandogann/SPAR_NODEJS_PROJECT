const express = require('express')
const router = express.Router()

router.post('/email', (req, res) => {

    const outputHTML = `
    
    <h2>Mail Details</h2>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>`

    "use strict";
    const nodemailer = require("nodemailer")

    
   // genel kapsamda async..await'e izin verilmiyor, bir sarmalayıcı kullanmalı
    async function main() {
       // ethereal.email'den test SMTP hizmet hesabı oluştur
        // Yalnızca test için gerçek bir posta hesabınız yoksa gereklidir
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port:465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'doganneslihan437@gmail.com', // generated ethereal user//buraya kendi e posta adresinizi yazıpta erişim sağlayabilrsiniz
                pass: 'nfwqkntqdnnzzrsr' // generated ethereal password
               //ayrıca burda 2li doğrulama şifre sistemi kullanılmıştır bu yüzden sürekli değişiyor sizde kendi şifrenizi yazıp kontrol edebilirsiniz çalışıp çalışmadığını denediğinizde mail kutunıza bilgiler gelecektir.
           
           
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"node js proje contact form" <doganneslihan437@gmail.com>', // sender address
            to: "doganneslihan437@gmail.com", // list of receivers
            subject: "node contect message", // Subject line
            text: "Hello world?", // plain text body
            html: outputHTML // html body
        });

        console.log("Message sent: %s", info.messageId);
        

        // Önizleme yalnızca bir Ethereal hesabı aracılığıyla gönderilirken kullanılabilir
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        req.session.sessionFlash= {

            type: 'alert alert-success',
            message:'mesajınız başarılı bir şekilde gönderildi.'
        }
        
        res.redirect('/contact')
    }

    main().catch(console.error);


})

module.exports = router
