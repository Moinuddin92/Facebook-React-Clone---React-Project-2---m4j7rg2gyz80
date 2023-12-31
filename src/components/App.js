import "../styles/App.css";
import { Provider } from "react-redux";
import store from '../store/store';
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Signup from "./signup/Signup";
import Login from "./login/Login";

function App() {

  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
