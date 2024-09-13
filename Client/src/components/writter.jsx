// App.js
import { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("loading....");
    try {
      const apiKey = import.meta.env.VITE_ChatBot_KEY;
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer("Error fetching response.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="grid grid-cols-2 gap-4 p-8 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-center">
          <img
            src="https://blog.taaonline.net/wp-content/uploads/2013/07/social-media.jpg"
            alt="Content Craft"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-center p-4 space-y-4">
          <h1 className="text-4xl font-semibold text-red-600">Content Writer</h1>
          <p className="text-lg text-blue-700">
            I can write blogs, posts, captions, etc.
          </p>
          <div className="flex flex-col space-y-2">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="4"
              className="p-2 border rounded shadow-sm"
              placeholder="How can I help?"
            />
            <button
              onClick={generateAnswer}
              className="px-4 py-2 text-white bg-teal-600 rounded hover:bg-teal-700"
            >
              Generate Answer
            </button>
            <pre className="p-2 overflow-auto bg-gray-100 border rounded shadow-inner">
              {answer}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
