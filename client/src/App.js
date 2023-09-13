import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components"
import { UserProvider } from "./ctx/UserContext";
import { HomePage, LandingPage, TestingPage, ProfilePage, ChatPage } from "./pages";
import AddFriend from "./components/AddFriend";

import './styles/global.css'


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/profile/:userIdParam" element={<ProfilePage />} />
              <Route path="/testing" element={<TestingPage />} />
              <Route path="/chats" element={<ChatPage />} />
              <Route path="/addfriend" element={<AddFriend />} />

            </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
