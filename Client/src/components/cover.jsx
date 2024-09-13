// App.jsx
import React from "react";

// Importing images from the Assets folder
import ChatBotIcon from "../assets/friendly-chatbot.jpg"; 
import imageIcon from "../assets/camera.jpg";
import SentiMentIcon from "../assets/sentiment analysis.webp";
import BlogIcon from "../assets/pen.jpg";
import CC from "../assets/cc.jpg";
import { Link } from "react-router-dom";

const ContentCraft = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Header Section */}
      <header className="text-center py-8 relative">
        <h1 className="text-xl font-['Baskerville Old Face'] font-bold">
          Master your Content with the power of AI
        </h1>
        <h2 className="text-4xl font-['Ink_Free'] text-[#97ee51] font-bold mt-2">
          ContentCraft
        </h2>
        <img
          src={CC}
          alt="Content Craft Illustration"
          className="mx-auto mt-4"
          style={{ maxWidth: "250px", height: "auto" }}
        />
      </header>

      {/* Main Content Section */}
      <section className="bg-[#C6F0A4] py-10 flex-grow-0">
        <h2 className="text-3xl font-['Baskerville Old Face'] text-center mb-8">
          Instant Content Generation with AI
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10">
          {/* Option 1: Blog Posts */}
          <Link to="/Chatbot">
            <div className="flex flex-col items-center cursor-pointer transition hover:-translate-y-1">
              <div className="bg-white border border-black rounded-md p-2 flex items-center justify-center">
                <img src={ChatBotIcon} alt="Blog Icon" className="w-32 h-32" />
              </div>
              <p className="text-center mt-2">
                Talk about your ideas, thoughts with our converational bot!
              </p>
            </div>
          </Link>

          {/* Option 2: Images */}
          <Link to="/imagegen">
            <div className="flex flex-col items-center cursor-pointer transition hover:-translate-y-1">
              <div className="bg-white border border-black rounded-md p-2 flex items-center justify-center">
                <img src={imageIcon} alt="icon" className="w-32 h-32" />
              </div>
              <p className="text-center mt-2">
                Generate Images as per your need.
              </p>
            </div>
          </Link>

          {/* Option 3: Videos */}
          <Link to="/sentimentanalysis">
            <div className="flex flex-col items-center cursor-pointer transition hover:-translate-y-1">
              <div className="bg-white border border-black rounded-md p-2 flex items-center justify-center">
                <img
                  src={SentiMentIcon}
                  alt="Video Icon"
                  className="w-32 h-32"
                />
              </div>

              <p className="text-center mt-2">
                Anaylsis the sentiments of your auidence to know what they like/dislike
              </p>
            </div>
          </Link>

          {/* Option 4: Music */}
          <Link to="/writter">
          <div className="flex flex-col items-center cursor-pointer transition hover:-translate-y-1">
            <div className="bg-white border border-black rounded-md p-2 flex items-center justify-center">
              <img src={BlogIcon} alt="Music Icon" className="w-32 h-32" />
            </div>
            
              <p className="text-center mt-2">
                Generate blogs, posts, captions with the help of our writter
              </p>
            
          </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ContentCraft;
