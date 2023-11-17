import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home.js";
import Careers from "./pages/Careers/careers.js";
import Contact from "./pages/Contacts/contacts.js";
import Project from "./pages/Projects/project.js";
import Faq from "./pages/FAQ/faq.js";
import Announcements from "./pages/Announcements/announcements.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/projects" element={<Project/>}/>
        <Route exact path="/careers" element={<Careers/>}/>
        <Route exact path="/contacts" element={<Contact/>}/>
        <Route exact path="/faq" element={<Faq/>}/>
        <Route exact path="/announcements" element={<Announcements/>}/>
      </Routes>
    </Router>
  );
}
export default App;