import React, { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: 'You', text: 'Hello!' },
    { from: 'UniMarket', text: 'Hi! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Sending message to backend:', messages);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to state
    setMessages(prev => [...prev, { from: 'You', text: input }]);
    const userInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://unimarket-backend-ckak.onrender.com/api/seller/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { from: 'UniMarket', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { from: 'UniMarket', text: '⚠️ Failed to get reply.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { from: 'UniMarket', text: '⚠️ Server error. Try again later.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 border rounded shadow bg-white flex flex-col h-[80vh]">
      <h1 className="bg-green-600 text-white text-xl px-4 py-2 rounded-t">💬 UniMarket Chat</h1>
      <div className="flex-1 p-4 space-y-2 overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'You' ? 'justify-end' : 'justify-start'}`}>
            <span
              className={`inline-block px-3 py-2 rounded-2xl shadow
                ${msg.from === 'You' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-900'}`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <span className="inline-block px-3 py-2 rounded-2xl shadow bg-gray-200 text-gray-900 animate-pulse">
              Typing...
            </span>
          </div>
        )}
      </div>
      <div className="flex p-2 border-t">
        <input
          className="flex-1 border rounded px-3 py-2 mr-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
