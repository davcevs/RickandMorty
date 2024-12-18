import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import MainComponent from "./Components/MainComponent";
import ErrorPage from "./Components/ErrorPage";
import AboutUs from "./Components/AboutUs";
import ContactPage from "./Components/ContactPage";
import HomePage from "./Components/HomePage";
import ChatBot from "./Components/ChatBot";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b border-gray-800/50 backdrop-blur-sm">
        <Header />
      </div>
      <div className="flex-grow overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<MainComponent />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <div className="fixed flex-col bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent border-t border-gray-800/50 backdrop-blur-sm">
        <Footer />
      </div>
      <ChatBot />
    </div>
  );
};

export default App;
