if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

const port = process.env.PORT || 8080;

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const ejsMate = require("ejs-mate");
const Contacts = require("./models/contact.js"); //User Schema 
const ExpressError = require("./utils/ExpressError.js");

// // const mongo_url="mongodb://127.0.0.1:27017/portfolio";
const dbUrl=process.env.ATLASDB_URL;
// const dbUrl="mongodb+srv://zkatarki:jwvvrI19GIDed7Jm@cluster0.kvstvno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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



// Your MongoDB connection string
// const uri = 'mongodb+srv://zkatarki:jwvvrI19GIDed7Jm@cluster0.kvstvno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// // Connect to MongoDB
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Further code execution after successful connection
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// Connect to MongoDB without deprecated options
// mongoose.connect(uri, { useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Further code execution after successful connection
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error);
//   });



app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));
//Ejs Mate
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



// let contact3 = new Contacts({
//     name:"zeba3",
//     email:"zeba@gmail.com",
//     emailsub:"reqruiting",
//     number:9876543212,
//     message:"Hello",
//     time:new Date()
// })

// contact3.save().then((res) =>{
//     console.log(res);
// });

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

app.post("/contact",async(req,res)=>{
    
        console.log("Working");
    console.log(req.body.contact);
    const newContat = new Contacts(req.body.contact);
    let savedContact = await newContat.save();
    
    
    console.log("Saved listing with map",savedContact);
    res.render("templates/thanks.ejs");
    
    // let{name,email,emailsub,number,message} = req.body;
    // const newContact = new Contact({name,email,emailsub,number,message});
    // const registeredUser = await User.register(newUser,password);
    // console.log("User is signup successfully",registeredUser);  //User is stored in dbsuccessfully
    
});

app.get("/services",(req,res)=>{
    console.log("Contact");
    res.render("templates/services.ejs");
})

app.all("*",(req,res,next)=>{
    console.log("Invalid route searched");
    next(new ExpressError(404,"Page is Not Found"));
})

// app.use("*",(req,res)=>{
//     console.log("Testing Middleware");
//     throw Error
// })

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



// The placement of these script tags depends on your specific requirements and preferences:

// 1. **In the head section:** You typically place scripts that are essential for rendering or functionality at the top of 
// the HTML document, within the `<head>` section. If your scripts are critical for the initial rendering of the page or if
//  they need to be loaded before the page content, then you should place them in the `<head>` section.

//    ```html
//    <!DOCTYPE html>
//    <html>
//    <head>
//        <!-- Other meta tags, stylesheets, etc. -->
//        <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
//        <script src="https://unpkg.com/scrollreveal"></script>
//    </head>
//    <body>
//        <!-- Body content -->
//    </body>
//    </html>
//    ```

// 2. **At the end of the body section:** Placing scripts at the end of the `<body>` tag can improve page loading 
// performance because the browser will render the HTML content before loading and executing the scripts. This can lead 
// to faster perceived page load times, especially for larger scripts or when loading external resources.

//    ```html
//    <!DOCTYPE html>
//    <html>
//    <head>
//        <!-- Other meta tags, stylesheets, etc. -->
//    </head>
//    <body>
//        <!-- Body content -->

//        <!-- Scripts placed at the end of the body -->
//        <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
//        <script src="https://unpkg.com/scrollreveal"></script>
//    </body>
//    </html>
//    ```

// Consider your specific use case and performance considerations when deciding where to place these scripts. If in doubt, 
// placing them at the end of the body is often a safe choice for improving page load times.