
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Shirt from "./Components/Shirt/Shirt"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Profile" element={<Profile/>}></Route>
          <Route path="/Shirt" element={<Shirt/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
