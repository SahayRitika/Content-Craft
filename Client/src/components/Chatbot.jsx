
import axios from "axios";
import { useState } from "react";

function App() {
  console.log('ChatBot component rendering...');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('Hi there! How can I help you today?');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Hi there! How can I help you today?' },
  ]);
  // Function to generate the answer using the Gemini API
  async function generateAnswer() {
    if (!question.trim()) return; // Prevent empty questions

    // Add the user's question to chat history
    setChatHistory((prev) => [...prev, { type: 'user', message: question }]);
    setAnswer('loading....');

    try {
        const apiKey = import.meta.env.VITE_ChatBot_KEY;
        const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        method: 'post',
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const newAnswer = response.data.candidates[0].content.parts[0].text;

      // Update chat history with the bot's answer
      setChatHistory((prev) => [...prev, { type: 'bot', message: newAnswer }]);
      setAnswer(newAnswer);
    } catch (error) {
      setAnswer('Sorry, something went wrong.');
    }
    setQuestion(''); // Clear the input field
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-500">
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg h-[600px]"> {/* Increased the height */}
        <h1 className="text-center text-2xl font-bold text-indigo-600 mb-2">
         Chat Bot
        </h1>

        {/* Chat History Display with Scroll */}
        <div className="h-[400px] overflow-y-auto p-3 bg-gray-100 rounded-lg mb-4"> {/* Adjusted height for better spacing */}
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`${
                chat.type === 'user' ? 'text-right' : 'text-left'
              } mb-2`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-xl ${
                  chat.type === 'user'
                    ? 'bg-indigo-200 text-indigo-800'
                    : 'bg-indigo-500 text-white'
                } max-w-full break-words`} 
              >
                {chat.message}
              </span>
            </div>
          ))}
        </div>

        {/* Input field and button */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full p-2 text-indigo-700 bg-gray-200 rounded-full focus:outline-none"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateAnswer()}
          />
          <button
            className="p-2 bg-indigo-500 rounded-full text-white focus:outline-none hover:bg-indigo-600"
            onClick={generateAnswer}
          >
            {/* Send icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;