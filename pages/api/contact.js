// include SendGrid API
const mail = require('@sendgrid/mail');

// set SendGrid API key
mail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
    
    // parse body and store in const
    const body = JSON.parse(req.body);

    console.log(body); // verify data is received from POST request

    const message = `
        Name: ${body.name}\r\n
        Email: ${body.email}\r\n
        Message: ${body.message}
    `;

    //console.log(message);

    const data = {
        to: 'me@alexnguyen.co.nz',
        from: 'ajplusnz@gmail.com',
        subject: `New message from ${body.name} on alexnguyen.co.nz`,
        text: message,
        html: message.replace(/\r\n/g, '<br />'),
    };

    //console.log(data);

    await mail.send(data);

    // send 200 code
    res.status(200).json({ status: 'OK '});
};

export default sendEmail;