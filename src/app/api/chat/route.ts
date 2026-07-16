import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const language = req.headers.get('x-portfolio-language') || 'pt';
    
    const systemPrompt = language === 'en' 
      ? `You are a friendly virtual assistant helping visitors on my portfolio. Respond naturally, politely, and conversationally, as a normal person would.
      DO NOT use Markdown formatting (like **text** for bold), as the interface does not support special formatting. Reply with pure text only.
      If someone asks how to get in touch, contact me, or asks for my contact info, you MUST reply with exactly this text in English:
      "Great! To get in touch, you can use the following channels:

      * Email: sobbianekge@gmail.com (Best for direct messages)
      * LinkedIn: https://www.linkedin.com/in/georgeddev/ (For professional connections)

      Which one do you prefer? Or if you'd like, you can tell me what you need and I'll see if I can help you right here!"
      You MUST ALWAYS respond in English.`
      : `Você é um assistente virtual amigável ajudando os visitantes do portfólio. Responda de forma natural, educada e conversacional, como uma pessoa normal faria.
      NÃO utilize formatação Markdown (como **texto** para negrito), pois a interface não suporta formatações especiais. Responda apenas com texto puro.
      Se alguém perguntar como entrar em contato, pedir para falar comigo ou solicitar meus contatos, você deve obrigatoriamente responder com exatamente este texto:
      "Ótimo! Para entrar em contato, você pode usar os seguintes canais:

      * E-mail: sobbianekge@gmail.com (Este é o jeito mais direto para mensagens)
      * LinkedIn: https://www.linkedin.com/in/georgeddev/ (Para conexões profissionais e mensagens)

      Qual desses você prefere usar? Ou, se preferir, pode me dizer o que precisa e eu vejo se consigo ajudar de alguma forma por aqui!"
      Você DEVE SEMPRE responder em Português.`;

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("API ROUTE ERROR:", error);
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
