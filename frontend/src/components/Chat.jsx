import React, { useState } from "react";
import axios from "axios";

function Chat({ setData }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const res = await axios.post("http://127.0.0.1:8000/chat", {
      message: input,
    });

    const output = res.data.output;


const now = new Date();

output.date = now.toISOString().split("T")[0]; // YYYY-MM-DD
output.time = now.toTimeString().slice(0, 5); // HH:MM

    
    setMessages((prev) => [
  ...prev,

  
  {
    type: "user",
    text: input,
  },

  
  {
    type: "ai-summary",
    text: `Today I met with ${output.hcp_name} and discussed ${output.summary}.`,
  },

  
  {
    type: "ai-success",
    text: "✅ Interaction logged successfully! The details have been auto-filled.",
  },
]);

    setData(output);
    setInput("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">

      <h2 className="font-semibold mb-2">AI Assistant</h2>

      
      <div className="bg-gray-100 text-sm p-2 rounded mb-2">
        Log interaction via chat.
      </div>

      
      <div className="flex-1 border rounded p-3 overflow-y-auto space-y-3">

        {messages.map((msg, i) => (
  <div key={i}>

    
    {msg.type === "user" && (
      <div className="bg-blue-100 p-2 rounded text-sm">
        {msg.text}
      </div>
    )}

    
    {msg.type === "ai-summary" && (
      <div className="bg-gray-100 p-2 rounded border-l-4 border-blue-500 text-sm">
        {msg.text}
      </div>
    )}

    
    {msg.type === "ai-success" && (
      <div className="bg-green-100 p-2 rounded text-sm">
        {msg.text}
      </div>
    )}

  </div>
))}

      </div>

      
      <div className="flex mt-2 gap-2">
        <input
          className="input flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe interaction..."
        />
        <button
          onClick={sendMessage}
          className="bg-gray-700 text-white px-3 rounded hover:bg-gray-800"
        >
          Log
        </button>
      </div>

    </div>
  );
}

export default Chat;