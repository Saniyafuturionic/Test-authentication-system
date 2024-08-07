const mongoose = require("mongoose");
const passport = require("passport");
const app = require("./app");


// Import and config environment variable
require("dotenv").config({ path: "./.env" });
const port = 3000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB connected");
    app.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    })

}).catch(() => {
    console.log("Error occure")
});

    

