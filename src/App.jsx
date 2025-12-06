import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Committee from "./pages/Committee";
import Registration from "./pages/Registration";
import ConferenceHall from "./pages/ConferenceHall";
import Insights from "./pages/Insights";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/conference-hall" element={<ConferenceHall />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
