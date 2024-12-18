import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-6xl font-extrabold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Contact Me
        </motion.h1>

        <div className="space-y-12">
          <motion.section {...fadeInUp} className="bg-white/10 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <FaEnvelope className="text-yellow-400" size={32} />
              <h2 className="text-3xl font-bold">Email</h2>
            </div>
            <p className="text-lg">
              Feel free to reach out to me via email for any inquiries or
              collaboration opportunities.
            </p>
            <ul className="list-none space-y-2 text-lg">
              <li>
                <a
                  href="mailto:davcevs@gmail.com"
                  className="text-black hover:text-blue-500 hover:underline"
                >
                  davcevs@gmail.com
                </a>
              </li>
            </ul>
          </motion.section>

          <motion.section
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 rounded-lg p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaPhone className="text-yellow-400" size={32} />
              <h2 className="text-3xl font-bold">Phone</h2>
            </div>
            <p className="text-lg">
              You can also contact me by phone for urgent matters or quick
              communication.
            </p>
            <ul className="list-none space-y-2 text-lg">
              <li>
                <a
                  href="tel:+38970349220"
                  className="text-black hover:text-blue-500 hover:underline"
                >
                  +38970349220
                </a>
              </li>
            </ul>
          </motion.section>

          <motion.section
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 rounded-lg p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaLinkedin className="text-yellow-400" size={32} />
              <h2 className="text-3xl font-bold">LinkedIn</h2>
            </div>
            <p className="text-lg">
              Connect with me professionally on LinkedIn for networking and
              collaboration.
            </p>
            <ul className="list-none space-y-2 text-lg">
              <li>
                <a
                  href="https://www.linkedin.com/in/stefan-davcev-b39145307/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-blue-500 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </motion.section>

          <motion.section
            {...fadeInUp}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/10 rounded-lg p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaGithub className="text-yellow-400" size={32} />
              <h2 className="text-3xl font-bold">GitHub</h2>
            </div>
            <p className="text-lg">
              Check out my projects and contributions on GitHub.
            </p>
            <ul className="list-none space-y-2 text-lg">
              <li>
                <a
                  href="https://github.com/davcevs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-blue-500 hover:underline"
                >
                  GitHub Profile
                </a>
              </li>
            </ul>
          </motion.section>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Link
            to="/"
            className="text-lg text-black hover:text-blue-500 hover:underline"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
