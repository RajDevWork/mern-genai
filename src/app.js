const express = require('express')

app = express()

app.use(express.json());// enable req.body to accept json in request


/**Requiring all the routes */
const authRouter = require("./routes/auth.route")

/**Using all the routes here */
app.use("/api/auth",authRouter)

module.exports = app