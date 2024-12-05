import nodemailer from 'nodemailer'  
import handlebars from 'handlebars'  

const transporter = nodemailer.createTransport({  
  host: process.env.EMAIL_HOST,  
  port: Number(process.env.EMAIL_PORT),  
  secure: false, // true para 465, false para outras portas  
  auth: {  
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS,  
  },  
})  

export const resetPasswordTemplate = handlebars.compile(`  
<!DOCTYPE html>  
<html>  
<head>  
  <meta charset="utf-8">  
  <style>  
    body { font-family: Arial, sans-serif; line-height: 1.6; }  
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }  
    .button {  
      display: inline-block;  
      padding: 12px 24px;  
      background-color: #fbbf24;  
      color: #6b21a8;  
      text-decoration: none;  
      border-radius: 5px;  
      font-weight: bold;  
      margin: 20px 0;  
    }  
    .footer { color: #666; font-size: 12px; margin-top: 30px; }  
  </style>  
</head>  
<body>  
  <div class="container">  
    <h2 style="color: #6b21a8;">Recuperação de Senha</h2>  
    <p>Olá {{nome}},</p>  
    <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>  
    <p>Para criar uma nova senha, clique no botão abaixo:</p>  
    <div style="text-align: center;">  
      <a href="{{resetLink}}" class="button">Redefinir Senha</a>  
    </div>  
    <p>Este link é válido por 1 hora.</p>  
    <p>Se você não solicitou esta alteração, ignore este email.</p>  
    <div class="footer">  
      <hr style="border: 1px solid #eee;">  
      <p>Esta é uma mensagem automática, por favor não responda.</p>  
    </div>  
  </div>  
</body>  
</html>  
`)  

// Verifica conexão  
transporter.verify(function(error, success) {  
  if (error) {  
    console.log('Erro na configuração do email:', error)  
  } else {  
    console.log('Servidor pronto para enviar emails')  
  }  
})  

export default transporter