const {GoogleGenAI} = require('@google/genai')
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")
const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GEMINI_API_KEY
})

/** Schema to understand the AI */
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})



async function generateIntervieReport({RESUME,JOB_DESCRIPTION,SELF_DESCRIPTION}){

    // const prompt = `Generate an interview report for a candidate with the following details:
    //                     Resume: ${RESUME}
    //                     Self Description: ${SELF_DESCRIPTION}
    //                     Job Description: ${JOB_DESCRIPTION}`

    const prompt = `
        Analyze the candidate for the given job.

        Return ONLY valid JSON.

        Follow the schema EXACTLY.
        Do not generate reports.
        Do not generate markdown.
        Do not create new fields.

        Output JSON structure:

        {
        "title": string,
        "matchScore": number,
        "technicalQuestions": [
        { "question": string, "intention": string, "answer": string }
        ],
        "behavioralQuestions": [
        { "question": string, "intention": string, "answer": string }
        ],
        "skillGaps": [
        { "skill": string, "severity": "low" | "medium" | "high" }
        ],
        "preparationPlan": [
        { "day": number, "focus": string, "tasks": [string] }
        ]
        }

        Generate real interview preparation data.

        Job Description:
        ${JOB_DESCRIPTION}

        Resume:
        ${RESUME}

        Self Description:
        ${SELF_DESCRIPTION}
        `;


    // console.log("Prompt sent to AI:",prompt)

    // return '';


    const Response =  await ai.models.generateContent({
        model:'gemini-2.5-flash',
        contents:prompt,
        config:{
            systemInstruction: "You are a strict JSON generator. You must only return JSON matching the schema.",
            temperature: 0.2,
            topP: 0.9,
            responseMimeType:'application/json',
            responseSchema:zodToJsonSchema(interviewReportSchema)
        }
    })

    // console.log(Response.text)

    return JSON.parse(Response.text)

}


module.exports = generateIntervieReport