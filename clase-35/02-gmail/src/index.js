const pass = "ptolvmqqlphgwgur";

const nodemailer = require("nodemailer");

const TEST_EMAIL = "emacalle@hotmail.com";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ecalle87@gmail.com",
    pass: pass,
  },
});

const mailOptions = {
  from: "SERVIDOR NODE.JS",
  to: TEST_EMAIL,
  subject: "MAIL DE PRUEBA CON NODE.JS",
  html: `<h1>this is a test</h1><p>this is text</p>`,
};

try {
  (async function () {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  })();
} catch (err) {
  console.log(err);
}
