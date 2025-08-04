import React, { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: 'You', text: 'Hello!' },
    { from: 'Seller', text: 'Hi, how can I help you?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'You', text: input }]);
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 border rounded shadow">
      <h1 className="bg-green-600 text-white text-xl px-4 py-2 rounded-t">💬 Chat</h1>
      <div className="p-4 space-y-2 h-64 overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div 
            key={i}
            className={msg.from === 'You' 
              ? 'text-right' 
              : 'text-left'}
          >
            <span 
              className={msg.from === 'You' 
                ? 'inline-block bg-green-500 text-white px-2 py-1 rounded'
                : 'inline-block bg-gray-300 text-black px-2 py-1 rounded'}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t">
        <input
          className="flex-1 border rounded px-2 py-1 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
