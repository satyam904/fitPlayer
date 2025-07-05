import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar, PlaylistModal, RequiresAuth, Sidebar } from "./components";
import { usePlaylistModal, useTheme } from "./contexts";
import {
  Home,
  Videos,
  Login,
  Signup,
  Profile,
  Playlists,
  SinglePlaylist,
  SingleVideo,
  Likes,
  WatchLater,
  History,
} from "./pages";
import Mockman from "mockman-js";
import "./App.css";

function App() {
  const { theme } = useTheme();
  const {
    playlistModalState: { isActive },
  } = usePlaylistModal();
  const [showSidebar, setShowSidebar] = useState(false);
  const { pathname } = useLocation();

  const notGridPage = () => {
    return (
      pathname !== "/" &&
      pathname !== "/login" &&
      pathname !== "/signup" &&
      pathname !== "/mock"
    );
  };

  return (
    <div className={`${theme}-mode`}>
      <Toaster />
      {isActive && <PlaylistModal />}
      <Navbar pathname={pathname} setShowSidebar={setShowSidebar} />
      <div className={`${notGridPage() && "grid-page-layout"}`}>
        <Sidebar pathname={pathname} showSidebar={showSidebar} />

        {/* Public Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mock" element={<Mockman />} />
          <Route path="/videos/:videoId" element={<SingleVideo />} />

          {/* Private Routes */}
          <Route element={<RequiresAuth />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/playlists/:playlistId" element={<SinglePlaylist />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/watchlater" element={<WatchLater />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
