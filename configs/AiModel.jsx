// components/Aimodel.jsx
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const model = 'gemini-2.5-pro-preview-03-25';
const config = {
  responseMimeType: 'application/json',
};



export async function GenerateCourseLayout(userPrompt) {
  const response = await ai.models.generateContent({
    model,
    config,
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }],
      },
    ],
  });

  return response.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
}

export async function GenerateCourseContent(userPrompt) {
  const response = await ai.models.generateContent({
    model,
    config,
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: userPrompt,
          },
        ],
      },
    ],
  });


    return response.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  }
