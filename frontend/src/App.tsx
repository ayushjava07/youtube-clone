import "./index.css";
import {Route, BrowserRouter, Routes, Router} from "react-router-dom";
import { Signup } from "./screens/Signup";
import { Signin } from "./screens/Signin";
import { Landing } from "./screens/Landing";
import { VideoPage } from "./screens/VideoPage";
import UploadPage from "./screens/UploadPage";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Landing />} />
          <Route path="/watch" element={<VideoPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
