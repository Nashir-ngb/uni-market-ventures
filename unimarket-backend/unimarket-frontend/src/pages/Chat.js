import React, { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: 'Seller', text: 'Hi! Welcome to UniMarket 🌱 How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const getAIReply = async (userMessage) => {
    const response = await fetch('https://unimarket-backend-ckak.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    return data.reply;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: 'You', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const botReply = await getAIReply(input);

      if (input.toLowerCase().includes('book')) {
        const botMsg = {
          from: 'Seller',
          text: botReply,
          button: {
            label: 'Book Counsellor Appointment',
            action: () => window.location.href = '/booking'  // adjust to your route
          }
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        const botMsg = { from: 'Seller', text: botReply };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { from: 'Seller', text: "Oops! Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 border rounded shadow bg-white flex flex-col">
      <h1 className="bg-green-600 text-white text-xl px-4 py-2 rounded-t">💬 Chat</h1>
      <div className="p-4 space-y-2 h-80 overflow-y-auto bg-gray-50 flex-1">
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === 'You' ? 'text-right' : 'text-left'}>
            <div
              className={msg.from === 'You'
                ? 'inline-block bg-green-500 text-white px-3 py-2 rounded-2xl shadow'
                : 'inline-block bg-white text-gray-900 px-3 py-2 rounded-2xl border shadow'}
            >
              {msg.text}
            </div>
            {msg.button && (
              <div className="mt-2">
                <button
                  onClick={msg.button.action}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  {msg.button.label}
                </button>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <div className="inline-block bg-white text-gray-900 px-3 py-2 rounded-2xl border shadow animate-pulse">
              Seller is typing...
            </div>
          </div>
        )}
      </div>
      <div className="flex p-2 border-t">
        <input
          className="flex-1 border rounded px-2 py-1 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
