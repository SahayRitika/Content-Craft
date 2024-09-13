import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_IG_KEY;
  const apiEndpoint = 'https://modelslab.com/api/v6/realtime/text2img';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      key: apiKey,
      prompt: text,
      negative_prompt: 'bad quality',
      width: 512,
      height: 512,
      safety_checker: false,
      seed: null,
      samples: 1,
      base64: false,
      webhook: null,
      track_id: null,
    };

    try {
      const response = await axios.post(apiEndpoint, data, { headers });
      console.log('API Response:', response.data); // Log the API response
      if (response.data && response.data.output && response.data.output.length > 0) {
        const imageUrl = response.data.output[0];
        setImage(imageUrl);
      } else {
        console.error('API response format is invalid');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `generated_image_${new Date().getTime()}.png`;
    link.click();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('https://www.pixelstalk.net/wp-content/uploads/2016/10/Images-dock-wood-light.jpg')` }} // Updated background URL
    >
      <h1 className="text-orange-500 text-4xl mb-2">AI Image Generator</h1>
      <p className="text-white mb-8">Use words to create stunning visuals</p>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Write something here...."
          className="px-4 py-2 rounded-full outline-none w-96"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
        >
          Generate
        </button>
      </form>
      {loading ? (
        <p className="text-white mt-4">Generating images may take a few minutes; kindly be patient</p>
      ) : (
        image && (
          <div className="mt-4">
            <img src={image} alt="Generated" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
            <button
              onClick={handleDownload}
              className="bg-orange-500 text-white px-8 py-2 rounded-full mt-5 ml-14 hover:bg-orange-600"
            >
              Download
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default App;
