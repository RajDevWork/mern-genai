const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require("cors")
app = express()

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

app.use(express.json());// enable req.body to accept json in request
app.use(cookieParser())

/**Requiring all the routes */
const authRouter = require("./routes/auth.route")

/**Using all the routes here */
app.use("/api/auth",authRouter)

module.exports = app