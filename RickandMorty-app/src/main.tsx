import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo-client";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ApolloProvider>
    </StrictMode>
  </BrowserRouter>
);
