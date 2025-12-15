require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIl_USER,
        pass:process.env.EMAIl_PASS
    }
})

// async function sendTestMail(){
//     try{
//         await transporter.sendMail({
//             from:`"Test App" <${process.env.EMAIL_USER}>`,
//             to:process.env.EMAIL_USER,
//             subject:"Nodemailer test mail",
//             text:"if you are receiving this mail, then the nodemailer is working",
//         })
//     console.log("Test mail sent sucessfully")
//     } catch(error){
//         console.error("failure to send test mail")

//     }
// }

// sendTestMail()
