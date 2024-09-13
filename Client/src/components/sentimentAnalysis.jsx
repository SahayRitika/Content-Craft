import { useState } from "react";
import axios from "axios";

function App() {
  const [comment, setComment] = useState("");
  const [sentiment, setSentiment] = useState("");

  const getSentiment = async () => {
    setSentiment("loading...");

    
    try {
    const apiKey = import.meta.env.VITE_ChatBot_KEY;
    const response = await axios({
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
    method: 'post',
    data: {
      contents: [{ parts: [{ text: comment+"." +"Analyze the statement and anwser in Postive Negative or Neutral only. Only one word answer." }] }],
    },
  });

      const sentimentResponse=response.data.candidates[0].content.parts[0].text;
      setSentiment(sentimentResponse);
    } catch (error) {
      setSentiment("Error");
    }
  };

  const sentimentColor = sentiment === "Positive"
    ? "text-yellow-500"
    : sentiment === "Neutral"
    ? "text-blue-500"
    : sentiment === "Negative"
    ? "text-red-500"
    : "text-gray-500";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">Analysis Sentiments</h1>
      <p className="text-xl text-gray-600 mb-8">To know your audience better</p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Upload your comments here"
        className="border-2 border-gray-300 p-2 rounded-lg mb-4 w-96"
      ></textarea>
      <button
        onClick={getSentiment}
        className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Done
      </button>
      {sentiment && (
        <div className={`text-2xl font-bold ${sentimentColor}`}>
          {sentiment}
        </div>
      )}
      <img
        src="https://calln.com/wp-content/uploads/2019/10/Sentiment-Analysis-Infographic-860x600-860x600.png"
        alt="Audience"
        className="absolute left-0 bottom-0 w-[500px] h-[400px]" 
      />
    </div>
  );
}

export default App;
