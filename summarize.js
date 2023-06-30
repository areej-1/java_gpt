// sumarize.js
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: 'sk-KEY-HERE', // replace with your OpenAI key
});
const openai = new OpenAIApi(configuration);

(async function() {
  const to_summarize = process.argv[2] || '';
  if (to_summarize.trim().length === 0) {
    console.error("Please enter valid input");
    process.exit(1);
  }
  const messages = [
    {
      role: 'system',
      content: `Summarize the topics covered between the human and the AI chatbot to use as a chat history. Make sure to be concise. Do not leave anything out, make sure to include every single topic in the conversation. Return it as a simple paragraph. Every time you summarize, just add on to what you said before, and shorten as necessary.\n\nText to summarize: ${to_summarize}`,
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
//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
