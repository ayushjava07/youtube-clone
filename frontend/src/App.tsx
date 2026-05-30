import "./index.css";
import {Route, BrowserRouter, Routes} from "react-router"

export function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" Component={<signup/>}>
        <Route path="/signin" Component={<signin/>}>
        <Route path="/" Component={<landing/>}>
        <Route path="/watch" Component={<VideoPage/>}>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
