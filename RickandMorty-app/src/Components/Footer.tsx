import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, MapPin, X, Github, Share2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const { i18n } = useTranslation();
  const [showSocialInfo, setShowSocialInfo] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const socialLinks = [
    {
      icon: X,
      url: "https://twitter.com/rickandmorty",
      color: "text-black",
    },
    {
      icon: Github,
      url: "https://github.com/davcevs",
      color: "text-black",
    },
  ];

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const handleShareOnTwitter = () => {
    const shareText = "Check out this Rick and Morty Project!";
    const shareUrl = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
    setShowShareModal(false);
  };

  return (
    <footer className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4">
      <div className="container mx-auto grid md:grid-cols-3 gap-4 items-center">
        {/* Language Switcher */}
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Globe className="text-yellow-400 animate-pulse" />
          <span>Language:</span>
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-gray-700 text-white rounded p-1"
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </select>
        </motion.div>

        {/* Interdimensional Info */}
        <motion.div
          className="flex items-center justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <MapPin className="text-purple-400 animate-pulse" />
          <span className="text-sm">
            Interdimensional Coordinates: Ω-{Math.floor(Math.random() * 1000)}
          </span>
          <button
            onClick={() => setShowSocialInfo(!showSocialInfo)}
            className="bg-green-500 rounded-full p-1 hover:bg-green-600 transition"
          >
            <Info size={16} />
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-end space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {socialLinks.map(({ icon: Icon, url, color }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${color} hover:opacity-75 transition`}
            >
              <Icon />
            </a>
          ))}
          <button
            onClick={handleShareClick}
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition flex items-center"
          >
            <Share2 size={16} className="mr-2" />
            Share
          </button>
        </motion.div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md text-black relative">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Share this Project
            </h3>
            <p className="text-gray-600 mb-4">
              Click below to share this project on Twitter.
            </p>
            <button
              onClick={handleShareOnTwitter}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Share on Twitter
            </button>
            <button
              onClick={handleCloseShareModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Social Info Modal */}
      {showSocialInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md text-black">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Interdimensional Project Links
            </h3>
            <p className="text-gray-600 mb-4">
              Connect with the Rick and Morty Character Explorer project across
              different dimensions!
            </p>
            <div className="space-y-2">
              {socialLinks.map(({ icon: Icon, url, color }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded"
                >
                  <Icon className={color} />
                  <span>{url.replace("https://", "")}</span>
                </a>
              ))}
            </div>
            <button
              onClick={() => setShowSocialInfo(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer Links */}
      <div className="text-center mt-4 text-sm opacity-75">
        <Link to="/about" className="hover:text-blue-400 transition">
          About Us
        </Link>
        <span className="mx-2">|</span>
        <Link to="/contact" className="hover:text-blue-400 transition">
          Contact
        </Link>
        <div>
          © {new Date().getFullYear()} Interdimensional Character Database
        </div>
      </div>
    </footer>
  );
};

export default Footer;
