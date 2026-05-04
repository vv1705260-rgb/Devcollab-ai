import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://pro-manage-ai-1.onrender.com"); // your backend

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off();
  }, []);

  const sendMessage = () => {
    if (!message) return;

    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, { text: message, own: true }]);
    setMessage("");
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-xl h-[400px] flex flex-col">
      
      <h2 className="text-white mb-2">💬 Team Chat</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.own
                ? "bg-purple-600 text-white ml-auto"
                : "bg-gray-300 text-black"
            }`}
          >
            {msg.text || msg}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          className="flex-1 p-2 rounded-lg bg-white/20 text-white outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-purple-600 px-4 rounded-lg text-white hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
              }
