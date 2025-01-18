import { LogOut, MessageSquare, Settings, User, Newspaper, Mic } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const Navbar = () => { // Remove setText from the props
  const { logout, authUser } = useAuthStore();
  const [isListening, setIsListening] = useState(false);
  
  // Initialize the speech recognition
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechRecognition = new recognition();

  speechRecognition.lang = "en-US"; // Set the language
  speechRecognition.interimResults = false; // Don't show partial results

  // Function to handle speech input
  const handleSpeechClick = () => {
    if (isListening) {
      speechRecognition.stop(); // Stop listening if it's already active
      setIsListening(false);
    } else {
      speechRecognition.start(); // Start listening
      setIsListening(true);
    }
  };

  // Handle speech recognition results
  speechRecognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    console.log("Speech Result:", result); // Log the speech result in the console
  };

  // Handle any errors in speech recognition
  speechRecognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
  };

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chat iT ;)</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Speech Icon with animation */}
            <button
              onClick={handleSpeechClick}
              className={`flex items-center justify-center p-2 rounded-full 
                ${isListening ? "bg-primary text-white animate-pulse" : "bg-base-content text-base-200"}`}
            >
              <Mic className={`w-5 h-5 ${isListening ? "text-white" : "text-base-200"}`} />
            </button>

            <Link to={"/settings"} className="btn btn-sm gap-2 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* Link to News Page */}
            <Link to={"/news"} className="btn btn-sm gap-2 transition-colors">
              <Newspaper className="w-4 h-4" />
              <span className="hidden sm:inline">News</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
