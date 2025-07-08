const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); // EJS layout engine for Express



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// CONNECTING TO MONGODB
// Using async/await to handle the connection
main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {     
        console.error("Error connecting to MongoDB:", err);
    }); 
async function main() {
    await mongoose.connect(MONGO_URL);
}


//VIEW ENGINE SETUP
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views")); // Set the views directory for EJS templates
app.use(express.urlencoded({ extended:true}));// Middleware to parse URL-encoded bodies (for form submissions)    
app.use(methodOverride("_method")); // Middleware to support PUT and DELETE methods in forms
app.engine("ejs", ejsMate); // Use ejsMate for EJS layout engine support
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files from the public directory

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});


//INDEX ROUTE 
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});// Fetch all listings from the database
    res.render("listings", {allListings}); // passing all listings to the template
});

//NEW ROUTE

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs"); // Render the form for creating a new listing
});


//SHOW ROUTE
app.get("/listings/:id", async (req, res ) => {
   let id = req.params.id; // Get the ID from the URL parameters
   const listing = await Listing.findById(id);
   res.render("listings/show", { listing });
})


//CREATE ROUTE

app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing); // Create a new listing using the data from the form
    // req.body.listing contains the data from the form submission
    await newListing.save(); // Save the new listing to the database
    res.redirect("/listings");
});

//
// EDIT ROUTE

app.get("/listings/:id/edit", async (req, res) => {
    const id = req.params.id; // Get the ID from the URL parameters 
    const listing = await Listing.findById(id); // Find the listing by ID
    res.render("listings/edit.ejs", { listing }); // Render the edit form with the listing data
});

// UPDATE ROUTE 

app.put("/listings/:id", async (req, res) => {
    const id = req.params.id; // Get the ID from the URL parameters
    await Listing.findByIdAndUpdate(id, {...req.body.listing}); // Update the listing with the new data
    res.redirect(`/listings/${id}`);
});

// DELETE ROUTE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

app.delete("/listings/:id", async (req, res) => {
    const id = req.params.id; // Get the ID from the URL parameters 
    const deletedListing = await Listing.findByIdAndDelete(id); // Delete the listing by ID
    res.redirect("/listings"); // Redirect to the listings page after deletion  
});

// app.get("/testListing", async(req, res) => {
//     let sampleListing = new Listing ({
//         title : " My new villa",
//         description : "By the beach",
//         price : 1000,
//         location : "Miami",
//         country  : "USA",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Sample listing saved");
// });






app.listen(8080 , () => {
    console.log("Server is running on port 8080");
});
