import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./user/Dashboard";
import Private from "./components/routes/Private";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/policy" element={<Policy />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Private />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route exact path="/userlogin" element={<Login />} />
        <Route exact path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
