import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Users,
  Gamepad,
  Database,
  Search,
  ChevronRight,
  Globe,
  Skull,
} from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import { Character, CharactersResponse } from "../types/Character";

interface FloatingCardProps {
  character: Character;
}

const FloatingCard = ({ character }: FloatingCardProps) => {
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);
  const startPosition = {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const animate = async () => {
      while (mounted) {
        await controls.start({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          transition: {
            duration: 20,
            ease: "linear",
          },
        });
      }
    };
    animate();
  }, [controls, mounted]);

  return (
    <motion.div
      initial={startPosition}
      animate={controls}
      className="absolute"
      style={{ zIndex: 1 }}
    >
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400/30 shadow-lg">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const { loading, error, data } = useQuery<CharactersResponse>(
    GET_CHARACTERS,
    {
      variables: { page: 1 },
    }
  );
  const [floatingCharacters, setFloatingCharacters] = useState<Character[]>([]);

  useEffect(() => {
    if (data?.characters?.results) {
      setFloatingCharacters(data.characters.results.slice(0, 6));
    }
  }, [data]);

  const features = [
    {
      icon: <Users className="w-12 h-12 text-yellow-400" />,
      title: t("character_explorer"),
      description: t("character_explorer_desc"),
      link: "/characters",
    },
    {
      icon: <Gamepad className="w-12 h-12 text-yellow-400" />,
      title: t("guessing_game"),
      description: t("guessing_game_desc"),
      link: "/characters",
    },
    {
      icon: <Database className="w-12 h-12 text-yellow-400" />,
      title: t("graphql_integration"),
      description: t("graphql_integration_desc"),
      link: "/characters",
    },
    {
      icon: <Search className="w-12 h-12 text-yellow-400" />,
      title: t("advanced_filtering"),
      description: t("advanced_filtering_desc"),
      link: "/characters",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8 relative overflow-hidden"
    >
      {/* Loading State */}
      {loading && !floatingCharacters.length && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex justify-center items-center backdrop-blur-sm z-50"
        >
          <div className="animate-spin rounded-full h-24 w-24 border-8 border-yellow-400 border-t-transparent"></div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex justify-center items-center backdrop-blur-sm z-50"
        >
          <div className="text-white text-center p-6 bg-red-500/20 backdrop-blur-sm rounded-xl max-w-lg">
            <Skull
              size={48}
              className="mx-auto mb-4 text-red-400 animate-pulse"
            />
            {t("error")}: {error.message}
          </div>
        </motion.div>
      )}

      {/* Floating Character Cards */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingCharacters.map((character) => (
          <FloatingCard key={character.id} character={character} />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6 text-shadow-lg">
            {t("welcome_title")}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto backdrop-blur-sm p-4 rounded-lg">
            {t("welcome_description")}
          </p>

          {/* Language Switcher */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => i18n.changeLanguage("en")}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Globe size={16} />
              English
            </button>
            <button
              onClick={() => i18n.changeLanguage("de")}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Globe size={16} />
              Deutsch
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, rotate: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border-2 border-yellow-400/30 hover:border-yellow-400 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h2>
              <p className="text-white/80 mb-4">{feature.description}</p>
              <Link
                to={feature.link}
                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                {t("explore_now")}
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/characters"
            className="inline-flex items-center px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t("start_exploring")}
            <ChevronRight className="ml-2 w-6 h-6" />
          </Link>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default HomePage;
