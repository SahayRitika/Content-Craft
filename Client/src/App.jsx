// App.jsx
import React, { useState } from "react";

// Importing images from the Assets folder
import ChatBotIcon from "./assets/friendly-chatbot.jpg"; 
import imageIcon from "./assets/camera.jpg";
import SentiMentIcon from "./assets/sentiment analysis.webp";
import BlogIcon from "./assets/pen.jpg";
import CC from "./assets/cc.jpg";
import { Link } from "react-router-dom";

const ContentCraft = () => {
  const [message, setMessage] = useState("");

  // Handler to show "Login first" message
  const handleClick = () => {
    setMessage("Login first");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Header Section */}
      <header className="text-center py-8 relative">
        <h1 className="text-xl font-serif">
          Master your Content with the power of AI
        </h1>
        <h2 className="text-7xl font-['Ink_Free'] text-[#97ee51] font-bold mt-2">
          ContentCraft
        </h2>
        <img
          src={CC}
          alt="Content Craft Illustration"
          className="mx-auto mt-4"
          style={{ maxWidth: "250px", height: "auto" }}
        />
        <div className="absolute top-4 right-8 flex">
          <Link to="/login">
          <button className="bg-[#C6F0A4] px-4 py-2 rounded-md mr-4 hover:bg-green-300">
            Login
          </button>
          </Link>
          <Link to="/signup">
          <button className="bg-[#C6F0A4] px-4 py-2 rounded-md hover:bg-green-300">
            Sign up
          </button>
          </Link>
        </div>
      </header>

      {/* Display "Login first" message above the colored section */}
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}

      {/* Main Content Section */}
      <section className="bg-[#C6F0A4] py-10 flex-grow-0">
        <h2 className="text-3xl font-serif text-center mb-8">
          Instant Content Generation with AI
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {/* Option 1: Chatbot */}
          <div className="flex flex-col items-center cursor-pointer transition hover:-translate-y-1"
            onClick={handleClick} 
          >
            <div className="bg-white border border-black rounded-md p-2 flex items-center justify-center">
              <img
                src={ChatBotIcon}
                alt="Blog Icon"
                className="w-32 h-32"
              />
            </div>
            <p className="text-center mt-2">
            Talk about your ideas, thoughts with our converational bot!
            </p>
          </div>

          {/* Option 2: Images */}
          <div
            className="flex flex-col items-center cursor-pointer transition hover:-translate-y-1"
            onClick={handleClick}
          >
            <div className="bg-white border border-black rounded-md p-2 flex items-center justify-center">
              <img
                src={imageIcon}
                alt="Image Icon"
                className="w-32 h-32" 
              />
            </div>
            <p className="text-center mt-2">
              Generate Images as per your need.
            </p>
          </div>

          {/* Option 3: Videos */}
          <div
            className="flex flex-col items-center cursor-pointer transition hover:-translate-y-1"
            onClick={handleClick}
          >
            <div className="bg-white border border-black rounded-md p-2 flex items-center justify-center">
              <img
                src={SentiMentIcon}
                alt="Video Icon"
                className="w-32 h-32" // Increased image size
              />
            </div>
            <p className="text-center mt-2">
            Anaylsis the sentiments of your auidence to know what they like/dislike
            </p>
          </div>

          {/* Option 4: Music */}
          <div
            className="flex flex-col items-center cursor-pointer transition hover:-translate-y-1"
            onClick={handleClick}
          >
            <div className="bg-white border border-black rounded-md p-2 flex items-center justify-center">
              <img
                src={BlogIcon}
                alt="Music Icon"
                className="w-32 h-32" // Increased image size
              />
            </div>
            <p className="text-center mt-2">
            Generate blogs, posts, captions with the help of our writter
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentCraft;
