import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

async function test() {
  const result = streamText({
    model: google('gemini-1.5-flash'),
    prompt: 'hello'
  });
  
  let current = result;
  const methods = new Set();
  while (current) {
    Object.getOwnPropertyNames(current).forEach(prop => methods.add(prop));
    current = Object.getPrototypeOf(current);
  }
  
  console.log(Array.from(methods));
  process.exit(0);
}
test();
