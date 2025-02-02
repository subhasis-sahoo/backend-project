// require('dotenv').config({path: './env'});
// import express from "express"
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

// const app = express()
// import app from "./app.js";
import { app } from "./app.js"
const port = process.env.PORT || 8000

connectDB()
.then(() => {

    app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error;
    })

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    })
})
.catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
})






/*
// Another approach to connect DB.
import express from "express";
const app = express();

// Here we use ';' to ensureing that this IFFI function is write on the new line.
;( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch(error) {
        console.error("ERROR: ", error)
        throw error
    }
} )()
*/


/*
NOTES: While connecting database remember two things,
i-> There is always may some error occur while connecting database.
ii-> Database takes a lot of time to connect, so always use async and await.
*/