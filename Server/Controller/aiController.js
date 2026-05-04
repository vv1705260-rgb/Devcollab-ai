const axios = require('axios');

exports.suggestTasks = async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Suggest tasks for: ${prompt}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`
        }
      }
    );

    res.json(response.data.choices[0].message.content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.chatAI = async (req, res) => {
  try {
    const message = req.body.message;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`
        }
      }
    );

    res.json(response.data.choices[0].message.content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
