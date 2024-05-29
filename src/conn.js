const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rahuldubey71960:Rdubey%401911@cluster0.8ugzfmw.mongodb.net/myDatabase?retryWrites=true&w=majority")
.then(() => {
    console.log("db connected")
})
.catch((error) => {
    console.log(error)
});

// Define the schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

// Create the model
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
