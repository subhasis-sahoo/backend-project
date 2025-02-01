import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express()

// use() is used to configuier middle wares
app.use(cors({
    // From which origin we accepts requests
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// To accept data from the json file.
app.use(express.json({limit: "16kb"}))

// To accepts data from the url.
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// To store data into a public folder, below 'public' is the our folder name.
app.use(express.static("public"))

// To access and set cookies on the user browser
app.use(cookieParser())



export { app }