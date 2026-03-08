const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controller/interview.controller")
const upload = require("../middlewares/file.middleware")


const interviewRouter = express.Router()

/**
*@route POST /api/interview
*@description Generate interview report based on resume, job description and self description
*@access Private
*/


interviewRouter.post("/",authMiddleware,upload.single("resume"),interviewController.generateInterviewReportController)


module.exports = interviewRouter