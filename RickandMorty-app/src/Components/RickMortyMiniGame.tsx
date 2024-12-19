import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Character } from "../types/Character";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import { useTranslation } from "react-i18next";
import {
  Target,
  Star,
  Award,
  Clock,
  RefreshCw,
  Heart,
  Zap,
  Info,
} from "lucide-react";

const RickMortyMiniGame = () => {
  const { t } = useTranslation();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() =>
    parseInt(localStorage.getItem("rickMortyHighScore") || "0", 10)
  );
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<"idle" | "playing" | "game-over">(
    "idle"
  );
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [gameVariant, setGameVariant] = useState<"name" | "origin" | "status">(
    "name"
  );
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const { loading, data } = useQuery<{ characters: { results: Character[] } }>(
    GET_CHARACTERS,
    {
      variables: { page: 1 },
    }
  );

  // Memoize character selection to avoid recomputing on every render
  const selectCharactersForRound = useCallback((chars: Character[]) => {
    const roundCharacters = chars.sort(() => 0.5 - Math.random()).slice(0, 4);

    const characterToGuess =
      roundCharacters[Math.floor(Math.random() * roundCharacters.length)];

    return { roundCharacters, characterToGuess };
  }, []);

  // Reset game when characters are loaded
  useEffect(() => {
    if (data?.characters.results) {
      const shuffled = [...data.characters.results]
        .sort(() => 0.5 - Math.random())
        .slice(0, 50);
      setCharacters(shuffled);
    }
  }, [data]);

  // Time countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState("game-over");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Start game function
  const startGame = useCallback(() => {
    if (characters.length === 0) return;

    const { roundCharacters, characterToGuess } =
      selectCharactersForRound(characters);

    setGameState("playing");
    setScore(0);
    setLives(3);
    setCurrentRound(1);
    setStreak(0);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setTimeLeft(difficulty === "easy" ? 45 : difficulty === "medium" ? 30 : 20);

    // Set selected characters and character to guess
    setSelectedCharacters(roundCharacters);
    setSelectedCharacter(characterToGuess);
  }, [characters, difficulty, selectCharactersForRound]);

  // Character selection handler
  const handleCharacterSelect = useCallback(
    (character: Character) => {
      let isCorrect = false;
      setTotalAttempts((prev) => prev + 1);

      switch (gameVariant) {
        case "name":
          isCorrect = character === selectedCharacter;
          break;
        case "origin":
          isCorrect = character.origin.name === selectedCharacter?.origin.name;
          break;
        case "status":
          isCorrect = character.status === selectedCharacter?.status;
          break;
      }

      if (isCorrect) {
        setTotalCorrect((prev) => prev + 1);
        setStreak((prev) => prev + 1);
        setScore((prev) => {
          const streakBonus = Math.floor(streak / 3) * 2;
          const difficultyPoints =
            difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
          const newScore = prev + difficultyPoints + streakBonus;

          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("rickMortyHighScore", newScore.toString());
          }
          return newScore;
        });
        setCurrentRound((prev) => prev + 1);

        // Select new characters for next round
        const { roundCharacters, characterToGuess } =
          selectCharactersForRound(characters);
        setSelectedCharacters(roundCharacters);
        setSelectedCharacter(characterToGuess);
      } else {
        setStreak(0);
        setLives((prev) => {
          const newLives = prev - 1;
          if (newLives === 0) {
            setGameState("game-over");
          }
          return newLives;
        });
      }
    },
    [
      selectedCharacter,
      gameVariant,
      difficulty,
      characters,
      selectCharactersForRound,
      highScore,
      streak,
    ]
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-16 h-16 border-4 border-t-yellow-400 border-r-green-400 border-b-blue-400 border-l-purple-400 rounded-full"
        />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-xl border-2 border-yellow-400/30 shadow-xl overflow-hidden"
    >
      {/* Game Header */}
      <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <Target className="mr-3 text-yellow-400" />
            {t("guessing_game")}
          </h2>
          {gameState === "idle" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value as "easy" | "medium" | "hard")
                }
                className="bg-white/10 border-2 border-yellow-400 text-white p-2 rounded-full backdrop-blur-sm focus:outline-none"
              >
                <option value="easy" className="text-black">
                  {t("difficulty_easy", "Easy")}
                </option>
                <option value="medium" className="text-black">
                  {t("difficulty_medium", "Medium")}
                </option>
                <option value="hard" className="text-black">
                  {t("difficulty_hard", "Hard")}
                </option>
              </select>
              <select
                value={gameVariant}
                onChange={(e) =>
                  setGameVariant(e.target.value as "name" | "origin" | "status")
                }
                className="bg-white/10 border-2 border-yellow-400 text-white p-2 rounded-full backdrop-blur-sm focus:outline-none"
              >
                <option value="name" className="text-black">
                  {t("guess_name", "Guess Name")}
                </option>
                <option value="origin" className="text-black">
                  {t("guess_origin", "Guess Origin")}
                </option>
                <option value="status" className="text-black">
                  {t("guess_status", "Guess Status")}
                </option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Idle State */}
        {gameState === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center text-white"
          >
            <p className="text-xl mb-8">{t("guessing_game_desc")}</p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/30">
                <Star className="mx-auto mb-3 text-yellow-400" />
                <p>
                  {t(
                    "choose_difficulty",
                    "Choose your difficulty and game variant"
                  )}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/30">
                <Zap className="mx-auto mb-3 text-yellow-400" />
                <p>{t("build_streaks", "Build streaks for bonus points!")}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/30">
                <Award className="mx-auto mb-3 text-yellow-400" />
                <p>
                  {t("beat_highscore", "Earn points and beat your high score!")}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              {t("start_game", "Start Game")}
            </motion.button>
            <div className="mt-4 text-sm text-yellow-200 flex items-center justify-center">
              <Info className="mr-2" />
              {t("default_mode", "Default mode: Easy Difficulty, Guess Name")}
            </div>
          </motion.div>
        )}

        {/* Playing State */}
        {gameState === "playing" && selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            {/* Game Stats */}
            <div className="flex flex-wrap justify-between items-center mb-6 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/30">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(lives)].map((_, i) => (
                    <Heart key={i} className="text-red-400 fill-red-400" />
                  ))}
                </div>
                <span className="font-bold">
                  {t("round", "Round")}: {currentRound}
                </span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Clock className="mr-2 text-yellow-400" />
                  <span className="font-bold text-xl">{timeLeft}s</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-2 text-yellow-400" />
                  <span className="font-bold">
                    {t("score", "Score")}: {score}
                  </span>
                </div>
                <div className="flex items-center">
                  <Zap className="mr-2 text-yellow-400" />
                  <span className="font-bold">
                    {t("streak", "Streak")}: {streak}
                  </span>
                </div>
              </div>
            </div>

            {/* Challenge Text */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">
                {gameVariant === "name" &&
                  t("find_character", "Find {{name}}!", {
                    name: selectedCharacter.name,
                  })}
                {gameVariant === "origin" &&
                  t("find_origin", "Find a character from {{origin}}!", {
                    origin: selectedCharacter.origin.name,
                  })}
                {gameVariant === "status" &&
                  t("find_status", "Find a character with {{status}} status!", {
                    status: selectedCharacter.status,
                  })}
              </h3>
            </div>

            {/* Character Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedCharacters.map((character) => (
                <motion.div
                  key={character.id}
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCharacterSelect(character)}
                  className="cursor-pointer"
                >
                  <div className="relative group">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-40 object-cover rounded-lg border-2 border-yellow-400/30 group-hover:border-yellow-400 transition-all"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 rounded-b-lg">
                      <p className="text-white text-center text-sm truncate">
                        {character.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Game Over State */}
        {gameState === "game-over" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative text-white h-full"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            <div className="relative z-10 flex flex-col items-center justify-center p-8 h-full">
              <h2 className="text-4xl font-bold mb-8">
                {t("game_over", "Game Over!")}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full max-w-2xl">
                <div className="bg-white/10 p-6 rounded-xl border border-yellow-400/30">
                  <Star className="mx-auto mb-3 text-yellow-400" />
                  <p className="text-lg">
                    {t("final_score", "Final Score")}
                    <span className="block text-3xl font-bold text-yellow-400 mt-2">
                      {score}
                    </span>
                  </p>
                </div>

                <div className="bg-white/10 p-6 rounded-xl border border-yellow-400/30">
                  <Award className="mx-auto mb-3 text-yellow-400" />
                  <p className="text-lg">
                    {t("high_score", "High Score")}
                    <span className="block text-3xl font-bold text-yellow-400 mt-2">
                      {highScore}
                    </span>
                  </p>
                </div>

                <div className="bg-white/10 p-6 rounded-xl border border-yellow-400/30">
                  <Target className="mx-auto mb-3 text-yellow-400" />
                  <p className="text-lg">
                    {t("accuracy", "Accuracy")}
                    <span className="block text-3xl font-bold text-yellow-400 mt-2">
                      {totalAttempts > 0
                        ? Math.round((totalCorrect / totalAttempts) * 100)
                        : 0}
                      %
                    </span>
                  </p>
                </div>

                <div className="bg-white/10 p-6 rounded-xl border border-yellow-400/30">
                  <Zap className="mx-auto mb-3 text-yellow-400" />
                  <p className="text-lg">
                    {t("correct_answers", "Correct Answers")}
                    <span className="block text-3xl font-bold text-yellow-400 mt-2">
                      {totalCorrect}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-yellow-500 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>{t("play_again", "Play Again")}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameState("idle")}
                  className="bg-white/10 text-white border-2 border-yellow-400/30 px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all"
                >
                  {t("exit", "Exit")}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RickMortyMiniGame;
