import { Link } from "react-router-dom";
import { Skull } from "lucide-react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Skull size={80} className="text-yellow-400 animate-pulse" />
      </motion.div>

      <motion.h1
        className="text-6xl font-extrabold text-center text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-xl mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        This dimension doesn't exist, Morty!
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Link
          to="/"
          className="mt-6 text-lg text-blue-300 hover:text-blue-500 hover:underline"
        >
          Go back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
