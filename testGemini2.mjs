import fs from 'fs';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

const envContent = fs.readFileSync('.env.local', 'utf-8');
const match = envContent.match(/GOOGLE_GENERATIVE_AI_API_KEY=(.*)/);
if (match) process.env.GOOGLE_GENERATIVE_AI_API_KEY = match[1].trim();

async function test() {
  try {
    const result = streamText({
      model: google('gemini-2.5-flash'),
      prompt: 'hello'
    });
    
    for await (const chunk of result.textStream) {
      console.log(chunk);
    }
  } catch (error) {
    console.error("REAL GEMINI ERROR:", error);
  }
}
test();
