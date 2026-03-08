const {GoogleGenAI} = require('@google/genai')
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")
const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GEMINI_API_KEY
})

/** Schema to understand the AI */
const interviewReportSchema = z.object({
    matchScore:z.number().describe("A score between 0 and 100 indicating how well the candidate's resume matches the job description."),
    technicalQuestions:z.array(z.object({
        question:z.string().describe("The technical question asked during the interview"),
        answer:z.string().describe("The answer provided by the candidate"),
        intention:z.string().describe("The intention behind the question")
    })).describe("An array of technical questions asked during the interview, along with the candidate's answers and the intention behind each question."),
    behavioralQuestions:z.array(z.object({  
        question:z.string().describe("The behavioral question asked during the interview"),
        answer:z.string().describe("The answer provided by the candidate"),
        intention:z.string().describe("The intention behind the question")
    })).describe("An array of behavioral questions asked during the interview, along with the candidate's answers and the intention behind each question."),
    skillGaps:z.array(z.object({
        skill:z.string().describe("The skill that needs improvement"),
        severity:z.enum(['low','medium','high']).describe("The severity of the skill gap")
    })).describe("An array of skill gaps identified in the candidate."),
    preparationPlan:z.array(z.object({
        day:z.number().describe("The day of the preparation plan"),
        focus:z.string().describe("The focus area for the day")
    })).describe("An array of preparation steps for the candidate.")
})



async function generateIntervieReport({RESUME,JOB_DESCRIPTION,SELF_DESCRIPTION}){

    const prompt = `Generate an interview report based on the following information:
                        Job Description: ${JOB_DESCRIPTION}   
                        Resume: ${RESUME}
                        Self Description: ${SELF_DESCRIPTION}`

    const Response =  await ai.models.generateContent({
        model:'gemini-2.5-flash',
        contents:prompt,
        config:{
            responseMimeType:'application/json',
            responseJsonSchema:zodToJsonSchema(interviewReportSchema)
        }
    })

    console.log(JSON.parse(Response.text))

}


module.exports = generateIntervieReport