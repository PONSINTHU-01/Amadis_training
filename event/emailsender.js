import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ponsindhu01@gmail.com',
    pass: 'dwnu hpum gbye muri'
  }
});

const sendemail = (to, event) => {
  const mailOptions = {
    from: 'ponsindhu01@gmail.com',
    to,
    subject: 'Event Registration Confirmation ',
    text: `You have successfully registered for: ${event.name}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Email error:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export default sendemail;
