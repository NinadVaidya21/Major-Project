const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
    title: { 
        type: String,
        required: true,
    },
    description: String,

    image: {
        filename: {
            type: String,
            default: "defaultimage"
        },
        url: {
            type: String,
            default: "https://unsplash.com/photos/a-black-sand-beach-meets-the-ocean-and-mountains-JIvq1eW9jUg",
            set: (v) => v === "" ? "https://unsplash.com/photos/a-black-sand-beach-meets-the-ocean-and-mountains-JIvq1eW9jUg" : v  // Default image URL if empty
        }
    },

    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
