import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components"
import { UserProvider } from "./ctx/UserContext";
import { HomePage, LandingPage, TestingPage, ProfilePage, ChatPage } from "./pages";
import { register } from 'swiper/element/bundle'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import './styles/global.css'



function App() {
  return (
    <BrowserRouter>
      <UserProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/testing" element={<TestingPage />} />
              <Route path="/chats" element={<ChatPage />} />
            </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
