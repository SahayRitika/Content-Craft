// src/MainRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ChatBot from "./components/Chatbot";
import ImageGen from "./components/imageGen";
import SentimentAnalysis from "./components/sentimentAnalysis";
import Writter from "./components/writter";
import Cover from "./components/cover";
import Signup from "./components/signUp";
import Login from "./components/login";
import App from "./App";

function MainRoutes() {
  return (
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Chatbot" element={<ChatBot />} />
        <Route path="/imagegen" element={<ImageGen />} />
        <Route path="/sentimentanalysis" element={<SentimentAnalysis />} />
        <Route path="/writter" element={<Writter />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/cover" element={<Cover />} />
      </Routes>
  );
}

export default MainRoutes;
