import { useState } from "react";
import { FlaskConical, Rocket, Menu, X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-green-400 to-blue-500 p-4 shadow-lg">
      <div className="z-50 container mx-auto flex items-center justify-between relative">
        {/* Mobile Menu Toggle */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-full p-2">
            <Link to="/">
              <Rocket className="text-green-500" size={32} />
            </Link>
          </div>
          <h1 className="text-5xl font-bold text-white drop-shadow-lg hidden md:block ">
            Rick and Morty Character Explorer
          </h1>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          {/* Dimension Indicator */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <FlaskConical
              className="text-white animate-pulse"
              size={40}
              strokeWidth={2}
            />
            <div className="bg-yellow-300 text-black rounded-full px-3 py-1 text-sm font-bold">
              Dimension C-137
            </div>
          </motion.div>

          {/* Interdimensional Tracker */}
          <motion.div
            className="bg-purple-500 text-white rounded-full px-3 py-1 text-xs flex items-center space-x-1"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Zap size={16} />
            <span>Interdimensional Sync</span>
          </motion.div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-green-500 md:hidden"
            initial={{ top: "-100%" }}
            animate={{ top: "100%" }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <nav className="flex flex-col p-4 space-y-2">
              <a href="#" className="text-white hover:bg-green-600 p-2 rounded">
                Characters
              </a>
              <a href="#" className="text-white hover:bg-green-600 p-2 rounded">
                Dimensions
              </a>
              <a href="#" className="text-white hover:bg-green-600 p-2 rounded">
                About
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
