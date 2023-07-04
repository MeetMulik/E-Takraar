import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UseModel from "./pages/UseModel";
import Register from "./pages/Register";
import MyComplaints from "./pages/MyComplaints";
import AdminComplaints from "./pages/AdminComplaints";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Learn from "./pages/Learn";
import { useStateValue } from "./context/StateProvider";
import { getAllComplaints } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import ComplaintDetail from "./pages/ComplaintDetail";
import MyComplaintDetail from "./pages/MyComplaintDetail";
import LinkChecker from "./pages/LinkChecker";

const App = () => {
  const [{ complaints }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllComplaints().then((data) => {
      dispatch({
        type: actionType.SET_COMPLAINTS,
        complaints: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usemodel" element={<UseModel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registercomplaint" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/mycomplaints" element={<MyComplaints />} />
          <Route path="/allcomplaints" element={<AdminComplaints />} />
          <Route path="/allcomplaints/:id" element={<ComplaintDetail />} />
          <Route path="/linkchecker" element={<LinkChecker />} />
          <Route path="/mycomplaints/:id" element={<MyComplaintDetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
