import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TermsModal from "./components/TermsModal";
import ImageModal from "./components/ImageModal";
import PromptInput from "./components/PromptInput";
import ChatHistory from "./components/ChatHistory";
import ImageResults from "./components/ImageResults";
import Footer from "./components/Footer";
const API_URL = "https://text.pollinations.ai/";
const IMAGE_API_URL = "https://image.pollinations.ai/prompt/";

const modelConfigs = {
  flux: { name: "Flux (Default)", strength: 1.0 },
  turbo: { name: "Turbo", strength: 0.9 },
};

const presets = {
  cinematic: "cinematic shot, dramatic lighting, professional photography, 8k resolution",
  anime: "anime art style, vibrant colors, studio ghibli inspired, detailed illustration",
  portrait: "professional portrait, bokeh background, natural lighting, high detail",
  fantasy: "fantasy art, magical atmosphere, ethereal lighting, detailed environment",
  abstract: "abstract art, contemporary style, vibrant colors, geometric patterns",
  cyberpunk: "cyberpunk style, neon lights, futuristic, high tech, detailed",
  minimalist: "minimalist design, clean lines, simple composition, elegant",
  vintage: "vintage style, retro aesthetic, nostalgic colors, film grain",
};

function App() {
  const [termsAccepted, setTermsAccepted] = useState(localStorage.getItem("termsAccepted"));
  const [chatHistory, setChatHistory] = useState([]);
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("flux");
  const [imageCount, setImageCount] = useState(1);
  const [referenceImage, setReferenceImage] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [apiStatus, setApiStatus] = useState("Checking APIs...");

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const textResponse = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: "statustest" }], model: "openai" }),
      });
      const imageResponse = await fetch(`${IMAGE_API_URL}test?width=64&height=64`);
      if (textResponse.ok && imageResponse.ok) {
        setApiStatus("APIs Online");
      } else {
        throw new Error("One or more APIs offline");
      }
    } catch (error) {
      setApiStatus("APIs Offline");
    }
  };

  const enhancePrompt = async () => {
    if (!prompt) return;
    try {
      const messages = [
        {
          role: "system",
          content:
            "You are a prompt engineering expert specializing in creating detailed, artistic image generation prompts.",
        },
      ];
      if (referenceImage) {
        const imageResponse = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              { role: "system", content: "You are a computer vision expert." },
              {
                role: "user",
                content: [
                  { type: "text", text: "Describe this image's style and key elements briefly:" },
                  { type: "image_url", image_url: { url: referenceImage } },
                ],
              },
            ],
            model: "openai",
          }),
        });
        const imageDescription = await imageResponse.text();
        messages.push({
          role: "user",
          content: `Enhance this image prompt while incorporating elements from this reference image: ${imageDescription}\n\nPrompt to enhance: ${prompt}`,
        });
      } else {
        messages.push({
          role: "user",
          content: `Enhance this image prompt with artistic details and technical specifications: ${prompt}`,
        });
      }
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, model: "openai", seed: Math.floor(Math.random() * 1000) }),
      });
      const enhancedPrompt = await response.text();
      setChatHistory([...chatHistory, { role: "user", content: prompt }, { role: "assistant", content: enhancedPrompt }]);
      setPrompt(enhancedPrompt);
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    }
  };

  const generateImages = async () => {
    if (!prompt) return;
    setImages([]);
    let finalPrompt = prompt;
    if (referenceImage) {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a computer vision expert." },
            {
              role: "user",
              content: [
                { type: "text", text: "Describe this image's style and key elements briefly:" },
                { type: "image_url", image_url: { url: referenceImage } },
              ],
            },
          ],
          model: "openai",
        }),
      });
      const imageDescription = await response.text();
      finalPrompt = `${prompt}, similar to: ${imageDescription}`;
    }
    const imagePromises = Array.from({ length: imageCount }, async () => {
      const seed = Math.floor(Math.random() * 1000000);
      const encodedPrompt = encodeURIComponent(finalPrompt);
      const imageUrl = `${IMAGE_API_URL}${encodedPrompt}?nologo=true&seed=${seed}&model=${model}`;
      return imageUrl;
    });
    try {
      const imageUrls = await Promise.all(imagePromises);
      setImages(imageUrls);
    } catch (error) {
      console.error("Error generating images:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900/20 to-black text-white">
      {!termsAccepted && <TermsModal onAccept={() => setTermsAccepted(true)} />}
      {modalImage && <ImageModal imageSrc={modalImage} onClose={() => setModalImage(null)} />}
      <Header apiStatus={apiStatus} />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            enhancePrompt={enhancePrompt}
            generateImages={generateImages}
            model={model}
            setModel={setModel}
            imageCount={imageCount}
            setImageCount={setImageCount}
            referenceImage={referenceImage}
            setReferenceImage={setReferenceImage}
            presets={presets}
          />
          <ChatHistory chatHistory={chatHistory} />
          <ImageResults images={images} onImageClick={setModalImage} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;