const nodeMailer =  require('nodemailer');



const sendEmail = async(options)=>{

    const transpoter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMT_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transpoter.sendMail(mailOptions)

};

module.exports = sendEmail;