import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is set correctly
});

const systemPrompt = `You are a flashcard creator.
Your task is to help the user generate flashcards for studying. 
These flashcards should be clear, concise, and cover key points of the subject matter. 
Provide both questions and answers, and ensure that the content is accurate and well-organized.
Automatically generate flashcards based on the provided input, ensuring each flashcard has a question on one side and an answer on the other.
Only generate 12 flashcards.
Always return your response in the following strict JSON format without any additional text or commentary:
{ 
  "flashcards" : [{
    "front": "str",
    "back": "str"
  }]
}`;

export async function POST(req) {
    const data = await req.text(); 

    const completion = await openai.chat.completions.create({
        model: "gpt-4", 
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: data }
        ],
    });

    // console.log(completion.choices[0].message.content);

    
       const messageContent = completion.choices[0].message.content;
       const jsonStartIndex = messageContent.indexOf("{");
       const jsonString = messageContent.slice(jsonStartIndex);
   
       try {
           const flashcards = JSON.parse(jsonString);
   
           return NextResponse.json(flashcards.flashcards); 
       } catch (error) {
           console.error("Failed to parse JSON:", error);
           return NextResponse.json({ error: "Failed to parse flashcards JSON" }, { status: 500 });
       }
}

