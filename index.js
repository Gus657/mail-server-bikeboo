const nodemailer = require('nodemailer');
const express = require('express');
const hbs = require('nodemailer-express-handlebars');
const app = express();
const PORT = process.env.PORT || 3000 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/send-mail', async (req, res)=>{
    
    
    let transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'bikeboogt@gmail.com', // generated ethereal user
          pass: req.body.pass // generated ethereal password
        }
      });

const handlebarOptions = {
        viewEngine: {
          extName: '.hbs',
          partialsDir: './views',
          layoutsDir: './views',
          defaultLayout: req.body.template+'.hbs',
        },
        viewPath: './views',
        extName: '.hbs',
      };
      
      transporter.use('compile', hbs(handlebarOptions));
    
      // send mail with defined transport object
      let info =  transporter.sendMail({
        from: '"BIKEBOO', // sender address
        to: req.body.email, // list of receivers
        subject: req.body.subject, // Subject line
        template: req.body.template,
        /* attachments:[
            { filename: 'panda-bike.png', path: "./views/panda-bike.png"}
        ] */
      });
      
      res.sendStatus(200);
    
});

app.listen(PORT, ()=>{console.log('Server Running')});
