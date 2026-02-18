import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Groq from 'groq-sdk'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

app.get('/', (req, res) => {
  res.json({ message: 'AI Interview SaaS Backend is running! 🚀' })
})

app.post('/api/generate', async (req, res) => {
  const { jobRole, experience, techStack } = req.body

  if (!jobRole || !experience || !techStack) {
    return res.status(400).json({
      error: 'Please provide jobRole, experience and techStack',
    })
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are an expert technical interviewer. Generate exactly 10 multiple choice questions. 
          Return ONLY a valid JSON array with no extra text, no markdown, no explanation.
          Each object must have exactly these fields:
          {
            "question": "the question text",
            "options": ["option A", "option B", "option C", "option D"],
            "correct": 0
          }
          The "correct" field is the index (0,1,2,3) of the correct option.`,
        },
        {
          role: 'user',
          content: `Generate 10 MCQ technical interview questions for a ${experience} level ${jobRole} who knows ${techStack}. Return only the JSON array.`,
        },
      ],
      temperature: 0.7,
    })

    const rawText = completion.choices[0].message.content
    const cleanText = rawText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    const questions = JSON.parse(cleanText)
    res.json({ questions })

  } catch (error) {
    console.error('Groq Error:', error.message)
    res.status(500).json({
      error: 'Failed to generate questions. Please try again!',
    })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`)
})