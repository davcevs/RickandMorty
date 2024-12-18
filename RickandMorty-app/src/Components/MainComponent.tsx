import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { useInView } from "react-intersection-observer";
import { GET_CHARACTERS } from "../graphql/queries";
import { Character, CharactersResponse } from "../types/Character";
import {
  Zap,
  Skull,
  HelpCircle,
  Filter,
  ArrowDownCircle,
  Gamepad,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Gender, Origin, Species, Status } from "../enums/CharacterEnums";
import RickMortyMiniGame from "./RickMortyMiniGame";
import CharacterDetailModal from "./CharacterDetailModal";

const MainComponent = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filters, setFilters] = useState({
    status: "",
    species: "",
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [showMiniGame, setShowMiniGame] = useState(false);

  const { loading, error, data, fetchMore } = useQuery<CharactersResponse>(
    GET_CHARACTERS,
    {
      variables: {
        page: 1,
        filter: {
          status: filters.status || undefined,
          species: filters.species || undefined,
        },
      },
    }
  );

  useEffect(() => {
    if (data?.characters.results) {
      setCharacters(data.characters.results);
      setIsFiltering(false);
    }
  }, [data]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const loadMoreCharacters = async () => {
      if (inView && data?.characters.info.next) {
        try {
          const moreData = await fetchMore({
            variables: {
              page: page + 1,
              filter: {
                status: filters.status || undefined,
                species: filters.species || undefined,
              },
            },
          });

          if (moreData.data?.characters?.results) {
            setCharacters((prev) => [
              ...prev,
              ...moreData.data.characters.results,
            ]);
            setPage((prev) => prev + 1);
          }
        } catch (err) {
          console.error("Error fetching more characters", err);
        }
      }
    };

    loadMoreCharacters();
  }, [inView, data?.characters.info.next, page, filters, fetchMore]);

  const translateCharacterField = (field: string, value: string) => {
    const translations = {
      // Status
      [`${Status.Alive}`]: t("alive"),
      [`${Status.Dead}`]: t("dead"),
      [`${Status.Unknown}_status`]: t("unknown_status"),

      // Species
      [`${Species.Human}`]: t("human"),
      [`${Species.Alien}`]: t("alien"),
      [`${Species.Meeseeks}`]: t("meeseeks"),
      [`${Species.Cronenberg}`]: t("cronenberg"),
      [`${Species.SpermPeople}`]: t("sperm_people"),
      [`${Species.Gromflomites}`]: t("gromflomites"),
      [`${Species.Plumbuses}`]: t("plumbuses"),
      [`${Species.Gazorpazorp}`]: t("gazorpazorp"),
      [`${Species.Glapflap}`]: t("glapflap"),
      [`${Species.KrombopulosMichael}`]: t("krombopulos_michael"),
      [`${Species.Birdperson}`]: t("birdperson"),
      [`${Species.Shmoglons}`]: t("shmoglons"),
      [`${Species.FroopylandCreatures}`]: t("froopyland_creatures"),
      [`${Species.ScaryTerry}`]: t("scary_terry"),
      [`${Species.Sludgers}`]: t("sludgers"),
      [`${Species.Zigerions}`]: t("zigerions"),

      // Gender
      [`${Gender.Male}`]: t("male"),
      [`${Gender.Female}`]: t("female"),
      [`${Gender.Unknown}_gender`]: t("unknown_gender"),

      // Origin
      [`${Origin.EarthDimensionC137}`]: t("earth_dimension_c137"),
      [`${Origin.CitadelOfRicks}`]: t("citadel_of_ricks"),
      [`${Origin.GalacticFederation}`]: t("galactic_federation"),
      [`${Origin.Unknown}_origin`]: t("unknown_origin"),
      [`${Origin.Gazorpazorpfield}`]: t("gazorpazorpfield"),
      [`${Origin.Birdworld}`]: t("birdworld"),
      [`${Origin.Froopyland}`]: t("froopyland"),
      [`${Origin.NightmareDimension}`]: t("nightmare_dimension"),
      [`${Origin.ZigerionPlanet}`]: t("zigerion_planet"),
    };

    return translations[value as keyof typeof translations] || value;
  };

  const statusIcons = {
    [Status.Alive]: <Zap className="text-yellow-400 animate-pulse" />,
    [Status.Dead]: <Skull className="text-red-400 animate-pulse" />,
    [Status.Unknown]: <HelpCircle className="text-blue-400 animate-pulse" />,
  };

  const statusBorderColors = {
    [Status.Alive]: "border-yellow-400 shadow-yellow-300/50",
    [Status.Dead]: "border-red-400 shadow-red-300/50",
    [Status.Unknown]: "border-blue-400 shadow-blue-300/50",
  };

  const getStatusIcon = (status: Status) =>
    statusIcons[status] || statusIcons[Status.Unknown];
  const getStatusBorderColor = (status: Status) =>
    statusBorderColors[status] || statusBorderColors[Status.Unknown];

  const handleFilterChange = (type: keyof Character, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setIsFiltering(true);
    setPage(1);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8"
    >
      {/* Game Toggle Button */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end mb-8 max-w-6xl mx-auto"
      >
        <button
          onClick={() => setShowMiniGame(!showMiniGame)}
          className="flex items-center space-x-3 px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Gamepad size={24} />
          <span>
            {showMiniGame ? t("back_to_characters") : t("play_character_game")}
          </span>
        </button>
      </motion.div>

      {showMiniGame ? (
        <RickMortyMiniGame />
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mb-8 space-x-6 flex-col sm:flex-row"
          >
            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <Filter className="text-yellow-400" />
              <select
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="bg-transparent text-white border-2 border-yellow-400 p-2 rounded-full hover:border-yellow-300 transition-colors focus:outline-none"
                value={filters.status}
              >
                <option value="" className="text-black">
                  {t("filter")}
                </option>
                <option value="Alive" className="text-black">
                  {t("alive")}
                </option>
                <option value="Dead" className="text-black">
                  {t("dead")}
                </option>
                <option value="Unknown" className="text-black">
                  {t("unknown")}
                </option>
              </select>
            </div>

            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <Filter className="text-yellow-400" />
              <select
                onChange={(e) => handleFilterChange("species", e.target.value)}
                className="bg-transparent text-white border-2 border-yellow-400 p-2 rounded-full hover:border-yellow-300 transition-colors focus:outline-none"
                value={filters.species}
              >
                <option value="" className="text-black">
                  {t("filter")}
                </option>
                <option value="Human" className="text-black">
                  {t("human")}
                </option>
                <option value="Alien" className="text-black">
                  {t("alien")}
                </option>
              </select>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && !characters.length && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center items-center h-64"
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
              className="text-white text-center p-6 bg-red-500/20 backdrop-blur-sm rounded-xl max-w-lg mx-auto"
            >
              <Skull
                size={48}
                className="mx-auto mb-4 text-red-400 animate-pulse"
              />
              Error: {error.message}
            </motion.div>
          )}

          {/* Character Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key="characters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {characters.map((character: Character, index: number) => (
                <motion.div
                  key={character.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.2,
                  }}
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  onClick={() => setSelectedCharacter(character)}
                  className={`bg-white/10 backdrop-blur-md border-2 rounded-xl overflow-hidden transform transition-all hover:shadow-2xl cursor-pointer ${getStatusBorderColor(
                    character.status
                  )}`}
                >
                  <div className="relative group">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-48 object-cover filter group-hover:brightness-110 transition-all"
                    />
                    <div className="absolute top-2 right-2 bg-black/30 p-2 rounded-full backdrop-blur-sm">
                      {getStatusIcon(character.status)}
                    </div>
                  </div>
                  <div className="p-4 text-white">
                    <h2 className="text-lg font-bold mb-2 flex items-center justify-between">
                      {character.name}
                      <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
                        #{character.id}
                      </span>
                    </h2>
                    <div className="space-y-2 text-sm">
                      {[
                        {
                          label: t("status"),
                          value: translateCharacterField(
                            "status",
                            character.status
                          ),
                        },
                        {
                          label: t("species"),
                          value: translateCharacterField(
                            "species",
                            character.species
                          ),
                        },
                        {
                          label: t("gender"),
                          value: translateCharacterField(
                            "gender",
                            character.gender
                          ),
                        },
                        {
                          label: t("origin"),
                          value: character.origin.name,
                        },
                      ].map(({ label, value }) => (
                        <p key={label} className="flex items-center space-x-2">
                          <span className="font-semibold text-yellow-400">
                            {label}:
                          </span>
                          <span>{value}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Infinite Scroll Indicator */}
          {data?.characters.info.next && (
            <motion.div
              ref={ref}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-8 text-white"
            >
              <ArrowDownCircle
                className="mx-auto text-yellow-400 animate-bounce"
                size={48}
                strokeWidth={1.5}
              />
              <p className="mt-4 text-lg font-semibold">{t("scrollMore")}</p>
            </motion.div>
          )}
        </div>
      )}

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <CharacterDetailModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </motion.main>
  );
};

export default MainComponent;
