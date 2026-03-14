const interviewReportModel = require("../models/interviewReport.model")
const pdfParse  = require("pdf-parse")
const generateIntervieReport = require("../services/ai.service")


/**
 * @description Generate interview report based on resume, job description and self description
 * @param {*} req 
 * @param {*} res 
 */

async function generateInterviewReportController(req,res){

    if(!req.file){
        return res.status(400).json({
            message:"Resume PDF is required"
        })
    }


     const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateIntervieReport({
        RESUME: resumeContent.text,
        SELF_DESCRIPTION: selfDescription,
        JOB_DESCRIPTION: jobDescription
    })

    console.log(interViewReportByAi)

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

module.exports = {
    generateInterviewReportController
}