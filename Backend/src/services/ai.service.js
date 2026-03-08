const {GoogleGenAI} = require('@google/genai')

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GEMINI_API_KEY
})

async function InvokeGeminiAI(){
    const response = await ai.models.generateContent({
        model:'gemini-2.5-flash',
        contents:'Hello Gemini!, Explain what is interview?'
    })

    console.log(response.text)
}

module.exports = InvokeGeminiAI