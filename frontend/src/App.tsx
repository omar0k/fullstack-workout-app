import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Workout from "./components/Workout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import Exercises from "./pages/Exercises";
function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/workouts/:workoutId" element={<Workout />} />
            <Route
              path="/workouts/:workoutId/exercises"
              element={<Exercises />}
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
