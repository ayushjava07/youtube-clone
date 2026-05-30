import "./index.css";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import { Signup } from "./screens/Signup";
import { Signin } from "./screens/Signin";
import { Landing } from "./screens/Landing";
import { VideoPage } from "./screens/VideoPage";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Landing />} />
          <Route path="/watch" element={<VideoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
