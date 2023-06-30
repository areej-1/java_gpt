// generate.js
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: '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', // replace with your OpenAI key
});
const openai = new OpenAIApi(configuration);

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
    const completion = await openai.createChatCompletion({
      model: "gpt-4-0613",
      messages: messages,
      temperature: 0.6,
      max_tokens: 1000,
    });
    
    const response = completion.data.choices[0].message['content'];
    console.log(response);
  } catch(error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    process.exit(1);
  }
})();
