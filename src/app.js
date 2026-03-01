const express = require('express')

app = express()

/**Requiring all the routes */
const authRouter = require("./routes/auth.route")

/**Using all the routes here */
app.use("/api/auth",authRouter)

module.exports = app