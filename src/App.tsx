import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import OrderCompleted from "./OrderCompleted";
import Timeout from "./Timeout";
import Redirect from "./Redirect";
import './App.css'; // Import the CSS file for styling

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/timeout" className="nav-link">10s timeout</Link>
        <Link to="/redirect" className="nav-link">onApprove redirect</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order-completed" element={<OrderCompleted />} />
        <Route path="/timeout" element={<Timeout />} />
        <Route path="/redirect" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
