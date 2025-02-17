import React, {useState, useRef} from 'react';
import { Image, Send, X } from "lucide-react";
import toast from 'react-hot-toast';
import { useChatStore } from '../../store/useChatStore';
import {Filter} from "bad-words";
import * as nsfwjs from 'nsfwjs';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const [error, setError] = useState("");
    const {sendMessage} = useChatStore();
    const filter = new Filter();

    // Function to check for harmful images
  const checkImageForHarmfulness = async (imageBase64) => {
    console.log(imageBase64);
    try {
      const model = await nsfwjs?.load();
      const img = new window.Image(); // Create an HTML image element
      img.crossOrigin = "anonymous"; // Handle CORS issues
      img.src = imageBase64; // Set the Base64 string as the image source
      return new Promise((resolve)=>{
        img.onload = async()=>{
          try {
            const predictions = await model.classify(img);
            console.log("NSFW Predictions:", predictions);
            const harmful = predictions.some(
              (p) =>
                (["Porn", "Hentai", "Sexy"].includes(p.className) && p.probability > 0.7) ||
                (p.className === "Porn" && p.probability > 0.5)
            );
            resolve(harmful);
          } catch (error) {
            console.error("NSFWJS Classification Error:", error);
            resolve(false);
          }
        };

        img.onerror = () => {
          console.error("Error loading image for NSFW detection.");
          return false;
        }

      });
    } catch (error) {
        console.error("Error detecting harmful image:", error);
        return false;
      }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file");
          return;
        }

        if (file && file.size > 2 * 1024 * 1024) { // Limit to 2MB
          toast.error("File size exceeds 2MB. Please choose a smaller file.");
          e.target.value = "";
          return;
        }
    
        const reader = new FileReader();

        reader.onloadend = async()=>{
          setLoading(true);
          // const imageBase64 = reader.result;
          // const isHarmful = await checkImageForHarmfulness(imageBase64);
          // if(isHarmful){
          //   toast.error("Harmful content detected. Please choose another image.");
          //   setImagePreview(null);
          //   if (fileInputRef.current) fileInputRef.current.value = "";
          // }else{
          //   setImagePreview(reader.result);
          // }
          setImagePreview(reader.result);
          setLoading(false);
        }
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        const cleanedText = filter.clean(text.trim());

        if (cleanedText !== text.trim()) {
          toast.error("Your message contained inappropriate language and was filtered.");
        }
        try {
          await sendMessage({
            text: cleanedText,
            image: imagePreview,
          });
    
          // Clear form
          setText("");
          setImagePreview(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          // Reset textarea height
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height to default
          }
        } catch (error) {
          console.error("Failed to send message:", error.message);
        }
    };


  return (
    <div className="p-4 w-full bg-white border-t border-gray-300 flex items-center">
          {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-400
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
            <div className="flex-1 flex gap-2">
                <textarea
                rows="1"
                maxLength="1000"
                className="flex-1 mx-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                  const maxHeight = 150;
                  if (e.target.scrollHeight > maxHeight) {
                    e.target.style.height = `${maxHeight}px`; // Limit height to maxHeight
                    e.target.style.overflowY = "auto"; // Enable scrolling inside textarea
                  } else {
                    e.target.style.height = `${e.target.scrollHeight}px`; // Expand dynamically
                    e.target.style.overflowY = "hidden"; // Remove scrolling when not needed
                  }
                }}
                style={{
                  overflowY: "hidden", // Ensures scrollbars are hidden by default
                }}
                ref={(el) => (textareaRef.current = el)}
              />
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />

            <button
            type="button"
            className={`flex btn btn-circle items-center
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
            disabled = {loading} 
            >
            {loading ? "..." : <Image size={25} />}
          </button>
            </div>
            <button 
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <Send size={22}/>
            </button>
        </form>  
    </div>
  )
}

export default MessageInput