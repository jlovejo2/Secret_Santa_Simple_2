import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// req: NextApiRequest, res: NextApiResponse

const SendMailNodeMailer = async (req: any, res: any) => {
	try {
		// create reusable transporter object using the default SMTP transport
		let transporter: Transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465, //port 465 is for SMTP communication
			auth: {
				user: process.env.MY_EMAIL, // generated ethereal user
				pass: process.env.MY_EMAIL_PASSWORD // generated ethereal password
			}
		});

		const mailOptions = {
			from: process.env.MY_EMAIL, // sender address
			to: `${req.body.email}`, // 'baz@example.com,' list of receivers
			subject: `${req.body.subject}`, // Subject line
			text: `${req.body.message}` // plain text body
		};

		// send mail with defined transport object
		let result: SMTPTransport.SentMessageInfo = await transporter.sendMail(
			mailOptions
		);
		// res.status(200)s
		return result;
	} catch (err) {
		// res.status(400)
		console.error(err);
	}
};

export default SendMailNodeMailer;
