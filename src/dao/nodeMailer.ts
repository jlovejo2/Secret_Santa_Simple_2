import nodemailer from 'nodemailer';

//This code was grabbed from the nodemail documentation with some slight modifications
export async function emailSender(toAddress, fromAddress, subject, body) {
    // Generate test SMTP service account from ethereal.email
   
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL, // generated ethereal user
            pass: process.env.MY_EMAIL_PASSWORD // generated ethereal password
        }
    });

    const mailOptions = {
        from: fromAddress, // sender address
        to: toAddress,  // 'baz@example.com,' list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            
            console.log(error);
        } else {

            console.log("Message sent: " + info.response);
        }
    });
};

module.exports = emailSender