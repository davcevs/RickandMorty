import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import { motion } from "framer-motion";

const rickAndMortyQuotes = [
  "I'm not a chatbot; I'm just smarter than you!",
  "Wubba Lubba Dub-Dub!",
  "Get your shit together, Morty!",
  "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come watch TV.",
  "The universe is a huge, messed-up place, and we're all just along for the ride.",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [randomCharacters, setRandomCharacters] = useState<string[]>([]);
  const [quote, setQuote] = useState<string>(rickAndMortyQuotes[0]);

  const { data } = useQuery(GET_CHARACTERS, {
    variables: { page: Math.floor(Math.random() * 42) + 1 },
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (data) {
      const characters = data.characters.results;
      const randomImages = [...characters]
        .sort(() => 0.5 - Math.random())
        .slice(0, 1)
        .map((character: { image: string }) => character.image);

      setRandomCharacters(randomImages);
    }
  }, [data]);

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * rickAndMortyQuotes.length);
    setQuote(rickAndMortyQuotes[randomIndex]);

    if (data) {
      const characters = data.characters.results;
      const randomImages = [...characters]
        .sort(() => 0.5 - Math.random())
        .slice(0, 1)
        .map((character: { image: string }) => character.image);

      setRandomCharacters(randomImages);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-2 right-4 z-50 ">
      {/* Chatbot Button */}
      {!isOpen && (
        <motion.div
          className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-full shadow-xl hover:scale-105 cursor-pointer"
          onClick={toggleChat}
          whileHover={{ rotate: 5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a6/Rick_Sanchez.png"
            alt="Rick"
            className="w-12 h-12 rounded-full border-2 border-blue-400"
          />
          <span className="text-lg font-bold font-rick-and-morty">
            MultiverseBot
          </span>
        </motion.div>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <motion.div
          className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-xl w-80 p-4 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {/* Portal Animation with Character Images */}
          <div className="absolute -top-10 -left-10 w-36 h-36 bg-gradient-to-br from-green-400 to-blue-400 rounded-full animate-pulse blur-lg opacity-70"></div>
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-400 rounded-full animate-spin-slow"></div>
          <div className="absolute -top-6 -left-6 w-28 h-28 flex items-center justify-center">
            {randomCharacters.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt="Character"
                className="w-full h-full rounded-full border-2 border-green-500 shadow-lg"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.3 }}
              />
            ))}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/a/a6/Rick_Sanchez.png"
                alt="Rick"
                className="w-10 h-10 rounded-full border-2 border-green-400"
              />
              <h2 className="text-lg font-bold font-rick-and-morty text-green-400">
                MultiverseBot
              </h2>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={toggleChat}
            >
              ✖
            </button>
          </div>

          {/* Content */}
          <p className="text-sm bg-gray-700 p-3 rounded-lg shadow-inner border-l-4 border-green-500">
            {quote}
          </p>

          {/* Get New Quote Button */}
          <button
            onClick={getNewQuote}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Get New Quote
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ChatBot;
