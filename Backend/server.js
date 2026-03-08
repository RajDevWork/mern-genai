require("dotenv").config()

const app = require("./src/app")
const connectToDB = require("./src/config/database")
const PORT = process.env.PORT || 3000
const {RESUME,JOB_DESCRIPTION,SELF_DESCRIPTION} = require("./src/services/temp")
const generateIntervieReport = require("./src/services/ai.service")




connectToDB()

generateIntervieReport({RESUME,JOB_DESCRIPTION,SELF_DESCRIPTION})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})