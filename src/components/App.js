import "../styles/App.css";
import { Provider } from "react-redux";
import store from '../store/store';
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import Profile from "./profile/Profile";

function App() {

  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
