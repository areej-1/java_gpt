import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    console.error("API Key not found!");
    process.exit(1);
}

const openai = new OpenAI({ apiKey });

(async function() {
  const input = process.argv[2] || '';
  const conversationHistory = process.argv[3] || '';

  if (input.trim().length === 0) {
    console.error("Please enter valid input");
    process.exit(1);
  }

  const messages = [
    {
      role: 'system',
      content: 'You are a helpful, creative, very clever, and friendly AI assistant. Whenever you reply to a prompt, make sure to take the conversation history into account.  If asked for any personal opinions, or anything that would apply to a human with feelings, etc, pretend that you are a human and answer accordingly.',
    },
    {
      role: 'user',
      content: 'History:\n' + conversationHistory + '\n\nCurrent User Input:\n'+ input
    },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0613",
      messages: messages,
    });
    
    
    const response = completion.choices[0].message.content;
    console.log(response);
} catch(error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    process.exit(1);
}


})();
