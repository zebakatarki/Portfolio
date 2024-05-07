if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}
const nodemailer = require('nodemailer');

const port = process.env.PORT || 8080;

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const ejsMate = require("ejs-mate");
const Contacts = require("./models/contact.js"); 
const ExpressError = require("./utils/ExpressError.js");
const contact = require("./models/contact.js");

const dbUrl=process.env.ATLASDB_URL;

main() 
.then(()=>{
    console.log("Connected to MongooDB ");
})
.catch((err)=>{
    console.log("MongoDB Error",err);
});

async function main(){
    await mongoose.connect(dbUrl);
} 

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    console.log("Home");
    res.render("templates/home.ejs");
})

app.get("/about",(req,res)=>{
    console.log("About");
    res.render("templates/about.ejs");
})

app.get("/skills",(req,res)=>{
    console.log("Skills");
    res.render("templates/skills.ejs");
})

app.get("/projects",(req,res)=>{
    console.log("Projects");
    res.render("templates/projects.ejs");
})

app.get("/contact",(req,res)=>{
    console.log("Contact");
    res.render("templates/contact.ejs");
})

//with email functionality
app.post('/contact', async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME, //Admin email
                pass: process.env.EMAIL_PASSWORD, //Password from google
            },
        });

        const userEmail = req.body.contact.email;
        const userName = req.body.contact.name;
        const userNumber = req.body.contact.number;
        const userMessage = req.body.contact.message;
        const emailSubject = req.body.contact.emailsub;

        //Thank you mail for sender(User)
        const toUser = {
            from: process.env.EMAIL_USERNAME, //Admin mail
            to: req.body.contact.email, //User mail
            subject: 'Thank You Mail',
            text: `Thank you from ${process.env.EMAIL_USERNAME}. we will get back to you shortly.`
        };
        const Userinfo = await transporter.sendMail(toUser);

        //mail for Admin with information of sender
        const toAdmin = {
            from: req.body.contact.email, //User email
            to: process.env.EMAIL_USERNAME, //Admin email
            subject: emailSubject,
            text: `
                From: ${userEmail}
                Name: ${userName}
                Number: ${userNumber}
                Message: ${userMessage}
            `
        };
        const Admininfo = await transporter.sendMail(toAdmin);

        const newContact = new Contacts(req.body.contact);
        let savedContact = await newContact.save({ timeout: 15000 }); //saving data in database
        
        //Testers
        console.log("Saved contact:", savedContact);
        console.log("Message sent: ", Userinfo.response);
        console.log("Message sent: ", Admininfo.response);
        res.render("templates/thanks.ejs");
    } catch (error) {
        console.error("Error occurred while sending email:", error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

app.get("/services",(req,res)=>{
    console.log("Contact");
    res.render("templates/services.ejs");
})

app.all("*",(req,res,next)=>{
    console.log("Invalid route searched");
    next(new ExpressError(404,"Page is Not Found"));
})

app.use((err,req,res,next)=>{
    console.log("Error Handling Middleware Triggered ExpressError.js:",err); 
    let{statusCode=500,message="Something went wrong!"}=err;
    res.status(statusCode).render("error.ejs",{message});
});

app.get("/trial",(req,res)=>{
    console.log("Contact");
    res.render("templates/thanks.ejs");
})

app.listen(port, ()=>{
    console.log("Server is listening to port 8080");
});