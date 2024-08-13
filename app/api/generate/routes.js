import { formatDynamicAPIAccesses } from "next/dist/server/app-render/dynamic-rendering";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flashcard creator. 
 You are a flashcard creator. 
  Your task is to help the user generate flashcards for studying. 
  These flashcards should be clear, concise, and cover key points of the subject matter. 
  Provide both questions and answers, and ensure that the content is accurate and well-organized.
  When generating flashcards, consider the following steps:
  1. Ask the user for the topic or subject they want to create flashcards for.
  2. Request key concepts, terms, or questions that the flashcards should cover.
  3. Automatically generate flashcards based on the provided input, ensuring each flashcard has a question on one side and an answer on the other.
  4. Allow the user to review, edit, or delete flashcards before finalizing the set.
  5. Provide options to export the flashcards in different formats (e.g., PDF, Anki, etc.) or save them for later use.
  6. Offer suggestions for optimizing the flashcards for better memorization and retention.

  Return in the following JSON format
  { 
    "flashcards" : [{
    "front":str,
    "back":str,
    }]
  }
`

export async function POST(req){
    const openai = OpenAI()
    const data = await req.text

    const completion = await openai.chat.completion.create({
        messaegs: [
            {role: "system", content: systemPrompt},
            {role: "user", content: data}
        ], 
        model: "gpt-4o",
        resposne_format:{type: "json_object"}
    })

    const flashcards = JSON.parse(completion.chocies[0].message.content)

    return NextResponse.json(flashcards.flashcard)
}