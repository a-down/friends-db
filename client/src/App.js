import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./ctx/UserContext";
import { HomePage, LandingPage, ProfilePage, ChatPage, FriendPage } from "./pages";

// Tailwind Config
import './styles/global.css'


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/profile/:usernameParam" element={<ProfilePage />} />
              <Route path="/chats" element={<ChatPage />} />
              <Route path="/addfriend" element={<FriendPage />} />
            </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
