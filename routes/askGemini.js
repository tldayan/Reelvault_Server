const express = require("express")
const router = express.Router()
const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const askGemini = async(req,res) => {

  const {userPrompt} = req.body

  const geminiPrompt = `Generate ONLY a JSON array containing movie and show titles based on the following description: ${userPrompt}. No additional information or formatting of any kind is permitted.` 

  try {
    
    const geminiReq = await model.generateContent(geminiPrompt)

    const responseText = JSON.parse(geminiReq.response.text().replace(/```json|\n```/g, '').trim())

    if(responseText.length === 0) {
      return res.status(404).json({message: "No results found, Try providing a more accurate description and try again"})
    } 
    

    return res.status(200).json({entities : responseText})

  } catch (err) {
    return res.status(503).json({message : "AI is currently overloaded with requests, Please try agian later."})
  }

}


router.route("/").post(askGemini)

module.exports = router
