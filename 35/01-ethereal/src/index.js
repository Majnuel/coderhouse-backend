const nodemailer = require("nodemailer");

const TEST_EMAIL = "chandler.gutkowski81@ethereal.email";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "chandler.gutkowski81@ethereal.email",
    pass: "arHnCRPjkrHc3Pxcuv",
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

// Name	Chandler Gutkowski
// Username	chandler.gutkowski81@ethereal.email (also works as a real inbound email address)
// Password	arHnCRPjkrHc3Pxcuv
