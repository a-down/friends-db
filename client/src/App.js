import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components"
import { UserProvider } from "./ctx/UserContext";
import { HomePage, LandingPage, TestingPage } from "./pages";

import './styles/global.css'


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
          <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/testing" element={<TestingPage />} />
            </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
