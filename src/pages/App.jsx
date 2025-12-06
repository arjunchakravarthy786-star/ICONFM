import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Committee from "./pages/Committee";
import Registration from "./pages/Registration";
import ConferenceHall from "./pages/ConferenceHall";
import Insights from "./pages/Insights";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/conference-hall" element={<ConferenceHall />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </Router>
  );
}

export default App;
