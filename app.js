if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

const port = process.env.PORT || 8080;

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const ejsMate = require("ejs-mate");
const Contacts = require("./models/contact.js"); 
const ExpressError = require("./utils/ExpressError.js");

const dbUrl=process.env.ATLASDB_URL;
// const dbUrl="mongodb://127.0.0.1:27017/portfolio";

main() 
.then(()=>{
    console.log("Connected to MongooDB Of Major Project");
})
.catch((err)=>{
    console.log("MongoDB Error",err);
});

async function main(){
    await mongoose.connect(dbUrl);
} 

// mongoose.connect("mongodb://127.0.0.1:27017/portfolio", {useNewUrlParser:true});

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

// app.post("/contact",async(req,res)=>{
//     console.log("Working");
//     console.log(req.body.contact);
//     const newContact = new Contacts(req.body.contact);
//     let savedContact = await newContact.save();
//     console.log("Saved listing with map",savedContact);
//     res.render("templates/thanks.ejs");
// });

// app.post("/contact", async (req, res) => {
//     try {
//         console.log("Working");
//         console.log(req.body.contact);
        
//         // Validate req.body.contact here if needed
        
//         const newContact = new Contacts(req.body.contact);
//         let savedContact = await newContact.save();
        
//         console.log("Saved contact:", savedContact);
        
//         // Send a success response
//         res.render("templates/thanks.ejs");
//     } catch (error) {
//         // Handle any errors that occur during the database operation
//         console.error("Error saving contact:", error);
//         // Send an error response or render an error page
//         res.status(500).send(error.message);
//     }
// });

app.post("/contact", async (req, res) => {
    try {
        console.log("Working");
        console.log(req.body.contact);
        
        // Validate req.body.contact here if needed
        
        const newContact = new Contacts(req.body.contact);
        // Adjust the timeout option as needed (e.g., { timeout: 15000 } for 15 seconds)
        let savedContact = await newContact.save({ timeout: 15000 });
        
        console.log("Saved contact:", savedContact);
        
        // Send a success response
        res.render("templates/thanks.ejs");
    } catch (error) {
        // Handle any errors that occur during the database operation
        console.error("Error saving contact:", error);
        // Send an error response or render an error page
        res.status(500).send(error.message);
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