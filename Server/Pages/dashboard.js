import { useState } from 'react';
import axios from 'axios';

const API = "https://pro-manage-ai-1.onrender.com/api"; // replace if different
const [aiInput, setAiInput] = useState('');
const [aiResponse, setAiResponse] = useState('');
const askAI = async () => {
  const res = await axios.post(`${API}/ai/chat`, {
    message: aiInput
  });
  setAiResponse(res.data);
};

const suggestTasks = async () => {
  const res = await axios.post(`${API}/ai/suggest`, {
    prompt: "Project tasks"
  });
  setAiResponse(res.data);
};
<div className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl mb-6 shadow-xl">
  <h2 className="text-white text-xl mb-3">🤖 AI Assistant</h2>

  <div className="flex gap-3 mb-3">
    <input
      value={aiInput}
      onChange={(e) => setAiInput(e.target.value)}
      placeholder="Ask AI anything..."
      className="flex-1 p-3 rounded-lg bg-white/20 text-white outline-none"
    />

    <button
      onClick={askAI}
      className="bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-700"
    >
      Ask
    </button>
  </div>

  <button
    onClick={suggestTasks}
    className="bg-indigo-500 px-4 py-2 rounded-lg text-white mb-3"
  >
    ✨ Suggest Tasks
  </button>

  {aiResponse && (
    <div className="bg-black/40 text-white p-3 rounded-lg mt-2">
      {aiResponse}
    </div>
  )}
</div>
