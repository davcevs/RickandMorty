import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Character } from "../types/Character";
import { X, Zap, Skull, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CharacterDetailModalProps {
  character: Character | null;
  onClose: () => void;
}

const statusIcons = {
  Alive: <Zap className="text-green-400 animate-pulse" />,
  Dead: <Skull className="text-red-400 animate-pulse" />,
  Unknown: <HelpCircle className="text-yellow-400 animate-pulse" />,
};

const CharacterDetailModal = ({
  character,
  onClose,
}: CharacterDetailModalProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"info" | "stats">("info");

  if (!character) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-400 to-blue-500 p-1 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gray-900 rounded-2xl overflow-hidden">
            <div className="relative">
              <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={character.image}
                alt={character.name}
                className="w-full h-96 object-cover"
              />
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
              >
                <X className="text-white" />
              </motion.button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl font-extrabold text-white drop-shadow-lg"
                >
                  {character.name}
                </motion.h2>
              </div>
            </div>

            <div className="p-6 text-white">
              <div className="flex border-b border-white/20 mb-4">
                {[
                  { key: "info", label: t("character_info") },
                  { key: "stats", label: t("multiverse_stats") },
                ].map(({ key, label }) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(key as "info" | "stats")}
                    className={`px-4 py-2 ${
                      activeTab === key
                        ? "border-b-2 border-yellow-400 text-yellow-400"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "info" && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-blue-300">
                        {t("basic_information")}
                      </h3>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2">
                          <strong>{t("status")}:</strong>{" "}
                          {t(character.status.toLowerCase())}{" "}
                          {statusIcons[character.status]}
                        </p>
                        <p>
                          <strong>{t("species")}:</strong>{" "}
                          {t(character.species.toLowerCase())}
                        </p>
                        <p>
                          <strong>{t("gender")}:</strong>{" "}
                          {t(character.gender.toLowerCase())}
                        </p>
                        <p>
                          <strong>{t("origin")}:</strong>{" "}
                          {t(character.origin.name)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-blue-300">
                        {t("multiverse_context")}
                      </h3>
                      <p className="text-white/80">
                        {t("multiverse_description")}
                      </p>
                      <div className="bg-white/10 p-3 rounded-lg mt-2 backdrop-blur-sm">
                        <p className="text-sm text-yellow-400">
                          {t("dimension_probability")}:{" "}
                          {Math.floor(Math.random() * 100)}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "stats" && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-blue-300">
                        {t("survival_rating")}
                      </h3>
                      <div className="w-full bg-white/10 rounded-full h-4 mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width:
                              character.status === "Alive"
                                ? "83.33%"
                                : character.status === "Dead"
                                ? "25%"
                                : "50%",
                          }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-4 rounded-full ${
                            character.status === "Alive"
                              ? "bg-green-400"
                              : character.status === "Dead"
                              ? "bg-red-400"
                              : "bg-yellow-400"
                          }`}
                        />
                      </div>
                      <p className="text-sm text-white/60">
                        {t("survival_description")}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-blue-300">
                        {t("meta_information")}
                      </h3>
                      <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                        <p>
                          <strong>{t("character_id")}:</strong> {character.id}
                        </p>
                        <p className="text-xs text-yellow-400 mt-1">
                          {t("id_description")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CharacterDetailModal;
