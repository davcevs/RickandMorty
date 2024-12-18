import { motion } from "framer-motion";
import { Code, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const AboutUs = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <img
            src="./public/CV.jpg"
            alt="Stefan Davchev"
            className="rounded-full w-40 h-40 border-4 border-yellow-400"
          />
        </motion.div>

        <motion.h1
          className="text-6xl font-extrabold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          About Me
        </motion.h1>

        <div className="space-y-12">
          <motion.section {...fadeInUp} className="bg-white/10 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <Code className="text-yellow-400" size={32} />
              <h2 className="text-3xl font-bold">Web Development Expertise</h2>
            </div>
            <p className="text-lg">
              I specialize in building dynamic and responsive web applications
              using technologies like JavaScript, React, Angular, Next.js, and
              Node.js. My expertise extends to both frontend and backend
              development, as well as database management with PostgreSQL and
              MongoDB.
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>JavaScript, HTML, CSS, React, Angular, Next.js, Node.js</li>
              <li>Database Management: PostgreSQL, MongoDB</li>
              <li>Proficient in RESTful APIs and server-side development</li>
              <li>UI/UX design with a focus on user-centered development</li>
            </ul>
          </motion.section>

          <motion.section
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 rounded-lg p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <Award className="text-yellow-400" size={32} />
              <h2 className="text-3xl font-bold">Professional Achievements</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>
                Successfully developed and deployed multiple web applications
                for clients in various industries
              </li>
              <li>
                Worked with cross-functional teams to deliver high-quality
                products on time
              </li>
              <li>
                Contributed to open-source projects and continuously improving
                my skills in web technologies
              </li>
            </ul>
          </motion.section>

          <motion.section
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 rounded-lg p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <Award className="text-yellow-400" size={32} />
              <h2 className="text-3xl font-bold">Other Experience</h2>
            </div>
            <p className="text-lg">
              In addition to my web development skills, I have experience in
              managing digital content, video production, and analytics. My past
              work includes growing a YouTube channel to 750k subscribers and
              collaborating with major labels like Sony Music and Universal
              Music.
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>
                Managed YouTube channels and promoted artists through social
                media and streaming services
              </li>
              <li>
                Utilized YouTube Analytics to identify trends and improve
                content performance
              </li>
              <li>
                Experienced in digital marketing, content creation, and managing
                brand partnerships
              </li>
            </ul>
          </motion.section>

          {/* Links Section */}
          <motion.section
            {...fadeInUp}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/10 rounded-lg p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-3xl font-bold">Connect with Me</h2>
            </div>
            <p className="text-lg mb-4">
              You can explore my work and contributions on my GitHub or check
              out my YouTube channel for insights and tutorials.
            </p>
            <ul className="list-none space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <FaGithub className="text-blue-500" size={24} />
                <a
                  href="https://github.com/davcevs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-blue-500 hover:underline"
                >
                  GitHub
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

export default AboutUs;
