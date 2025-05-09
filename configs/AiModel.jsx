// To run this code, you need to install the following dependencies:
// npm install @google/genai

// Make sure to set your GEMINI_API_KEY environment variable before running.
// Example: export GEMINI_API_KEY="YOUR_API_KEY"

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} =require ("@google/genai");

// Ensure your GEMINI_API_KEY is set in your environment variables
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY environment variable not set.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const model=genAI.getGenerativeModel({
  model: "gemini-2.5-pro-preview-05-06",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json", // As per the image, model will output text, hopefully JSON formatted
};

// Safety settings similar to what might be configured (adjust as needed)
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];
export const GenerateCourseLayout=model.startChat({
  generationConfig,
  safetySettings,
  history: [
    {
      role: "user",
      parts: [
        { text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Difficulty Level: Basic, Duration: 1 hour, No.of Chapters: 5, in JSON format" }
      ],
    },
    {
      role: "model",
      parts: [{ text: "```json\n{\n \"course\": {\n    \"name\": \"Introduction to Python\",\n    \"description\": \"A basic course to learn Python programming\",\n    \"chapters\": [\n      {\n        \"name\": \"Chapter 1\",\n        \"about\": \"Introduction to Python\",\n        \"duration\": \"10 minutes\"\n      },\n      {\n        \"name\": \"Chapter 2\",\n        \"about\": \"Variables and Data Types\",\n        \"duration\": \"15 minutes  }\n```" }],
    },

  ],
});

