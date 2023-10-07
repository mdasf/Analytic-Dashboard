import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import './App.css';
import Home from './components/Home'
import Insights from "./components/Insights";

function App() {
  return (
    <Router>
       <Routes> 
         <Route path="/" element={ <Home />} />
         <Route path="/dashboard" element={ <Home />} />
         <Route path="/insights" element={  <Insights />} />
      </Routes>
</Router>
  );
}

export default App;
